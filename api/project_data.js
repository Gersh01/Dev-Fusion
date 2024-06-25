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
    
    // create a project
    app.post('/api/project', async (req, res, next) => {
        let isOpen = Boolean(req.body.isOpen);
        let isDone = Boolean(req.body.isDone);
        let isStarted = Boolean(req.body.isStarted);
        let dateCreated = new Date(req.body.dateCreated);
        let ownerID = new ObjectId(req.body.ownerID);
        let currentVsRequired = req.body.currentVsRequired;
        let deadline = new Date(req.body.deadline);
        let projectStartDate = new Date(req.body.projectStartDate);
        let roles = req.body.roles;
        let technologies = req.body.technologies;
        let title = req.body.title;

        try {
            db = client.db("DevFusion");
            project = {
                isOpen: isOpen,
                isDone: isDone,
                isStarted: isStarted,
                dateCreated: dateCreated,
                ownerID: ownerID,
                currentVsRequired: currentVsRequired,
                deadline: deadline,
                projectStartDate: projectStartDate,
                roles: roles,
                technologies: technologies,
                title: title
            };


            db.collection("ProjectData").insertOne(project);
            return res.sendStatus(200);
        } catch (e) {
            error = e.toString();
            let ret = {error: error};
            return res.status(500).json(ret);
        }
    })
}