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