const File = require('../models/file');

module.exports = {
    // Requires name for project and student Id (grabbed from token)
    create(req, res){
        try {
            if(!req.decoded.student.projects.some(project => project.id === req.body.projectId))
                throw "Not allowed";
        } catch (error) {
            res.status(401).send({err: "Not allowed to create a file in this project"});
        }
        return File.create({
            name: req.body.name,
            type: req.body.type,
            projectId: req.body.projectId
        })
        .then(file => res.status(200).send(file))
        .catch(err => res.status(400).send(err));
    },
    // Parameter: id
    getFile(req, res) {
        return File.findOne({
            where: { id: req.params.id }
        })
        .catch(err => res.status(400).send(err))
    }
}