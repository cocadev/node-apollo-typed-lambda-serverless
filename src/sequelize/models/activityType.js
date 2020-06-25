'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActivityType = sequelize.define('ActivityType', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ActivityType.hasMany(models.Activity, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return ActivityType;
};
