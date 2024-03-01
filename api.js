// demo api based off on db table, MERB C lab as ref
require('express');
require("mongodb");

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
}