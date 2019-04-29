const Project = require("../models").project;
const File = require("../models").file;
const User = require("../models").user;
const rimraf = require("rimraf");
const mkdirp = require("mkdirp");
const ncp = require("ncp").ncp;

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
        res.status(200).send(project);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },

  // Parameter: userId
  getProjectsByUserId(req, res) {
    Project.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: File
        }
      ],
      order: [["createdAt", "DESC"]]
    })
      .then(projects => {
        res.status(200).send(projects);
      })
      .catch(err => res.status(400).send(err));
  },

  getAllFavorited(req, res) {
    Project.findAll({
      where: { id: { in: req.body.favoritedProjects }}
    })
      .then(projects => {
        console.log("projy: ", projects)
        res.status(200).send(projects);
      })
      .catch(err => res.status(400).send(err));
  },

  // Requires Id of Project
  favorite(req, res) {
    Project.findOne({
      include: [
        {
          model: User
        }
      ],
      where: { id: req.params.id }
    })
      .then(project => {
        if (project.favoritedBy.includes(req.decoded.id)) {
          let index = project.favoritedBy.indexOf(req.decoded.id);
          project.favoritedBy.splice(index, 1);
          project.votes -= 10;
          project.user.points -= 10;
        } else {
          project.votes += 10;
          project.user.points += 10;
          project.favoritedBy.push(req.decoded.id);
        }

        return Promise.all([
          project.update({
            votes: project.votes,
            favoritedBy: project.favoritedBy
          }),
          project.user.update({
            points: project.user.points
          })
        ]);
      })
      .then(values => {
        res.status(200).send(values);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  // Requires Id of Project
  vote(req, res) {
    Project.findOne({
      include: [
        {
          model: User
        }
      ],
      where: { id: req.params.id }
    })
      .then(project => {
        if (project.votedBy.includes(req.decoded.id)) {
          let index = project.votedBy.indexOf(req.decoded.id);
          project.votedBy.splice(index, 1);
          project.votes--;
          project.user.points++;
        } else {
          project.votes++;
          project.user.points++;
          project.votedBy.push(req.decoded.id);
        }

        return Promise.all([
          project.update({
            votes: project.votes,
            votedBy: project.votedBy
          }),
          project.user.update({
            points: project.user.points
          })
        ]);
      })
      .then(values => {
        res.status(200).send(values);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  fork(req, res) {
    Project.findOne({
      include: [
        {
          model: File
        }
      ],
      where: { id: req.params.id }
    }).then(project => {
      Project.create({
        name: project.name,
        description: "Fork of " + project.name,
        userId: req.decoded.id
      }).then(newProject => {
        let newFiles = [];
        let basePath = "projects/" + req.decoded.id + "/" + newProject.id + "/";
        project.files.forEach(file => {
          newFiles.push(
            File.create({
              name: file.name,
              type: file.type,
              path: basePath + file.name + file.type,
              projectId: newProject.id
            })
          );
        });
        Promise.all(newFiles).then(values => {
          ncp(
            "projects/" + project.userId + "/" + project.id,
            basePath,
            err => {}
          );
        });
      });
    });
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
      order: [["createdAt", "DESC"]]
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
        project
          .update({
            name: req.body.name,
            description: req.body.description
          })
          .then(project => {
            res.status(200).send(project);
          })
          .catch(err => {
            res.status(400).send(err);
          });
      })
      .catch(err => {
        res.status(400).send(err);
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
