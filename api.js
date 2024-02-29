// demo api based off on db table, MERB C lab as ref
const express = require('express');
const router = express.Router();

exports.setApp = function (app, client) {


    //sign up endpoint logic
    router.post('/signup', async (req, res, next) => {
        
        const { firstName, lastName, login, password } = req.body;
        const newUser = { FirstName: firstName, LastName: lastName, Login: login, Password: password };
        let error = '';
        try {
            const db = client.db();
            const result = await db.collection('Users').insertOne(newUser);
            const id = result.insertedId;
            res.status(200).json({ id, error });
        } catch (e) {
            error = e.toString();
            res.status(500).json({ error });
        }
    });
    // login endpoint logic
    router.post('/login', async (req, res, next) => {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        let error = '';
        const { login, password } = req.body;
        try {
            const db = client.db();
            const user = await db.collection('Users').findOne({ Login: login, Password: password });
            if (user) {
                const { _id, FirstName, LastName } = user;
                res.status(200).json({ id: _id, firstName: FirstName, lastName: LastName, error });
            } else {
                error = 'Invalid login credentials';
                res.status(401).json({ error });
            }
        } catch (e) {
            error = e.toString();
            res.status(500).json({ error });
        }
    });


    app.use('/api', router);
}


