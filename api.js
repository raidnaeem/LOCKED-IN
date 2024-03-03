// demo api based off on db table, MERB C lab as ref
const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");

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
          res.status(200).json({
            UserID: user.UserID,
            FirstName: user.FirstName,
            LastName: user.LastName,
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
        Email,
        Password: hashedPassword, // store hashed password
        FirstName,
        LastName,
      });

      // success message
      res.status(200).json({
        message: "User registered successfully",
        UserID: newUserID,
        FirstName,
        LastName,
      });
    } catch (err) {
      // errors
      console.error(err); // help debug by logging the error
      res.status(500).json({ error: "An error occurred during registration." });
    }
  });
};
