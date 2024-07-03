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

    //api for creating Project Details
    app.post('/api/project_details', async (req, res, next) => {
        const communications = req.body.communications || [];
        const teamMembers = req.body.teamMembers || [];
        const projectId = req.body.projectId;

        if(projectId == null || projectId == undefined) return res.status(400).json({error: "projectId is not defined"});

        const nid = new ObjectId(projectId);

        var db;
        var resultFindProject;
        var resultFindDetail;

        try {
            db = client.db('DevFusion');
            resultFindProject = await db.collection('ProjectData').findOne({ _id: nid });
            resultFindDetail = await db.collection('ProjectDetails').findOne({ projectId: nid });
            result
        } catch (e) {
            error = e.toString;
            var ret = { error: error };
            return res.status(500).json(ret);
        }

        if(resultFindProject == null || resultFindProject == undefined) return res.status(404).json({error: "project with projectId not found"});
        if(resultFindDetail != null || resultFindDetail != undefined) return res.status(401).json({error: "project detail with projectId exists"});

        try{
            const newProjectDetails = {
                communications: communications, teamMembers: teamMembers, projectId: projectId
            };
            const resultProjectDetailsInsert = db.collection('ProjectDetails').insertOne(newProjectDetails);
            return res.status(201).json({ error: "" });
        }catch (e) {
            error = e.toString();
            var ret = { error: error };
            return res.status(500).json(ret);
        }

    });

    //api for adding a member
    app.post('/api/project_details/member', async (req, res, next) => {

    });

    //api for deleting a member
    app.put('/api/project_details/member', async (req, res, next) => {

    });

    //api for adding a role to a member
    app.post('/api/project_details/role', async (req, res, next) => {

    });
    
    //api for deleting a role from a member
    app.put('/api/project_details/role', async (req, res, next) => {

    });

    //api for editing communications array
    app.put('/api/project_details/communication', async (req, res, next) => {

    });

}