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

    
    app.get('/api/discover', async (req, res, next) => {
        // const searchBy = req.query.searchBy;
        // const query = req.query.query;
        // const count = req.query.count;
        // const objectId = req.query.objectId
        
        db = client.db("DevFusion");
        const searchBy = "title";
        const sortBy = "relevance";
        const query = "";
        const count = 5;
        const objectId = new ObjectId("667147e07d5f8d94a8a374c2")

        let user = await db.collection("Users").findOne({ _id: objectId })

        console.log("MY USER: ", user)
        const date = new Date("1900-05-24T10:00:00.000+00:00")

        let results = null;
        let pipeline = []

        try {
          // want only open projects
          pipeline.push({
            $match: { isOpen: true }
          })
          
          // filter results that has contains query
          if (searchBy == "title") {

            pipeline.push({
              $match: {title: {$regex: '.*' + query + '.*'}}
            })

          } else if (searchBy == "technologies") {

            pipeline.push({
              $match: {technologies: {$regex: '.*' + query + '.*'}}
            })

          } else if (searchBy == "roles") {

            pipeline.push({
              $match: {technologies: {$regex: '.*' + query + '.*'}}
            })

          } else if (searchBy == "description") {
            // wierd man
          }


          // !initial == cursor is being sent over, remove/cut off data that has already been seen
          // initial, then do nothing, can potentially show everything, no need to cut off certain data since all have been unseen
          if (!initial) {

            if (searchBy == "relevance") {

              pipeline.push({
                $match: {
                  $or: [
                    {
                      $expr: {
                        $gt: [
                          {
                            $size: {
                              $setIntersection: [
                                '$technologies',
                                user.technologies
                              ]
                            }
                          },
                          1
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
                                    user.technologies
                                  ]
                                }
                              },
                              1
                            ]
                          }
                        },
                        {
                          _id: {
                            $gt: ObjectId(
                              user._id.toString()
                            )
                          }
                        }
                      ]
                    }
                  ]
                }
              });

            } else if (searchBy == "recent") {

              // does not account for projects created exactly AT the same time, but almost imposible so i don't think about it
              pipeline.push({
                $match: {
                  dateCreated: {
                    $gt: date
                  }
                }
              })

            }
          }


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
            { $sort: { relevance: 1, _id: 1 } })

          } else if (sortBy == "recent") {

            pipeline.push(
              { $sort: { dateCreated: -1 } }
            )
          }

          // display first X data
          pipeline.push({
            $limit: count
          })

          results = db.collection("ProjectData").aggregate(pipeline)

          console.log("GOT MY SEARCH RESULTS");
          console.log(results)
          return res.status(200).json(results)

        } catch(e) {
            console.log(e)

            return res.status(500).json(e)
        }

    })
}