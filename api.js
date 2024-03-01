// demo api based off on db table, MERB C lab as ref
require('express');
require("mongodb");

async function getNextUserID(db) {
    // Try to increment the counter and return the new value
    const result = await db.collection('Counters').findOneAndUpdate(
      { _id: "userIdCounter" },
      { $inc: { seq: 1 } },
      { returnDocument: 'after', upsert: true } // Ensure the document is created if it doesn't exist
    );
    return result.value.seq;
  }

exports.setApp = function (app, client) {

    app.post('/api/login', async (req, res, next) => {
        // incoming: email, password
        // outgoing: id, firstName, lastName, error
    
        var error = '';
        const { email, password } = req.body; // Use email instead of login
    
        try {
          const db = client.db(); // Use the default database. Adjust if you have a specific db name
          const results = await db.collection('Users').find({ Email: email, Password: password }).toArray();
          
          var id = -1;
          var fn = '';
          var ln = '';
          
          if (results.length > 0) {
            id = results[0].UserID;
            fn = results[0].FirstName;
            ln = results[0].LastName;
          } else {
            error = 'User not found or password incorrect';
          }
          
          var ret = { id: id, firstName: fn, lastName: ln, error: error };
          res.status(200).json(ret);
        } catch (err) {
          console.error("Error during database query", err);
          res.status(500).json({ id: -1, firstName: '', lastName: '', error: 'Internal server error' });
        }
      });

      app.post('/api/signup', async (req, res) => {
        // incoming: firstName, lastName, email, password
        // outgoing: id, error
    
        const { firstName, lastName, email, password } = req.body;
    
        try {
          const db = client.db();
          // Check if email already exists
          const userExists = await db.collection('Users').findOne({ Email: email });
          
          if (userExists) {
            return res.status(400).json({ id: null, error: 'Email already in use' });
          }
    
          // Get the next UserID
          const userID = await getNextUserID(db);
    
          // Create new user object with a specific UserID
          const newUser = {
            UserID: userID,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password, 
          };
    
          // Insert new user into the database
          const result = await db.collection('Users').insertOne(newUser);
    
          // Check if user was successfully created
          if (result.acknowledged) {
            return res.status(200).json({ id: result.insertedId, error: '' });
          } else {
            throw new Error('User creation failed');
          }
        } catch (err) {
          console.error("Error during user registration", err);
          return res.status(500).json({ id: null, error: 'Internal server error' });
        }
      });
}