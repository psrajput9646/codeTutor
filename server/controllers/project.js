const Project = require('../models/project');

module.exports = {
    // Requires name for project and student Id (grabbed from token)
    create(req, res){
        return Project.create({
            name: req.body.name,
            studentId: req.decoded.student.id
        })
        .then(project => res.status(200).send(project))
        .catch(err => res.status(400).send(err));
    },
    // Parameter: id
    getProject(req, res) {
        let projectInfo = {};
        return Project.findOne({
            where: { id: req.params.id }
        })
        .then(project => {
            if (!req.decoded.isTutor){
                if(req.decoded.student.id != project.studentId)
                    return res.status(401).send({err: "Not authorized to view this content"});
            }
            projectInfo.project = project;
            project.getFiles().then(files => {
                projectInfo.files = files;
            })
        })
        .then(res.status(200).send(projectInfo))
        .catch(err => res.status(400).send(err))
    }
}