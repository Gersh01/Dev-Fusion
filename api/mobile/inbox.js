require('express');
require('mongodb');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectId;

const cookieJwtAuth = (req, res, next) => {
    const token = req.body.token;
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        var username = payload.username;
        req.username = username;
        var rememberMe = payload.rememberMe;
        req.rememberMe = rememberMe;
        var newToken;
        var newPayload = { username, rememberMe };
        if (payload.rememberMe) {
            newToken = jwt.sign(newPayload, process.env.SECRET_KEY, { expiresIn: "1w" });
        }
        else {
            newToken = jwt.sign(newPayload, process.env.SECRET_KEY, { expiresIn: "1h" });
        }
        res.token = newToken;
        next();
    } catch (e) {
        return res.status(403).json({ error: "token is not valid" });
    }
}

exports.setApp = function (app, client) {

    //api for creating new application
    app.post('/api/mobile/inbox/apply', cookieJwtAuth, async (req, res, next) => {
        const projectId = req.body.projectId || "";
        const userId = req.body.userId || "";
        const role = req.body.role || "";
        const description = req.body.description || "";
        if(userId.length != 24) return res.status(400).json({error: "userId must be 24 characters"});
        if(projectId.length != 24) return res.status(400).json({error: "projectId must be 24 characters"});
        if(role == "") return res.status(400).json({error: "role is empty"});

        var error = "";
        const projectNid = new ObjectId(projectId);
        const userNid = new ObjectId(userId);
        
        var db;
        var resultsFindInbox;
        var resultFindUser;
        var resultInsert;
        var resultFindProjects;
        try {
            db = client.db('DevFusion');
            resultFindUser = await db.collection('Users').findOne({ _id: userNid });
            if(resultFindUser == null || resultFindUser == undefined) return res.status(404).json({ error:"User not found" });
            resultsFindInbox = await db.collection('Inbox').find({ projectID: projectNid, userID: userNid}).toArray();
            if(resultsFindInbox.length > 0) return res.status(403).json({ error:"User already applied to this project" });
            resultFindProjects = await db.collection('Projects').findOne({ _id: projectNid });
            if(resultFindProjects == null || resultFindProjects == undefined) return res.status(404).json({error: "project with given projectId not found"});
            var isUserApart = false;
            resultFindProjects.teamMembers.forEach((x, i) => {
                if(x.username == resultFindUser.username) isUserApart = true;
            });
            if(isUserApart) return res.status(401).json({error:"User is already a member of this project"});
            var roleFound = false;
            resultFindProjects.roles.forEach((x, i) => {
                if(x.role == role) roleFound = true;
            });
            if(!roleFound) return res.status(404).json({error: "given role not found in the project the given projectId"});
            const newInbox = {
                projectID: projectNid, userID: userNid , role: role, username: resultFindUser.username, description: description
            };
            resultInsert = await db.collection('Inbox').insertOne(newInbox);
            var ret = {error : ""};
            return res.status(201).json(ret);
        } catch (e) {
            console.log("2");
            error = e.toString;
            var ret = { error: error };
            return res.status(500).json(ret);
        }

    });

    //api for accepting an application
    app.post('/api/mobile/inbox/accept_member', cookieJwtAuth, async (req, res, next) => {
        const projectId = req.body.projectId || "";
        const userId = req.body.userId || "";
        const role = req.body.role || "";
        if(userId.length != 24) return res.status(400).json({error: "userId must be 24 characters"});
        if(projectId.length != 24) return res.status(400).json({error: "projectId must be 24 characters"});
        if(role == "") return res.status(400).json({error: "role is empty"});

        
        var error = "";
        const projectNid = new ObjectId(projectId);
        const userNid = new ObjectId(userId);
        
        var db;
        var resultFind;
        var resultFindUser;
        var resultPut;
        var resultDelete;
        try {
            db = client.db('DevFusion');
            resultFindUser = await db.collection('Users').findOne({ _id: userNid });
            if(resultFindUser == null || resultFindUser == undefined) {
                return res.status(404).json({error: "User not found"});
            }
            resultFind = await db.collection('Projects').findOne({ _id: projectNid });
            if(resultFind != null || resultFind != undefined){
                var roleFound = false;
                resultFind.roles.forEach((x, i) => {
                    if(x.role == role) roleFound = true;
                });
                if(roleFound){
                    resultFind.teamMembers.forEach((x, i) => {
                        if(x.userId == userId) return res.status(401).json({error: "User already has a role"});
                    });
                    var newTeamMember = {"role": role, "userId": userId, "username": resultFindUser.username};
                    resultPut = await db.collection('Projects').updateOne({ _id: projectNid }, { $push: {teamMembers : newTeamMember} });
                    resultDelete = await db.collection('Inbox').deleteMany({projectID: projectNid, userID: userNid});
                    return res.status(200).json({error:""});
                }else{
                    return res.status(404).json({error: "Role not found"});
                }
            }else{
                return res.status(404).json({error: "Project not found"});
            }
        } catch (e) {
            error = e.toString;
            var ret = { error: error };
            return res.status(500).json(ret);
        }
    });

    //api for rejecting an application
    app.post('/api/mobile/inbox/reject_member', cookieJwtAuth, async (req, res, next) => {
        const projectId = req.body.projectId || "";
        const userId = req.body.userId || "";
        const role = req.body.role || "";
        if(userId.length != 24) return res.status(400).json({error: "userId must be 24 characters"});
        if(projectId.length != 24) return res.status(400).json({error: "projectId must be 24 characters"});

        var error = "";
        const projectNid = new ObjectId(projectId);
        const userNid = new ObjectId(userId);
        
        var db;
        var resultsFind;
        var resultsDelete;
        try {
            db = client.db('DevFusion');
            if(role == "") resultsFind = await db.collection('Inbox').find({ projectID: projectNid, userID: userNid }).toArray();
            else resultsFind = await db.collection('Inbox').find({ projectID: projectNid, userID: userNid, role: role }).toArray();
            if(resultsFind.length > 0){
                if(role == "") resultsDelete = await db.collection('Inbox').deleteMany({projectID: projectNid, userID: userNid});
                else resultsDelete = await db.collection('Inbox').deleteMany({projectID: projectNid, userID: userNid, role: role});
                var ret = { error: error };
                return res.status(200).json(ret);
            }else{
                error = "No applications found";
                var ret = { error: error };
                return res.status(404).json(ret);
            }
        } catch (e) {
            error = e.toString;
            var ret = { error: error };
            return res.status(500).json(ret);
        }

    });

    //api for getting all members who applied
    app.get('/api/mobile/inbox/:projectId', cookieJwtAuth, async (req, res, next) => {
        const projectId = req.params.projectId;
        if(projectId.length != 24) return res.status(400).json({error: "projectId must be 24 characters"});
        const nid = new ObjectId(projectId);
        var error = "";

        var db;
        var results;
        var resultFindProject;
        try {
            db = client.db('DevFusion');
            results = await db.collection('Inbox').find({ projectID: nid }).toArray();
            resultFindProject = await db.collection('Projects').findOne({ _id: nid });
        } catch (e) {
            error = e.toString;
            var ret = { error: error };
            return res.status(500).json(ret);
        }

        if(resultFindProject == null || resultFindProject == undefined) return res.status(400).json({error: "Project not found"});


        if(results.length > 0){
            var appliedUsers = [];
            results.forEach((x, i) => {
                console.log(x.username);
                appliedUsers.push( {userId: x.userID, username: x.username, role: x.role, description: x.description} );
            });
            var ret = { projectTitle: resultFindProject.title, appliedUsers, error: error};
            return res.status(200).json(ret);
        }else{
            var appliedUsers = [];
            var ret = { projectTitle: resultFindProject.title, appliedUsers, error: error};
            return res.status(200).json(ret);
        }
    });

}