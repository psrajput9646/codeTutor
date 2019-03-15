const Project = require('../models').Project;
const mkdirp = require('mkdirp');

module.exports = {
    // Requires name for project and student Id (grabbed from token)
    create(req, res){
        return Project.create({
            name: req.body.name,
            userId: req.decoded.username
        })
        .then(req => {
            //Create user folder to store projects
            mkdirp('projects/'+req.body.username+'/'+req.body.name, function(err) {
                // path exists unless there was an error
            });
        })
        .then(project => res.status(200).send(project))
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
            })
        })
        .then(res.status(200).send(projectInfo))
        .catch(err => res.status(400).send(err))
    },

    getProjectsByUserId(req, res) {
        return Project.findAll({
            where: { id: req.decoded.id }
        })
        .then(projects => {
            res.status(200).send(projects)
        })
        .catch(err => res.status(400).send(err));
    },

    getProjectByIdAndUserId(req, res, next) {
        return Project.findOne({
            where: { id: req.body.projectId, userId: req.decoded.id }
        })
        .then(project => {
            if (!project){
                res.status(401).send({err: "Unauthorized"})
            } else {
                next();
            }
        })
        .catch(err => res.status(500).send(err))
    }
}