'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('file', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    path: DataTypes.STRING
  }, {});
  File.associate = function(models) {
    File.belongsTo(models.project);
  };
  return File;
};