require('express');
require('mongodb');
require("dotenv").config();
const jwt = require('jsonwebtoken');

const ObjectId = require('mongodb').ObjectId;

async function search(client, req, res, type) {
  try {

    db = client.db("DevFusion");
  
  
    const searchBy = req.body.searchBy;
    const sortBy = req.body.sortBy;
    const query = req.body.query;
    const count = req.body.count;
    const projectId = req.body.projectId
    const userId = req.body.userId

    const initial = Boolean(req.body.initial);

    if (projectId.length != 24) return res.status(400).json({error: "projectId must be 24 characters"})
    
    // req.username
    const user = await db.collection("Users").findOne({ username: req.username })
    // const user = await db.collection("Users").findOne({ _id: new ObjectId(userId) })
    
    
    let project;
    let numOfMatches;
    let date;
    let userTechnologies;
    let projectTechnologies;
    if (!initial) {
      project = await db.collection("Projects").findOne({ _id: new ObjectId(projectId)})
      date = new Date(project.dateCreated)

      // console.log("MY DATE BEFORE: ", project.dateCreated)
      // console.log("MY DATE AFTER: ", date)

      userTechnologies = user.technologies;
      projectTechnologies = project.technologies;
      

      const matchingTechnologies = userTechnologies.filter(tech => projectTechnologies.includes(tech));
      numOfMatches = matchingTechnologies.length;
    }

    let results = null;
    let pipeline = []

    if (type == "discover") {

      // want only open projects
      pipeline.push({
        $match: { isOpen: true }
      })

    } else if (type == "owned") {

      pipeline.push({
        $match: {ownerID: new ObjectId(user._id.toString())}
      })

    } else if (type == "joined") {
      pipeline.push({
        $match: {
          teamMembers: {
            $elemMatch: { $regex: `${user.username}:` }
          }
        }
      })
    } else if (type == "owned-joined") {
      pipeline.push({
        $match: {
          teamMembers: {
            $elemMatch: { $regex: `${user.username}:` }
          }
        }
      })

      pipeline.push({
        $match: {ownerID: new ObjectId(user._id.toString())}
      })

    }


    // console.log("GRABBING ONLY OPENS")
    // console.log(await db.collection("Projects").aggregate(pipeline).toArray())
    
    // filter results that has contains query
    if (searchBy == "title") {
      console.log("LOOKING AT TITLE")

      console.log("THIS IS MY QUERY: ", query)
      pipeline.push({
        $match: { title: {$regex: `.*${query}.*`, $options: 'i'}}
      })

    } else if (searchBy == "technologies") {

      pipeline.push({
        $match: { technologies: {$regex: `.*${query}.*`, $options: 'i'}}
      })

    } else if (searchBy == "roles") {

      pipeline.push({
        $match: { roles: {$regex: `.*${query}.*`, $options: 'i'}}
      })

    } else if (searchBy == "description") {

      pipeline.push({
        $match: { description: {$regex: `.*${query}.*`, $options: 'i'}}
      })

    }

    // console.log("entering with this pipeline", pipeline)
    // console.log("GRABBING ONLY MATCHING QUERY NOW")
    // console.log(await db.collection("Projects").aggregate(pipeline).toArray())

    // !initial == cursor is being sent over, remove/cut off data that has already been seen
    // initial, then do nothing, can potentially show everything, no need to cut off certain data since all have been unseen
    console.log("INITIAL IS: ", initial)
    if (!initial) {
      console.log("GOING TO CUT OFF SOME STUFF")

      if (sortBy == "relevance") {

        pipeline.push({
          $match: {
            $or: [
              {
                $expr: {
                  $lt: [
                    {
                      $size: {
                        $setIntersection: [
                          '$technologies',
                          userTechnologies
                        ]
                      }
                    },
                    numOfMatches
                  ]
                }
              },
              {
                $and: [
                  {
                    $expr: {
                      $eq: [
                        {
                          $size: {
                            $setIntersection: [
                              '$technologies',
                              userTechnologies
                            ]
                          }
                        },
                        numOfMatches
                      ]
                    }
                  },
                  {
                    _id: {
                      $gt: project._id
                    }
                  }
                ]
              }
            ]
          }
        });

      } else if (sortBy == "recent") {

        console.log("CUTTING OFF BY RECENCY")

        // does not account for projects created exactly AT the same time, but almost imposible so i don't think about it
        pipeline.push({
          $match: {
            $or: [
              {
                dateCreated: {
                  $lt:  date
                }
              },
              {
                $and: [
                  {
                    dateCreated: {
                      $eq: date
                    }
                  },
                  {
                    _id: {
                      $gt: project._id
                    }
                  }
                ]
              }
            ]
          }
        })
      }
    }

    // console.log("HERE IS THE PIPELINE, ", pipeline)
    // console.log("IF CURSOR WAS GIVEN, ONLY LOOKING AT EVERYTHING AFTER CURSOR")
    // console.log(await db.collection("Projects").aggregate(pipeline).toArray())


    // sort data
    if (sortBy == "relevance") {

      pipeline.push({$addFields: {
          relevance: {
            $size: {
              $filter: {
                input: '$technologies',
                as: 'tech',
                cond: {
                  $in: [
                    '$$tech',
                    user.technologies
                  ]
                }
              }
            }
          }
        }
      },
      { $sort: { relevance: -1, _id: 1 } })

    } else if (sortBy == "recent") {

      pipeline.push(
        { $sort: { dateCreated: -1, _id: 1 } }
      )
    }

    // console.log("LOOKING AT THE SORTED DATA BY SORT BY")
    // console.log(await db.collection("Projects").aggregate(pipeline).toArray())

    // display first X data
    pipeline.push({
      $limit: count
    })

    // console.log("GOT MY SEARCH RESULTS");
    // console.log("SHOWING ONLY THE FIRST " + count)
    // console.log(await db.collection("Projects").aggregate(pipeline).toArray())

    results = await db.collection("Projects").aggregate(pipeline).toArray()

    return res.status(200).json(results)

  } catch(e) {
      console.log(e)

      return res.status(500).json(e)
  }
}

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
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
      res.cookie("token", newToken, {
          httpOnly: true,
          path: '/'
      });
      next();
  } catch (e) {
      res.clearCookie("token");
      return res.status(403).json({ error: "token is not valid" });
  }
}

