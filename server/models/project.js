'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    favoritedBy: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []},
    votedBy: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []},
    votes: {type: DataTypes.INTEGER, defaultValue: 0},
    forkedFrom: {type: DataTypes.INTEGER, defaultValue: null}
  }, {});
  Project.associate = function(models) {
    Project.belongsTo(models.user);
    Project.hasMany(models.file);
    Project.hasMany(models.comment);
  };
  return Project;
};