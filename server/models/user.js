'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {type: Sequelize.STRING, unique: true }, 
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: {type: DataTypes.STRING, defaultValue: ""},
    points: {type: DataTypes.INTEGER, defaultValue: 0},
    favoritedProjects: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []}
  }, {});
  User.associate = function(models) {
    User.hasMany(models.project);
    User.hasMany(models.comment);
  };
  return User;
};