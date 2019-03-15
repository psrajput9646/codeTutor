const File = require('../models').File;
const fs = require('fs')

module.exports = {
    // Requires name for file, projectId and user Id (grabbed from token)
    create(req, res){
        return File.create({
            name: req.body.name,
            type: req.body.type,
            path: req.decoded.id + "/" + req.body.projectId + "/" + req.body.name + "." + req.body.type,
            projectId: req.body.projectId
        })
        .then(file => {
            fs.writeFile("projects/" + file.path, '', (err) => {
                if (err) {
                  throw new Error(err);
                } else {
                  res.status(200).send(file);
                }
              });
        })
        .catch(err => res.status(400).send(err));
    },

    // Parameter: fileName, fileType, projectId, content, userId (grabbed from token)
    save(req, res){
        let filePath = `projects/${req.decoded.id}/${req.body.projectId}/${req.body.fileName}.${req.body.type}`;
        fs.writeFile(filePath, req.body.content, (err) => {
            if (err) {
                res.status(500).send({ success: false, err: err})
            } else {
                res.status(202).send({success: true})
            }
        })
    },

    // Parameter: fileName, type, projectId, fileId, userId (grabbed from token)
    delete(req, res){
        let filePath = `projects/${req.decoded.id}/${req.body.projectId}/${req.body.fileName}.${req.body.type}`;
        File.destroy({
            where: {
                id: req.body.fileId
            }
        })
        .then(() => {
            fs.unlink(filePath, (err) => {
                if (err){
                    res.status(500).send({success: false, err})
                } else {
                    res.status(202).send({success: true})
                }
            })
        })
        .catch((err) => {
            res.status(500).send({success: false, err})
        })
    },

    // Parameter: id
    getFile(req, res) {
        return File.findOne({
            where: { id: req.params.id }
        })
        .catch(err => res.status(400).send(err))
    }
}