exports.setApp = function (app, client) {

    app.get('/api/project/:projectId', async (req, res, next) => {

      try {

        let db = client.db("DevFusion");
  
        let id = req.params.projectId

        if (id.length != 24) return res.status(400).json({error: "projectId must be 24 characters"})
  
        let project = await db.collection("Projects").findOne({ _id: new ObjectId(id) })

        if (project == null) {
          return res.status(404).json({"error": "Project ID does not exist"})
        }
  
        return res.status(200).json(project)

      } catch (e) {
        return res.status(500).json(e)
      }


    })
    
    // create a project
    app.post('/api/project', cookieJwtAuth, async (req, res, next) => {


      
      try {

          db = client.db("DevFusion");
    
          let user = await db.collection("Users").findOne( {username: req.username})

          
          let isOpen = true;
          let isDone = false;
          let isStarted = false;
          let dateCreated = new Date()
          
          let ownerID = user._id
          
          let title = req.body.title;
          let projectStartDate = new Date(req.body.projectStartDate);
          let deadline = new Date(req.body.deadline);
          var description = req.body.description;
    
          let roles = req.body.roles;
          let technologies = req.body.technologies;
    
          let communications = req.body.communications;
          let teamMembers = [];
    
          project = {
              isOpen: isOpen,
              isDone: isDone,
              isStarted: isStarted,
              dateCreated: dateCreated,

              ownerID: ownerID,

              title: title,
              projectStartDate: projectStartDate,
              deadline: deadline,
              description: description,

              roles: roles,
              technologies: technologies,

              communications: communications,
              teamMembers: teamMembers
          };


          db.collection("Projects").insertOne(project);
          return res.sendStatus(200);

        } catch (e) {
            error = e.toString();
            let ret = {error: error};
            return res.status(500).json(ret);
        }
    })

    //edit teamMembers API
    app.put('/api/project/team_members', cookieJwtAuth, async (req, res, next) => {
      var projectId = req.body.projectId;
      var teamMembers = req.body.teamMembers;
      if(projectId.length != 24) return res.status(400).json({error: "projectId must be 24 characters"});
      if(teamMembers == null) return res.status(400).json({error: "teamMembers cannot be null"});
  
  
      const nid = new ObjectId(projectId);
  
      var db;
      var resultFind;
  
      try{
          db = client.db('DevFusion');
          resultFind = await db.collection('Projects').findOne({_id: nid});
          if(resultFind == null || resultFind == undefined) return res.status(404).json({error: "Project not found"});
      } catch (e) {
          error = e.toString;
          var ret = { error: error };
          return res.status(500).json(ret);
      }
  
      var resultPut;
      var query = { _id: nid };
      newValues = { $set: { teamMembers: teamMembers } };
  
      try {
          db = client.db('DevFusion');
          console.log(newValues);
          resultPut = await db.collection('Projects').updateOne(query, newValues);
          return res.status(200).json({error:error});
      } catch (e) {
          error = e.toString;
          var ret = { error: error };
          return res.status(500).json(ret);
      }
  
    });

    /*
    //edit communications API
    app.put('/api/project/communication', cookieJwtAuth, async (req, res, next) => {
      var projectId = req.body.projectId;
      var communication = req.body.communication;
      if(projectId.length != 24) return res.status(400).json({error: "projectId must be 24 characters"});
      if(communication == null) return res.status(400).json({error: "Communication cannot be null"});
  
  
      const nid = new ObjectId(projectId);
  
      var db;
      var resultFind;
  
      try{
          db = client.db('DevFusion');
          resultFind = await db.collection('Projects').findOne({_id: nid});
          if(resultFind == null || resultFind == undefined) return res.status(404).json({error: "Project not found"});
      } catch (e) {
          error = e.toString;
          var ret = { error: error };
          return res.status(500).json(ret);
      }
  
      var resultPut;
      var query = { _id: nid };
      newValues = { $set: { communications: communication } };
  
      try {
          db = client.db('DevFusion');
          console.log(newValues);
          resultPut = await db.collection('Projects').updateOne(query, newValues);
          return res.status(200).json({error:error});
      } catch (e) {
          error = e.toString;
          var ret = { error: error };
          return res.status(500).json(ret);
      }
  
    });
    */
    
    app.post('/api/discover', cookieJwtAuth, async (req, res, next) => {
        // const searchBy = req.query.searchBy;
        // const query = req.query.query;
        // const count = req.query.count;
        // const objectId = req.query.objectId

        // derived variables

        
        // console.log("PROJECT CURSOR: ")
        // console.log(project)

        // // const date = project.dateCreated

        // console.log("MY USER: ", user)
        // console.log(user._id)
        // console.log(user._id.toString())


        // console.log("HERE IS MY INFO")

        // console.log(searchBy)
        // console.log(sortBy)
        // console.log(query)
        // console.log(count)
        // console.log(projectId)
        // console.log(numOfMatches)
        // console.log(date)

      return search(client, req, res, "discover");

    })


    app.post('/api/owned-projects', cookieJwtAuth, async (req, res, next) => {

      return search(client, req, res, "owned");
    })

    app.post('/api/joined-projects', cookieJwtAuth, async (req, res, next) => {

      return search(client, req, res, "joined");
    })

    app.post('/api/owned-joined', cookieJwtAuth, async (req, res, next) => {

      return search(client, req, res, "owned-joined");
    })


    app.put('/api/edit-project', cookieJwtAuth, async (req, res, next) => {

      try {
        let username = req.username;

        db = client.db("DevFusion");

        const user = await db.collection("Users").findOne({ username: username })
        // const user = await db.collection("Users").findOne({ username: req.body.username })
        const projectObj = await db.collection("Projects").findOne({ _id: new ObjectId(req.body.projectId) })


        if (user._id.toString() !== projectObj.ownerID.toString()) {
          return res.status(400).json({"error": "This user can't edit the project since the user is not the owner"})
        }

  
        let isOpen = Boolean(req.body.isOpen);
        let isDone = Boolean(req.body.isDone);
        let isStarted = Boolean(req.body.isStarted);

        let ownerID = user._id;

        let deadline = new Date(req.body.deadline);
        let projectStartDate = new Date(req.body.projectStartDate);
        let roles = req.body.roles;
        let technologies = req.body.technologies;
        let title = req.body.title;
        let description = req.body.description;
        let communication = req.body.communication;


        let project = {
            isOpen: isOpen,
            isDone: isDone,
            isStarted: isStarted,

            ownerID: ownerID,

            deadline: deadline,
            projectStartDate: projectStartDate,
            roles: roles,
            technologies: technologies,
            title: title,
            description: description,
            communications: communication
        };


        await db.collection('Projects').updateOne(
          { _id: projectObj._id },
          {
            $set: project
          }
        )
        
        return res.sendStatus(200);
          
      } catch (e) {
          error = e.toString();
          let ret = {error: error};
          return res.status(500).json(ret);
      }
    })

    app.delete('/api/project/:projectId', cookieJwtAuth, async (req, res, next) => {

      try {
  
        let db = client.db("DevFusion")
  
  
        let user = await db.collection("Users").findOne({ username: req.username })
  
        // console.log(user)
  
        let project = await db.collection("Projects").findOne({ _id: new ObjectId(req.params.projectId) })
  
        // console.log(user._id, project.ownerID)
        // console.log("project: ", project)
        if (user._id.toString() !== project.ownerID.toString()) {
          return res.status(400).json({"error": "This user cannot delete the project since the user is not the owner"})
        }
  
        db.collection("Projects").deleteOne({_id: project._id })
  
  
  
        return res.sendStatus(200);

      } catch(e) {
        
        return res.status(500).json(e)
      }
    })

    app.post('/api/leave/project', cookieJwtAuth, async (req, res, next) => {


      try {

        let db = client.db("DevFusion")
  
        let username = req.username
  
        let project = await db.collection("Projects").findOne({ _id: new ObjectId(req.body.projectId) })
  
        // console.log("LOOKING AT PROJECT: ", project)
  
        let teamMembers = project.teamMembers
        // console.log(teamMembers)
  
        let newTeamMembers = null;
  
        for (let i = 0; i < teamMembers.length; i++) {
          
          
          let role = teamMembers[i]
  
          if (role.startsWith(`${username}:`)) {
  
            newTeamMembers = teamMembers.slice(0, i).concat(teamMembers.slice(i+1, teamMembers.length + 1))
            break
  
          }
        }
  
        // console.log(newTeamMembers)
  
        if (newTeamMembers == null) {
          return res.status(400).json({"error": "can not leave project since member was not found in the project"})
        }
  
        await db.collection('Projects').updateOne(
          { _id: project._id },
          {
            $set: {
              "teamMembers": newTeamMembers
            }
          }
        )
  
  
        return res.sendStatus(200)

      } catch (e) {
        return res.status(500).json(e)
      }


    })
}
