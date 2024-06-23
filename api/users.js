require('express');
require('mongodb');
const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.username = payload.username;
        next();
    } catch (e) {
        res.clearCookie("token");
        return res.status(403).json({error: "token is not valid"});
    }
}

exports.setApp = function (app, client) {

    //login api
    app.post('/api/login', async (req, res, next) => {
        var id = -1;
        var fn = '';
        var ln = '';
        var email = '';
        var username = '';
        var bio = '';
        var technologies = [];
        var error = '';
        const { login, password } = req.body;
        var db;

        var resultsUsername;
        var resultsEmail;

        var resultsUsernameUnverified;
        var resultsEmailUnverified;
        try {
            db = client.db('DevFusion');
            resultsUsername = await db.collection('Users').find({ username: login }).toArray();
            resultsEmail = await db.collection('Users').find({ email: login }).toArray();
            resultsUsernameUnverified = await db.collection('UnverifiedUsers').find({ username: login }).toArray();
            resultsEmailUnverified = await db.collection('UnverifiedUsers').find({ email: login }).toArray();
        } catch (e) {
            error = e.toString;
            var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, error: error };
            res.status(500).json(ret);
        }

        if (resultsUsername.length > 0) { //Login matched a verified user's username
            if (resultsUsername[0].password === password) { //Password matched
                id = resultsUsername[0]._id;
                fn = resultsUsername[0].firstName;
                ln = resultsUsername[0].lastName;
                confirmation = resultsUsername[0].confirmation;
                email = resultsUsername[0].email;
                username = resultsUsername[0].username;
                bio = resultsUsername[0].bio;
                technologies = resultsUsername[0].technologies;
                var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
                const payload = { username };
                var token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "30s"});
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.status(200).json(ret);
            } else { //Password did not match
                error = "password is wrong";
                var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
                res.status(401).json(ret);
            }
        } else if (resultsEmail.length > 0) { //Login matched a verified user's email
            if (resultsEmail[0].password === password) { //Password matched
                id = resultsEmail[0]._id;
                fn = resultsEmail[0].firstName;
                ln = resultsEmail[0].lastName;
                confirmation = resultsEmail[0].confirmation;
                email = resultsEmail[0].email;
                username = resultsEmail[0].username;
                bio = resultsEmail[0].bio;
                technologies = resultsEmail[0].technologies;
                var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
                const payload = { username };
                var token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "30s"});
                res.cookie("token", token, {
                    httpOnly: true
                });
                res.status(200).json(ret);
            } else { //Password did not match
                error = "password is wrong";
                var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
                res.status(401).json(ret);
            }
        } else if (resultsUsernameUnverified.length > 0) { //Login matched an unverified user's username
            id = resultsUsernameUnverified[0]._id;
            fn = resultsUsernameUnverified[0].firstName;
            ln = resultsUsernameUnverified[0].lastName;
            confirmation = resultsUsernameUnverified[0].confirmation;
            email = resultsUsernameUnverified[0].email;
            username = resultsUsernameUnverified[0].username;
            bio = resultsUsernameUnverified[0].bio;
            technologies = resultsUsernameUnverified[0].technologies;
            error = "User is not verified";
            var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
            res.status(401).json(ret);
        } else if (resultsEmailUnverified.length > 0) { //Login matched an unverified user's email
            id = resultsEmailUnverified[0]._id;
            fn = resultsEmailUnverified[0].firstName;
            ln = resultsEmailUnverified[0].lastName;
            confirmation = resultsEmailUnverified[0].confirmation;
            email = resultsEmailUnverified[0].email;
            username = resultsEmailUnverified[0].username;
            bio = resultsEmailUnverified[0].bio;
            technologies = resultsEmailUnverified[0].technologies;
            error = "User is not verified";
            var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
            res.status(401).json(ret);
        } else { //Login did not match any user
            error = "Login did not match any user";
            var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
            res.status(404).json(ret);
        }

    });

    //register api
    app.post('/api/register', async (req, res, next) => {
        var db;
        try {
            db = client.db('DevFusion');
        } catch (e) {
            error = e.toString;
            var ret = { error: error };
            res.status(500).json(ret);
        }

        const { firstName, lastName, password, username, email } = req.body;
        var timeCreated = new Date();
        const newUser = {
            firstName: firstName, lastName: lastName, password: password, username: username, email: email, timeCreated: timeCreated, bio: "",
            technologies: []
        };
        var error = '';
        var resultsUsername = await db.collection('Users').find({ username: username }).toArray();
        var resultsEmail = await db.collection('Users').find({ email: email }).toArray();
        var resultsUsernameUnverified = await db.collection('UnverifiedUsers').find({ username: username }).toArray();
        var resultsEmailUnverified = await db.collection('UnverifiedUsers').find({ email: email }).toArray();
        if (resultsUsername.length == 0 && resultsEmail.length == 0 && resultsUsernameUnverified.length == 0 && resultsEmailUnverified.length == 0) {
            try {
                const result = db.collection('UnverifiedUsers').insertOne(newUser);
                var ret = { error: error };
                res.status(201).json(ret);
            } catch (e) {
                error = e.toString();
                var ret = { error: error };
                res.status(500).json(ret);
            }
        } else {
            error = "username is taken";
            var ret = { error: error };
            res.status(400).json(ret);
        }
    });

    //create user api
    app.post('/api/user', async (req, res, next) => {

    });

    //update user api
    app.put('/api/user', async (req, res, next) => {

    });

    //api to test jwt authentication
    app.post('/api/jwtTest', cookieJwtAuth, async (req, res, next) => {
        var id = -1;
        var fn = '';
        var ln = '';
        var email = '';
        var bio = '';
        var technologies = [];
        var error = '';

        const username = req.username;

        var db;
        var result;

        try {
            db = client.db('DevFusion');
            result = await db.collection('Users').find({ username: username }).toArray();
        } catch (e) {
            error = e.toString;
            var ret = { error: error };
            res.status(500).json(ret);
        }

        if (result.length > 0) {
            id = result[0]._id;
            fn = result[0].firstName;
            ln = result[0].lastName;
            confirmation = result[0].confirmation;
            email = result[0].email;
            bio = result[0].bio;
            technologies = result[0].technologies;
            var ret = { id: id, firstName: fn, lastName: ln, email: email, username: username, bio: bio, technologies: technologies, error: error };
            res.status(200).json(ret);
        }else{
            error = "username does not exist";
            var ret = {error: error};
            res.status(404).json(ret);
        }
    });

}
