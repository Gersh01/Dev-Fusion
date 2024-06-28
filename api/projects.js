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
        let ownerID = new projectId(req.body.ownerID);
        let currentVsRequired = req.body.currentVsRequired;
        let deadline = new Date(req.body.deadline);
        let projectStartDate = new Date(req.body.projectStartDate);
        let roles = req.body.roles;
        let technologies = req.body.technologies;
        let title = req.body.title;

        var description = req.body.description;
        var communication = req.body.communication;
        var teamMembers = [];

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
                title: title,
                communications: communication,
                description: description,
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

          // want only open projects
          pipeline.push({
            $match: { isOpen: true }
          })

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

    })
}
