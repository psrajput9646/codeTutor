const Student = require('../models/student');

module.exports = {
    create(firstName, lastName, userId){
        return Student.create({
            firstName,
            lastName,
            userId
        })
        .catch(err => err);
    },
    // uses userId foreign key
    getStudent(req, res) {
        let studentInfo = {};
        return Student.findOne({
            where: { userId: req.params.id }
        })
        .then(student => {
            studentInfo.firstName = student.firstName;
            studentInfo.lastName = student.lastName;
            student.getTutors().then(tutors => studentInfo.tutors = tutors);
            student.getProjects().then(projects => {
                studentInfo.projects = projects;
                studentInfo.projects.forEach(project => {
                    project.getFiles({attributes: ['name']}).then(files => {
                        project.files = files;
                    })
                });
            })
        })
        .then(res.status(200).send(studentInfo))
        .catch(err => res.status(400).send(err))
    }
}