const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const { log } = require('console');
const PORT = process.env.PORT || 5000;

const app = express();

app.set('port', (process.env.PORT || 5000));

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
    var error = '';
    const {login, password} = req.body;
    var db;
    var resultsUsername;
    var resultsEmail;
    try{
        db = client.db('DevFusion');
        resultsUsername = await db.collection('Users').find({username:login,password:password}).toArray();
        resultsEmail = await db.collection('Users').find({email:login,password:password}).toArray();
    }catch(e){
        error = e.toString;
    }
    // const db = client.db('DevFusion');
    // const resultsUsername = await db.collection('Users').find({username:login,password:password}).toArray();
    // const resultsEmail = await db.collection('Users').find({email:login,password:password}).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    if( resultsUsername.length > 0 ){
        id = resultsUsername[0]._id;
        fn = resultsUsername[0].firstName;
        ln = resultsUsername[0].lastName;
        confirmation = resultsUsername[0].confirmation;
        email = resultsUsername[0].email;
        username = resultsUsername[0].username;
    }else if(resultsEmail.length > 0){
        id = resultsEmail[0]._id;
        fn = resultsEmail[0].firstName;
        ln = resultsEmail[0].lastName;
        confirmation = resultsEmail[0].confirmation;
        email = resultsEmail[0].email;
        username = resultsEmail[0].username;
    }else{
        error = "user not found";
    }
    var ret = { id:id, firstName:fn, lastName:ln, confirmation:confirmation, email:email, username:username, error:''};
    res.status(200).json(ret);
});

app.post('/api/register', async(req, res, next) =>{
    var db;
    try{
        db = client.db('DevFusion');
    }catch(e){
        error = e.toString;
    }

    const {firstName, lastName, password, username, email} = req.body;
    const newUser = {firstName:firstName, lastName:lastName, password:password, username:username, email:email, confirmation:false};
    var error = '';
    var results = await db.collection('Users').find({username:username}).toArray();
    if(results.length == 0){
        results = await db.collection('Users').find({email:email}).toArray();
    }
    if(results.length == 0){
        try{
            const result = db.collection('Users').insertOne(newUser);
        }catch(e){
            error = e.toString();
        }
    }else{
        error = "username is taken";
    }
    var ret = {error:error};
    res.status(200).json(ret);
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

