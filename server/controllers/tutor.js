const Tutor = require('../models/tutor');

module.exports = {
    create(firstName, lastName, userId){
        return Tutor.create({
            firstName,
            lastName,
            userId
        })
        .catch(err => err);
    },
    // uses userId foreign key
    getTutor(req, res) {
        let tutorInfo = {};
        return Tutor.findOne({
            where: { userId: req.params.id }
        })
        .then(tutor => {
            tutorInfo.firstName = tutor.firstName;
            tutorInfo.lastName = tutor.lastName;
            tutor.getStudents().then(students => {
                tutorInfo.students = students;
                tutorInfo.students.forEach(student => {
                    student.getProjects().then(projects => {
                        student.projects = projects;
                    })
                });
            })
        })
        .then(res.status(200).send(tutorInfo))
        .catch(err => res.status(400).send(err))
    }
}