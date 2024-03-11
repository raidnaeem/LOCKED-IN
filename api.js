// demo api based off on db table, MERB C lab as ref
require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { v4: uuidv4 } = require("uuid");
const jwtHelpers = require("./createJWT.js");

exports.setApp = function (app, client) {
  app.post("/api/login", async (req, res) => {
    // incoming: Email, Password
    // outgoing: UserID, FirstName, LastName, error

    let error = "";
    const { Email, Password } = req.body;
    const db = client.db("locked-in");

    try {
      const user = await db.collection("Users").findOne({ Email: Email });

      // Debugging statements to log the retrieved user and provided credentials
      console.log("User from DB:", user);
      console.log("Provided Email:", Email, "Provided Password:", Password);

      if (user) {
        // Compare the provided password with the hashed password
        const validPassword = await bcrypt.compare(Password, user.Password);
        if (validPassword) {
          // Create JWT for the user
          const token = jwtHelpers.createToken(
            user.FirstName,
            user.LastName,
            user.UserID
          );
          if (token.error) {
            return res
              .status(500)
              .json({ error: "Failed to generate authentication token." });
          }
          res.status(200).json({
            UserID: user.UserID,
            FirstName: user.FirstName,
            LastName: user.LastName,
            AccessToken: token.accessToken,
            error: "",
          });
        } else {
          res.status(400).json({ error: "Invalid email or password." });
        }
      } else {
        res.status(400).json({ error: "Invalid email or password!" });
      }
    } catch (err) {
      // Error handling
      error = "An error occurred.";
      console.error(err); // Adding this to help debug by logging the error
      res.status(500).json({ error });
    }
  });

  // register endpoint
  app.post("/api/register", async (req, res) => {
    const { Email, Password, FirstName, LastName } = req.body;
    const db = client.db("locked-in");

    try {
      // Check if a user already exists with the email given
      const userExists = await db.collection("Users").findOne({ Email: Email });
      if (userExists) {
        return res
          .status(400)
          .json({ error: "User already exists with the provided email." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Password, salt);

      // Generate a verification token
      const verificationToken = uuidv4();
      console.log(
        `Verification token stored for ${Email}: ${verificationToken}`
      );

      // Increment & retrieve new UserID
      const updateResult = await db.collection("Counters").findOneAndUpdate(
        { _id: "userIdCounter" },
        { $inc: { sequence_value: 1 } },
        { returnDocument: "after", upsert: true } // Ensures the document is created if it doesn't exist
      );
      const newUserID = updateResult.value
        ? updateResult.value.sequence_value
        : updateResult.sequence_value;

      if (!newUserID) {
        console.error("Failed to retrieve or increment UserID counter.");
        return res
          .status(500)
          .json({ error: "Failed to generate a new UserID." });
      }

      // Insert the new user with the new UserID
      await db.collection("Users").insertOne({
        UserID: newUserID,
        Email: Email,
        Password: hashedPassword, // store hashed password
        FirstName: FirstName,
        LastName: LastName,
        verificationToken,
        passwordResetToken: "", // Empty initially
        verified: false,
      });

      await sendVerificationEmail(Email, verificationToken);

      // success message
      res.status(200).json({
        message: "User registered successfully",
        UserID: newUserID,
        FirstName: FirstName,
        LastName: LastName,
      });
    } catch (err) {
      // errors
      console.error(err); // help debug by logging the error
      res.status(500).json({ error: "An error occurred during registration." });
    }
  });

  // Email Verification Endpoint
  app.get("/api/verify-email/:verificationToken", async (req, res) => {
    const { verificationToken } = req.params;
    console.log(`Verification token received: ${verificationToken}`);

    const db = client.db("locked-in");

    try {
      // Find the user by the verificationToken
      const user = await db.collection("Users").findOne({ verificationToken });
      console.log(`User found with verification token: `, user);

      if (!user) {
        console.error("No user found with the provided verification token.");
        return res.status(404).send("The link is invalid or expired.");
      }

      // Attempt to verify user
      console.log(`Attempting to verify user with token: ${verificationToken}`);
      const update = await db.collection("Users").updateOne(
        { verificationToken },
        {
          $set: { verified: true },
          $unset: { verificationToken: "" }, // Properly unset the field
        }
      );

      if (update.matchedCount === 1 && update.modifiedCount === 1) {
        console.log("User verified successfully.");
        res.status(200).send("Email verified successfully!");
      } else {
        console.log("Failed to verify user. User might already be verified.");
        res
          .status(400)
          .send("Unable to verify email. User might already be verified.");
      }
    } catch (error) {
      console.error("Verification error: ", error);
      res.status(500).send("An error occurred during email verification.");
    }
  });

  // Password reset functionality
  app.post("/api/request-password-reset", async (req, res) => {
    const { Email } = req.body;
    const db = client.db("locked-in");

    try {
      const user = await db.collection("Users").findOne({ Email: Email });
      if (!user) {
        return res.status(404).send("User not found.");
      }

      const passwordResetToken = uuidv4();
      await db.collection("Users").updateOne(
        { Email: Email },
        {
          $set: { passwordResetToken: passwordResetToken },
        }
      );

      // Sending the password reset email
      const resetUrl = `http://localhost:5001/api/reset-password/${passwordResetToken}`;
      const message = {
        to: Email,
        from: "lockedin123@myyahoo.com",
        subject: "Password Reset Request",
        html: `Please click on the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a>`,
      };

      await sgMail.send(message);
      res.status(200).send("Password reset email sent.");
    } catch (error) {
      console.error("Password reset request error:", error);
      res.status(500).send("Error in password reset request.");
    }
  });

  // actual handles passworrd reset 
  app.post("/api/reset-password/:passwordResetToken", async (req, res) => {
    const { passwordResetToken } = req.params;
    const { newPassword } = req.body;
    const db = client.db("locked-in");

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const result = await db.collection("Users").findOneAndUpdate(
            { passwordResetToken: passwordResetToken },
            {
                $set: { Password: hashedPassword },
                $unset: { passwordResetToken: "" }
            },
            { returnDocument: 'after' }
        );

        if (!result.value) {
            return res.status(400).send("Password reset token is invalid or has expired.");
        }

        res.status(200).send("Password has been reset successfully.");
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).send("Error resetting password.");
    }
});
};

// Send Email Function
const sendVerificationEmail = async (email, verificationToken) => {
  const verificationUrl = `http://localhost:5001/api/verify-email/${verificationToken}`;
  const message = {
    to: email,
    from: "lockedin123@myyahoo.com", // email verified with SendGrid
    subject: "Verify Your Email Address",
    html: `Please verify your email by clicking on the link: <a href="${verificationUrl}">${verificationUrl}</a>`,
  };

  console.log(process.env.SENDGRID_API_KEY);
  try {
    await sgMail.send(message);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
    if (error.response) {
      console.error(error.response.body); // This will log the detailed error message from SendGrid
    }
    throw new Error("Failed to send verification email");
  }
};
