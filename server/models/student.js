'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    Student.belongsTo(models.User);
    Student.belongsToMany(models.Tutor);
    Student.hasMany(models.Project);
  };
  return Student;
};