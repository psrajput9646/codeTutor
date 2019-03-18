const Comment = require('../models').comment;

module.exports = {
    // Requires content for comment, projectId and user Id (grabbed from token)
    create(req, res){
        return Comment.create({
            name: req.body.content,
            votes: 0,
            userId: req.decoded.id,
            projectId: req.body.projectId,
            favorited: false
        })
        .then(comment => res.status(200).send(comment))
        .catch(err => res.status(400).send(err));
    },
    // Parameter: project id
    getComments(req, res) {
        return Comment.findAll({
            where: { projectId: req.params.projectId }
        })
        .then(comments => res.status(200).send(comments))
        .catch(err => res.status(400).send(err))
    },
    // requires commentId
    vote(req, res){
        return Comment.findOne({
            where: { id: req.params.id }
        })
        .then(comment => {
            if(comment.votedBy.contains(req.decoded.id)){
                let index = comment.votedBy.indexOf(req.decoded.id);
                comment.votedBy.splice(index, 1);
                comment.update({
                    votes: comment.votes--,
                    votedBy: comment.votedBy
                })
                .then(() => {
                    res.status(202).send()
                })
                .catch((err) => res.status(500).send(err))
            } else {
                comment.votedBy.push(req.decoded.id);
                comment.update({
                    votes: comment.votes++,
                    votedBy: comment.votedBy
                })
                .then(() => res.status(202).send())
                .catch((err) => res.status(500).send(err))
            }
        })
    }
}