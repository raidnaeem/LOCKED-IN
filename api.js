// demo api based off on db table, MERB C lab as ref
require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { v4: uuidv4 } = require("uuid");
const jwtHelpers = require("./createJWT.js");
const bp = require('./frontend/src/components/Path.js');

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
            verified: user.verified,
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
        verified: false,
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
      //const resetUrl = `http://localhost:5001/api/reset-password/${passwordResetToken}`;
      const resetUrl = bp.buildFrontPath(`reset-password/${passwordResetToken}`);
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

        if (!result) {
            return res.status(400).send("Password reset token is invalid or has expired.");
        }

        res.status(200).send("Password has been reset successfully.");
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).send("Error resetting password.");
    }
});

// To DO LISt.... 
app.post("/api/task/add", async (req, res) => {
  const { Task, TaskImage, Done, UserID } = req.body; // TaskImage should include 'FileName' and 'ContentType'
  const db = client.db("locked-in"); // Ensure this is your correct DB name

  try {
      const newTask = {
          _id: new mongodb.ObjectId(), // Generates a unique identifier
          Task,
          TaskImage, // Ensure this object is structured correctly
          Done,
          UserID
      };

      await db.collection("To-Do").insertOne(newTask);
      res.status(200).json({ message: "Task added successfully", TaskID: newTask._id });
  } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "An error occurred while adding the task." });
  }
});

// delete task 
app.delete("/api/task/delete/:TaskID", async (req, res) => {
  const TaskID = req.params.TaskID; 
  console.log("Attempting to delete task with ID:", TaskID); // Debug log
  const db = client.db("locked-in");

  try {
    const result = await db.collection("To-Do").deleteOne({ _id: new mongodb.ObjectId(TaskID) });
    console.log("Delete result:", result); // Debug log
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "An error occurred while deleting the task." });
  }
});

// markDone
app.put("/api/task/markDone/:TaskID", async (req, res) => {
  const { TaskID } = req.params;
  const db = client.db("locked-in");

  try{
    const result = await db.collection("To-Do").updateOne(
      { _id: new mongodb.ObjectId(TaskID) },
      { $set: {Done: true } }
    );
    if(result.modifiedCount === 1) {
      res.status(200).json({ message: "Task marked as done successfully "});
    } else {
      res.status(404).json({ error: "Task not found or already marked as done" });
    }
  } catch (error) {
    console.error("Error marking task as done:", error);
    res.status(500).json({ error: "An error occurred while marking the task as done." });
  }
});

// Search Todo
app.get("/api/todo/search", async (req, res) => {
  const { query, userID } = req.query;
  const db = client.db("locked-in");

  try {
      const regex = new RegExp(query, 'i'); // the 'i' allows for case-insensitive
      const todos = await db.collection("To-Do")
                             .find({
                                 UserID: parseInt(userID),
                                 Task: { $regex: regex }
                             })
                             .limit(10) // limiting the reponse to be quick (changed from 5 to 10 for testing)
                             .toArray();
      res.status(200).json(todos);
  } catch (error) {
      console.error("Error searching todos:", error);
      res.status(500).json({ error: "An error occurred during the search." });
  }
});

//--Calendar Sectioin--//

//Create 
app.post("/api/calendar/create", async (req, res) => {
  const { Event, StartTime, StartDate, EndTime, EndDate, UserID } = req.body;
  const db = client.db("locked-in");

  try {
      await db.collection("Calendar").insertOne({
          Event,
          StartTime,
          StartDate,
          EndTime,
          EndDate,
          UserID
      });
      res.status(200).json({ message: "Event created successfully" });
  } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "An error occurred while creating the event." });
  }
});

//Fetch 
app.get("/api/calendar/events/:UserID", async (req, res) => {
  const UserID = parseInt(req.params.UserID);
  const db = client.db("locked-in");

  try {
      const events = await db.collection("Calendar").find({ UserID }).toArray();
      res.status(200).json(events);
  } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "An error occurred while fetching events." });
  }
});

//Update 
app.put("/api/event/update/:EventID", async (req, res) => {
  const EventID = req.params.EventID;
  const updateFields = req.body; // Object containing fields to update
  const db = client.db("locked-in");

  // Ensure updateFields does not contain _id to avoid conflicts
  if(updateFields._id) delete updateFields._id;

  try {
      const result = await db.collection("Calendar").updateOne(
          { _id: new mongodb.ObjectId(EventID) },
          { $set: updateFields }
      );

      if (result.matchedCount === 0) {
          res.status(404).json({ message: "Event not found" });
      } else if (result.modifiedCount === 0) {
          res.status(200).json({ message: "No changes made to the event" });
      } else {
          res.status(200).json({ message: "Event updated successfully" });
      }
  } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "An error occurred while updating the event." });
  }
});

// Delete 
app.delete("/api/calendar/delete/:EventID", async (req, res) => {
  const EventID = req.params.EventID;
  const db = client.db("locked-in");

  try {
      const result = await db.collection("Calendar").deleteOne({ _id: new mongodb.ObjectId(EventID) });
      if (result.deletedCount === 1) {
          res.status(200).json({ message: "Event deleted successfully" });
      } else {
          res.status(404).json({ error: "Event not found" });
      }
  } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ error: "An error occurred while deleting the event." });
  }
});

//Search 
app.get("/api/calendar/search", async (req, res) => {
  const { query, userID } = req.query;
  const db = client.db("locked-in");

  try {
      const regex = new RegExp(query, 'i');
      const events = await db.collection("Calendar")
                              .find({
                                  UserID: parseInt(userID),
                                  Event: { $regex: regex }
                              })
                              .limit(5)
                              .toArray();
      res.status(200).json(events);
  } catch (error) {
      console.error("Error searching events:", error);
      res.status(500).json({ error: "An error occurred during the search." });
  }
});

};

// Send Email Function
const sendVerificationEmail = async (email, verificationToken) => {
  //const verificationUrl = `http://localhost:5001/api/verify-email/${verificationToken}`;
  const verificationUrl = bp.buildFrontPath(`verify-email/${verificationToken}`);
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
