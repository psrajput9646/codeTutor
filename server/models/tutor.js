'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tutor = sequelize.define('Tutor', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  Tutor.associate = function(models) {
    Tutor.belongsTo(models.User)
    Tutor.belongsToMany(models.Student);
  };
  return Tutor;
};