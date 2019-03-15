const Project = require("../models").Project;
const rimraf = require('rimraf');

module.exports = {
  // Requires name for project and student Id (grabbed from token)
  create(req, res) {
    return Project.create({
      name: req.body.name,
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
    let projectInfo = {};
    return Project.findOne({
      where: { id: req.params.id }
    })
      .then(project => {
        projectInfo.project = project;
        project.getFiles().then(files => {
          projectInfo.files = files;
        });
      })
      .then(res.status(200).send(projectInfo))
      .catch(err => res.status(400).send(err));
  },

  getProjectsByUserId(req, res) {
    return Project.findAll({
      where: { id: req.decoded.id }
    })
      .then(projects => {
        res.status(200).send(projects);
      })
      .catch(err => res.status(400).send(err));
  },

  getProjectByIdAndUserId(req, res, next) {
    return Project.findOne({
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
