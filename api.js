// demo api based off on db table, MERB C lab as ref
require('express');
require("mongodb");

exports.setApp = function (app, client) {
     // Function to fetch the next sequence value for UserID
     const getNextSequenceValue = async (db, sequenceName) => {
        const result = await db.collection("UserCounter").findOneAndUpdate(
            { _id: sequenceName },
            { $inc: { sequence_value: 1 } },
            { returnOriginal: false }
        );
        return result.value.sequence_value;
    };

    // Create UserCounter collection and insert initial sequence value
    const initializeUserCounter = async () => {
        try {
            const db = client.db();
            await db.createCollection("UserCounter");
            await db.collection("UserCounter").insertOne({ _id: "userId", sequence_value: 0 });
        } catch (e) {
            console.error("Error initializing UserCounter collection:", e);
        }
    };

    initializeUserCounter(); // Initialize UserCounter collection


    //sign up endpoint logic
    app.post('/api/signup', async (req, res) => {
        // incoming fN, lN, email, login, password
        const { firstName, lastName, email, password } = req.body;
        try {
            const db = client.db();
            const userID = await getNextSequenceValue(db, 'userId');
            const newUser = { FirstName: firstName, LastName: lastName, Email: email, Password: password };
            await db.collection('Users').insertOne(newUser);
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