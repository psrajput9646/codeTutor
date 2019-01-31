// To make sure the student is the right student

const verifyStudent = (req, res, next) => {
    if (req.decoded.id != req.params.id && !req.decoded.isTutor){
        return res.status(403).send({
            auth: false,
            message: 'Not authorized to view this content'
        })
    } else {
        next();
    }
}

module.exports = verifyStudent;