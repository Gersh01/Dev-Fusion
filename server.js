const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const path = require('path');
const { log } = require('console');
const PORT = process.env.PORT || 4000;

const app = express();

app.set('port', (process.env.PORT || 4000));

app.use(cors());
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect;

//api-----------------

app.post('/api/login', async(req, res, next) =>{
    var id = -1;
    var fn = '';
    var ln = '';
    var email = '';
    var username = '';
    var bio = '';
    var technologies = [];
    var error = '';
    const {login, password} = req.body;
    var db;

    var resultsUsername;
    var resultsEmail;

    var resultsUsernameUnverified;
    var resultsEmailUnverified;
    try{
        db = client.db('DevFusion');
        resultsUsername = await db.collection('Users').find({username:login}).toArray();
        resultsEmail = await db.collection('Users').find({email:login}).toArray();
        resultsUsernameUnverified = await db.collection('UnverifiedUsers').find({username:login}).toArray();
        resultsEmailUnverified = await db.collection('UnverifiedUsers').find({email:login}).toArray();
    }catch(e){
        error = e.toString;
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, error:error};
        res.status(500).json(ret);
    }

    if( resultsUsername.length > 0 ){ //Login matched a verified user's username
        if(resultsUsername[0].password === password){ //Password matched
            id = resultsUsername[0]._id;
            fn = resultsUsername[0].firstName;
            ln = resultsUsername[0].lastName;
            confirmation = resultsUsername[0].confirmation;
            email = resultsUsername[0].email;
            username = resultsUsername[0].username;
            bio = resultsUsername[0].bio;
            technologies = resultsUsername[0].technologies;
            var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, bio:bio, technologies:technologies, error:error};
            res.status(200).json(ret);
        }else{ //Password did not match
            error = "password is wrong";
            var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, bio:bio, technologies:technologies, error:error};
            res.status(401).json(ret);
        }
    }else if(resultsEmail.length > 0){ //Login matched a verified user's email
        if(resultsEmail[0].password === password){ //Password matched
            id = resultsEmail[0]._id;
            fn = resultsEmail[0].firstName;
            ln = resultsEmail[0].lastName;
            confirmation = resultsEmail[0].confirmation;
            email = resultsEmail[0].email;
            username = resultsEmail[0].username;
            bio = resultsEmail[0].bio;
            technologies = resultsEmail[0].technologies;
            var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, bio:bio, technologies:technologies, error:error};
            res.status(200).json(ret);
        }else{ //Password did not match
            error = "password is wrong";
            var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, bio:bio, technologies:technologies, error:error};
            res.status(401).json(ret);
        }
    }else if( resultsUsernameUnverified.length > 0 ){ //Login matched a unverified user's username
        id = resultsUsernameUnverified[0]._id;
        fn = resultsUsernameUnverified[0].firstName;
        ln = resultsUsernameUnverified[0].lastName;
        confirmation = resultsUsernameUnverified[0].confirmation;
        email = resultsUsernameUnverified[0].email;
        username = resultsUsernameUnverified[0].username;
        bio = resultsUsernameUnverified[0].bio;
        technologies = resultsUsernameUnverified[0].technologies;
        error = "User is not verified";
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, bio:bio, technologies:technologies, error:error};
        res.status(401).json(ret);
    }else if(resultsEmailUnverified.length > 0){ //Login matched a unverified user's email
        id = resultsEmailUnverified[0]._id;
        fn = resultsEmailUnverified[0].firstName;
        ln = resultsEmailUnverified[0].lastName;
        confirmation = resultsEmailUnverified[0].confirmation;
        email = resultsEmailUnverified[0].email;
        username = resultsEmailUnverified[0].username;
        bio = resultsEmailUnverified[0].bio;
        technologies = resultsEmailUnverified[0].technologies;
        error = "User is not verified";
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, bio:bio, technologies:technologies, error:error};
        res.status(401).json(ret);
    }else{ //Login did not match any user
        error = "Login did not match any user";
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, bio:bio, technologies:technologies, error:error};
        res.status(404).json(ret);
    }
    
});

app.post('/api/register', async(req, res, next) =>{
    var db;
    try{
        db = client.db('DevFusion');
    }catch(e){
        error = e.toString;
        var ret = {error:error};
        res.status(500).json(ret);
    }

    const {firstName, lastName, password, username, email} = req.body;
    var timeCreated = new Date();
    const newUser = {firstName:firstName, lastName:lastName, password:password, username:username, email:email, timeCreated:timeCreated, bio:"",
                        technologies:[]};
    var error = '';
    var resultsUsername = await db.collection('Users').find({username:username}).toArray();
    var resultsEmail = await db.collection('Users').find({email:email}).toArray();
    var resultsUsernameUnverified = await db.collection('UnverifiedUsers').find({username:username}).toArray();
    var resultsEmailUnverified = await db.collection('UnverifiedUsers').find({email:email}).toArray();
    if(resultsUsername.length == 0 && resultsEmail.length == 0 && resultsUsernameUnverified.length == 0 && resultsEmailUnverified.length == 0){
        try{
            const result = db.collection('UnverifiedUsers').insertOne(newUser);
            var ret = {error:error};
            res.status(201).json(ret);
        }catch(e){
            error = e.toString();
            var ret = {error:error};
            res.status(500).json(ret);
        }
    }else{
        error = "username is taken";
        var ret = {error:error};
        res.status(400).json(ret);
    }
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
})

