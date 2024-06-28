require('express');
require('mongodb');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectId;

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

    //api for getting all members who applied
    app.get('/api/inbox', async (req, res, next) => {
        const projectId = req.body.projectId;
        const nid = new ObjectId(projectId);
        var error = "";

        var db;
        var results;
        try {
            db = client.db('DevFusion');
            results = await db.collection('Inbox').find({ projectID: nid }).toArray();
        } catch (e) {
            error = e.toString;
            var ret = { error: error };
            return res.status(500).json(ret);
        }


        if(results.length > 0){
            var appliedUsers = [];
            results.forEach((x, i) => {
                appliedUsers.push( {userId: x.userID, role: x.role} );
            });
            var ret = { appliedUsers, error: error};
            return res.status(200).json(ret);
        }else{
            error = "No applied user";
            var ret = { error: error };
            return res.status(404).json(ret);
        }
    });

    //api for creating new application
    app.post('/api/inbox/apply', async (req, res, next) => {

    });

    //api for accepting an application
    app.post('/api/inbox/accept_member', async (req, res, next) => {
        
    });

    //api for rejecting an application
    app.post('/api/inbox/reject_member', async (req, res, next) => {
        
    });

}