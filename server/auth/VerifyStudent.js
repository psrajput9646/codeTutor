// To make sure the student is the right student

const verifyStudent = (req, res, next) => {
    if (req.user != req.params.id && !req.tutor){
        return res.status(403).send({
            auth: false,
            message: 'Not authorized to view this content'
        })
    } else {
        next();
    }
}

module.exports = verifyStudent;