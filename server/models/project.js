'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.Student);
    Project.hasMany(models.File);
  };
  return Project;
};