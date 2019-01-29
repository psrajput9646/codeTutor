const Tutor = require('../models/tutor');

module.exports = {
    create(firstName, lastName, userId){
        return Tutor.create({
            firstName,
            lastName,
            userId
        })
        .catch(err => err);
    }
}