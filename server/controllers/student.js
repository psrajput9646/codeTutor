const Student = require('../models/student');

module.exports = {
    create(firstName, lastName, userId){
        return Student.create({
            firstName,
            lastName,
            userId
        })
        .catch(err => err);
    }
}