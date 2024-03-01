// demo api based off on db table, MERB C lab as ref
require('express');
require("mongodb");

exports.setApp = function (app, client) {


    //sign up endpoint logic
    app.post('/api/signup', async (req, res) => {
        // incoming fN, lN, email, login, password
        const { firstName, lastName, email, login, password } = req.body;
        const newUser = { FirstName: firstName, LastName: lastName, Email: email, Login: login, Password: password };
        try {
            const db = client.db();
            const result = await db.collection('Users').insertOne(newUser);
            res.status(200).json({ id: result.insertedId, error: '' });
        } catch (e) {
            res.status(500).json({ error: e.toString() });
        }
    });
    // login endpoint logic
    app.post('/api/login', async (req, res) => {
        const { login, password } = req.body;
        try {
            const db = client.db();
            const user = await db.collection('Users').findOne({ Login: login, Password: password });
            if (user) {
                const { UserID, FirstName, LastName } = user;
                res.status(200).json({ id: UserID, firstName: FirstName, lastName: LastName, error: '' });
            } else {
                res.status(401).json({ error: 'Invalid login credentials' });
            }
        } catch (e) {
            res.status(500).json({ error: e.toString() });
        }
    });

}


