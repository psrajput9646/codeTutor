'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    votes: DataTypes.INTEGER,
    favorited: DataTypes.BOOLEAN,
    votedBy: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Project);
  };
  return Comment;
};