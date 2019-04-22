'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    favoritedBy: DataTypes.ARRAY(DataTypes.INTEGER),
    votedBy: DataTypes.ARRAY(DataTypes.INTEGER),
    votes: DataTypes.INTEGER,
    forkedFrom: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.user);
    Project.hasMany(models.file);
    Project.hasMany(models.comment);
  };
  return Project;
};