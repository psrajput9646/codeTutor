const File = require('../models').file;
const fs = require('fs')
const mkdirp = require('mkdirp');

module.exports = {
    // Requires name for file, type, projectId and user Id (grabbed from token)
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

    // Parameter: (file)id, content, userId (grabbed from token)
    save(req, res){
        File.findOne({
            where: { id: req.params.id }
        })
        .then(file => {
            fs.writeFile(file.path, req.body.content, (err) => {
                if (err) {
                    res.status(500).send({ success: false, err: err})
                } else {
                    res.status(202).send({success: true})
                }
            })
        })
        .catch(err => {
            res.status(500).send({success: false, err: err})
        })

    },

    // Parameter: (file)id, userId (grabbed from token)
    delete(req, res){
        File.findOne({
            where: { id: req.params.id }
        })
        .then(file => {
            fs.unlink(file.path, (err) => {
                if (err){
                    res.status(500).send({success: false, err})
                } else {
                    file.destroy()
                    .then(()=>{
                        res.status(202).send({success: true})
                    })
                    .catch(err => res.status(500).send({success: false, err}))
                }
            })
        })
        .catch((err) => {
            res.status(500).send({success: false, err})
        })
    },

    // Parameter: id
    getFile(req, res) {
        File.findOne({
            where: { id: req.params.id }
        })
        .then(file => res.status(200).send(file))
        .catch(err => res.status(400).send(err))
    }
}