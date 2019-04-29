'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    content: DataTypes.TEXT,
    votes: {type: DataTypes.INTEGER, defaultValue: 0},
    favorited: {type: DataTypes.BOOLEAN, defaultValue: false},
    votedBy: {type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []}
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.user);
    Comment.belongsTo(models.project);
  };
  return Comment;
};