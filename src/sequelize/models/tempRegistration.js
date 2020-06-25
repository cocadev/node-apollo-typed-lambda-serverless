'use strict';
import * as moment from 'moment';

module.exports = function(sequelize, DataTypes) {
  var TempRegistration = sequelize.define('TempRegistration', {
    name: { type: DataTypes.STRING, allowNull: false },
    suffix: { type: DataTypes.STRING, allowNull: true },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    mobileNumber: { type: DataTypes.STRING, allowNull: false },
    inviteCode: { type: DataTypes.STRING, allowNull: true },
    referralCode: { type: DataTypes.STRING, allowNull: true },
    otp: DataTypes.INTEGER,
    otpVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    otpTTL: { type: DataTypes.DATE, allowNull: false, get: function() {
       return moment(this.getDataValue('otpTTL')).format('YYYY-MM-DD HH:mm')
    } }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TempRegistration;
};
