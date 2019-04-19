const Project = require("../models").project;
const File = require("../models").file;
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

module.exports = {
  // Requires name for project, description, userId(grabbed from token)
  create(req, res) {
    return Project.create({
      name: req.body.name,
      description: req.body.description,
      userId: req.decoded.id
    })
      .then(project => {
        mkdirp(`projects/${project.userId}/${project.id}`, err => {
          if (err) {
            throw new Error(err);
          } else {
            res.status(200).send(project);
          }
        });
      })
      .catch(err => res.status(400).send(err));
  },

  // Parameter: id
  getProjectById(req, res) {
    Project.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: File
        }
      ]
    })
      .then(project => {
        res.status(200).send(project)
      })
      .catch(err => res.status(400).send(err));
  },

  // Parameter: userId
  getProjectsByUserId(req, res) {
     Project.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: File
        },
      ],
      order: [[
        'createdAt','DESC'
      ]]
    })
      .then(projects => {
        res.status(200).send(projects);
      })
      .catch(err => res.status(400).send(err));
  },

  getProjectByIdAndUserId(req, res, next) {
     Project.findOne({
      where: { id: req.body.projectId, userId: req.decoded.id }
    })
      .then(project => {
        if (!project) {
          res.status(401).send({ err: "Unauthorized" });
        } else {
          next();
        }
      })
      .catch(err => res.status(500).send(err));
  },

  getAllProjects(req, res) {
    Project.findAll({
      order: [[
      'createdAt','DESC'
    ]]
   })
     .then(projects => {
       res.status(200).send(projects);
     })
     .catch(err => res.status(400).send(err));
 },

  update(req, res) {
     Project.findOne({
      where: { id: req.body.id }
    })
      .then(project => {
        project.update({
          name: req.body.name,
          description: req.body.description
        }).then(project => {
          res.status(200).send(project);
        })
        .catch(err => {
          res.status(400).send(err)
        });
      })
      .catch(err => {
        res.status(400).send(err)
    });
  },

  // Parameter: projectId, userId (grabbed from token)
  // Will recursively delete everything under folder
  delete(req, res) {
    let filePath = `projects/${req.decoded.id}/${req.body.projectId}`;
    Project.destroy({
      where: {
        id: req.body.projectId
      }
    })
      .then(() => {
        rimraf(filePath, err => {
          if (err) {
            res.status(500).send({ success: false, err });
          } else {
            res.status(202).send({ success: true });
          }
        });
      })
      .catch(err => {
        res.status(500).send({ success: false, err });
      });
  }
};
