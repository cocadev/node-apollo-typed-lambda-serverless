'use strict';
module.exports = function(sequelize, DataTypes) {
  var viewActivities = sequelize.define('viewActivities', {
    title: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return viewActivities;
};