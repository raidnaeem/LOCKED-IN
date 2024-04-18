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
const fetch = require('node-fetch');
const cron = require('node-cron');

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

      const result = await db.collection("To-Do").insertOne(newTask);
      
      // Create a notification for the newly created task
      const message = `New task added: ${Task}. Remember to complete it!`;
      await createToDoNotification(client, UserID, result.insertedId, message);

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

// Update a task 
app.put("/api/task/update/:TaskID", async (req, res) => {
  const { TaskID } = req.params;
  const updateFields = req.body;
  const db = client.db("locked-in");

  try {
      // Verifys the input to make sure there is something to update
      if(Object.keys(updateFields).length === 0) {
          return res.status(400).json({ error: "No update fields provided" });
      }

      const result = await db.collection("To-Do").updateOne(
          { _id: new mongodb.ObjectId(TaskID) },
          { $set: updateFields }
      );

      if(result.matchedCount === 0) {
          return res.status(404).json({ error: "Task not found" });
      } else if (result.modifiedCount === 0) {
          return res.status(304).send(); 
      } else {
          res.status(200).json({ message: "Task updated successfully" });
      }
  } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "An error occurred while updating the task." });
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

    // delete the associated notification 
    await db.collection("Notifications").deleteOne({ relatedId: new mongodb.ObjectId(TaskID), type: "todoReminder" });

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

// Search Todo + Paginatioin
app.get("/api/todo/search", async (req, res) => {
  const { query, userID, page, pageSize = 10 } = req.query; // page is page number, 10 items per page
  const db = client.db("locked-in");

  const skips = pageSize * (page - 1); // Calculate the number of documents to skip

  try {
      const regex = new RegExp(query, 'i'); // creates Case-insensitive regex search
      const todos = await db.collection("To-Do")
                             .find({
                                 UserID: parseInt(userID),
                                 Task: { $regex: regex }
                             })
                             .skip(skips)
                             .limit(parseInt(pageSize))
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
      const result = await db.collection("Calendar").insertOne({
          Event,
          StartTime,
          StartDate,
          EndTime,
          EndDate,
          UserID
      });

      await createNotification(client, UserID, result.insertedId, `New event added: ${Event}. Don't forget it!`, "EventReminder");

      res.status(200).json({ message: "Event created successfully", EventID: result._id });
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
    // First, fetch the event to get the UserID
    const event = await db.collection("Calendar").findOne({ _id: new mongodb.ObjectId(EventID) });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const UserID = event.UserID; // Attain Thr UserID

    const result = await db.collection("Calendar").updateOne(
        { _id: new mongodb.ObjectId(EventID) },
        { $set: updateFields }
    );

    if (result.matchedCount === 0) {
        res.status(404).json({ message: "Event not found" });
    } else if (result.modifiedCount === 0) {
        res.status(200).json({ message: "No changes made to the event" });
    } else {
        await createNotification(client, UserID, EventID, `Your event '${updateFields.Event || event.Event}' has been updated. Check the changes!`, "EventUpdateReminder");
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
                              .limit(10)
                              .toArray();
      res.status(200).json(events);
  } catch (error) {
      console.error("Error searching events:", error);
      res.status(500).json({ error: "An error occurred during the search." });
  }
});

//Spotify API

//Spotify Login
app.get('/api/spotify/login', (req, res) => {
  const scope = 'user-read-private user-read-email';
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`);
});

// Spotify Callback
app.get('/api/spotify/callback', async (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const data = await response.json();

    if (data.access_token) {
      // You can now use this access token to make API requests on behalf of the user
      // Consider storing the tokens in the user's session or database
      res.redirect('/frontend/path'); // Redirect the user to the front-end app with the tokens, or store them in your database
    } else {
      res.redirect('/#/error'); // Redirect the user to an error page in your application
    }
  } catch (error) {
    console.error('Error during token exchange', error);
    res.redirect('/#/error');
  }
});

//Spotify Search
// Search Spotify (by genre, artist)
app.get("/api/spotify/search", async (req, res) => {
  try {
    const token = await getSpotifyAccessToken();
    const { query, type } = req.query; // type can be 'artist' or 'genre'
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&market=US&limit=10`;
    
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Spotify Search API error:', error);
    res.status(500).json({ error: 'Failed to search Spotify.' });
  }
});

// Fetching for Random Track from Genre
app.get("/api/spotify/random-track", async (req, res) => {
  try {
    const token = await getSpotifyAccessToken();
    const { genre } = req.query; // Genre as a query parameter
    
    const randomTrackUrl = `https://api.spotify.com/v1/recommendations?seed_genres=${encodeURIComponent(genre)}&limit=1`;

    const response = await fetch(randomTrackUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await response.json();
    // Assuming the response structure and selecting the first track
    const track = data.tracks[0];
    res.json(track);
  } catch (error) {
    console.error('Spotify Random Track API error:', error);
    res.status(500).json({ error: 'Failed to fetch random track from Spotify.' });
  }
});

// Call the scheduler at the end of the setApp function
scheduleEventReminders();
scheduleDailyToDoReminders();
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

// Function ToDoNotification 
async function createToDoNotification(client, userId, taskId, message) {
  const db = client.db("locked-in");
  const notification = {
    userId,
    taskId, // Link notification directly to the task
    message,
    dateCreated: new Date(),
    status: "unread",
    type: "ToDoReminder"
  };

  await db.collection("Notifications").insertOne(notification);
}

// Function Calendar Notification 
async function createNotification(client, userId, relatedId, message, type) {
  const db = client.db("locked-in");
  const notification = {
    userId,
    relatedId, 
    message,
    dateCreated: new Date(),
    status: "unread",
    type
  };

  await db.collection("Notifications").insertOne(notification);
}

// SpotifyAccessToken 
async function getSpotifyAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

// fetchNewReleases 
async function fetchNewReleases(token) {
  const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const data = await response.json();
  console.log(data);
}

// TODO Schedule Daily 
function scheduleDailyToDoReminders() {
  cron.schedule('0 8 * * *', async () => {
    console.log('Scheduling daily To-Do reminders');
    const db = client.db("locked-in");
    const today = new Date().toISOString().split('T')[0];
    const todos = await db.collection("To-Do").find({ Done: false }).toArray();

    todos.forEach(todo => {
      const reminderMessage = `Don't forget to complete your task: ${todo.Task}.`;
      createToDoNotification(todo.UserID, todo._id, reminderMessage);
    });
  }, {
    scheduled: true,
    timezone: "US/Eastern"
  });
}

// EventSchedule Daily 
function scheduleEventReminders() {
  cron.schedule('0 7 * * *', async () => { // Runs every day at 7 AM
    console.log('Scheduling daily event reminders');
    const db = client.db("locked-in");
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const events = await db.collection("Calendar").find({
      StartDate: {
        $gte: today.toISOString().split('T')[0],
        $lt: tomorrow.toISOString().split('T')[0]
      },
      EndDate: {
        $gte: today.toISOString().split('T')[0]
      }
    }).toArray();

    events.forEach(event => {
      const reminderMessage = `Reminder: You have an event '${event.Event}' scheduled for today.`;
      createNotification(client, event.UserID, event._id, reminderMessage, "EventReminder");
    });
  }, {
    scheduled: true,
    timezone: "US/Eastern"
  });
}