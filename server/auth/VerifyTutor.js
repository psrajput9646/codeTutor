// To make sure the tutor is the right tutor

const verifyTutor = (req, res, next) => {
    if (req.decoded.id != req.params.id){
        return res.status(403).send({
            auth: false,
            message: 'Not authorized to view this content'
        })
    } else {
        next();
    }
}

module.exports = verifyTutor;