// demo api based off on db table, MERB C lab as ref
require('express');
require("mongodb");

exports.setApp = function (app, client) {

    //sign up endpoint logic
    app.post('/api/signup', async (req, res) => {
        // incoming fN, lN, email, login, password
        const { firstName, lastName, email, password } = req.body;
        const newUser = { FirstName: firstName, LastName: lastName, Email: email, Password: password };
        try {
            const db = client.db();
            const result = await db.collection('Users').insertOne(newUser);
            const insertedId = result.insertedId;
            res.status(200).json({ id: insertedId.toString(), error: '' });
        } catch (e) {
            res.status(500).json({ error: e.toString() });
        }
    });

    // login endpoint logic
    app.post('/api/login', async (req, res) => {
        const { email, password } = req.body;
        try {
            const db = client.db();
            console.log('Attempting to find user with email:', email); // trouble shooting
            const user = await db.collection('Users').findOne({ Email: email, Password: password });
            console.log('User found:', user); // trouble shooting
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