const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
    var error = '';
    const {login, password} = req.body;
    var db;

    var resultsUsername;
    var resultsEmail;

    var resultsUsernameUnverified;
    var resultsEmailUnverified;
    try{
        db = client.db('DevFusion');
        resultsUsername = await db.collection('Users').find({username:login,password:password}).toArray();
        resultsEmail = await db.collection('Users').find({email:login,password:password}).toArray();
        resultsUsernameUnverified = await db.collection('UnverifiedUsers').find({username:login}).toArray();
        resultsEmailUnverified = await db.collection('UnverifiedUsers').find({email:login}).toArray();
    }catch(e){
        error = e.toString;
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, error:error};
        res.status(500).json(ret);
    }

    if( resultsUsername.length > 0 ){
        id = resultsUsername[0]._id;
        fn = resultsUsername[0].firstName;
        ln = resultsUsername[0].lastName;
        confirmation = resultsUsername[0].confirmation;
        email = resultsUsername[0].email;
        username = resultsUsername[0].username;
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, error:error};
        res.status(200).json(ret);
    }else if(resultsEmail.length > 0){
        id = resultsEmail[0]._id;
        fn = resultsEmail[0].firstName;
        ln = resultsEmail[0].lastName;
        confirmation = resultsEmail[0].confirmation;
        email = resultsEmail[0].email;
        username = resultsEmail[0].username;
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, error:error};
        res.status(200).json(ret);
    }else if( resultsUsernameUnverified.length > 0 ){
        id = resultsUsernameUnverified[0]._id;
        fn = resultsUsernameUnverified[0].firstName;
        ln = resultsUsernameUnverified[0].lastName;
        confirmation = resultsUsernameUnverified[0].confirmation;
        email = resultsUsernameUnverified[0].email;
        username = resultsUsernameUnverified[0].username;
        error = "User is not verified";
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, error:error};
        res.status(401).json(ret);
    }else if(resultsEmailUnverified.length > 0){
        id = resultsEmailUnverified[0]._id;
        fn = resultsEmailUnverified[0].firstName;
        ln = resultsEmailUnverified[0].lastName;
        confirmation = resultsEmailUnverified[0].confirmation;
        email = resultsEmailUnverified[0].email;
        username = resultsEmailUnverified[0].username;
        error = "User is not verified";
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, error:error};
        res.status(401).json(ret);
    }else{
        error = "Login or/and password is wrong";
        var ret = { id:id, firstName:fn, lastName:ln, email:email, username:username, error:error};
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
    const newUser = {firstName:firstName, lastName:lastName, password:password, username:username, email:email};
    var error = '';
    var results = await db.collection('Users').find({username:username}).toArray();
    if(results.length == 0){
        results = await db.collection('Users').find({email:email}).toArray();
    }
    if(results.length == 0){
        try{
            const result = db.collection('Users').insertOne(newUser);
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

