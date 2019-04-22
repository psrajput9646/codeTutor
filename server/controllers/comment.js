const User = require('../models').user;
const Comment = require('../models').comment;

module.exports = {
    // Requires content for comment, projectId and user Id (grabbed from token)
    create(req, res){
        Comment.create({
            content: req.body.content,
            votes: 0,
            votedBy: [],
            userId: req.decoded.id,
            projectId: req.body.projectId,
            favorited: false
        })
        .then(comment => res.status(200).send(comment))
        .catch(err => res.status(400).send(err));
    },

    // Parameter: project id
    getComments(req, res) {
        Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            where: { projectId: req.params.projectId },
            order: [
                ['createdAt','DESC']
            ],
        })
        .then(comments => {
            res.status(200).send(comments)})
        .catch(err => {console.log(err);res.status(400).send(err)})
    },

    // requires commentId
    vote(req, res){
        Comment.findOne({
            include: [
                {
                    model: User,
                    attributes: ["id", "points",'username']
                }
            ],
            where: { id: req.params.commentId }
        })
        .then(comment => {
            console.log(comment.votedBy);
            if(comment.votedBy.includes(req.decoded.id)){
                let index = comment.votedBy.indexOf(req.decoded.id);
                comment.votedBy.splice(index, 1);
                comment.votes--;
                comment.user.points--;
            } else {
                comment.votes++;
                comment.user.points++;
                comment.votedBy.push(req.decoded.id);
            }
            return Promise.all([
                comment.update({
                    votes: comment.votes,
                    votedBy: comment.votedBy
                }),
                comment.user.update({
                    points: comment.user.points
                })
            ])    
        })
        .then((values)=> {
            res.status(200).send(values)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err)
        });
    }
}