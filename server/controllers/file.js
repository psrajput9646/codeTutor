const File = require('../models/file');

module.exports = {
    // Requires name for file, projectId and user Id (grabbed from token)
    create(req, res){
        return File.create({
            name: req.body.name,
            type: req.body.type,
            path: req.decoded.id + "/" + req.body.projectId + "/" + req.body.name + req.body.type,
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