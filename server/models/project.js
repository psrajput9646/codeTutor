'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.user);
    Project.hasMany(models.file);
    Project.hasMany(models.comment);
  };
  return Project;
};