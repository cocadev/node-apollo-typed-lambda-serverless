'use strict';
module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define('Patient', {
    ParentId: { allowNull: false, defaultValue: -1, type: DataTypes.INTEGER },
    username: { allowNull: true, type: DataTypes.STRING(25) },
    password: { allowNull: true, type: DataTypes.STRING(25) },
    isProvider: { defaultValue: false, type: DataTypes.BOOLEAN },
    isEmployer: { defaultValue: false, type: DataTypes.BOOLEAN },
    name: { allowNull: false, type: DataTypes.STRING(32) },
    suffix: { type: DataTypes.STRING(10) },
    type: { type: DataTypes.ENUM('Primary', 'MinorDependent', 'AdultDependent'), defaultValue: 'Primary' },
    patientDetailId: { type: DataTypes.STRING(100), allowNull: true },
    lastScreen: { type: DataTypes.STRING(100), allowNull: true }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Patient.hasMany(models.Claim, { onDelete: 'cascade', hooks: true });
        // Patient.hasMany(models.ClaimHistory, { onDelete: 'cascade', hooks: true });
        Patient.hasMany(models.ActivityInstallment, { onDelete: 'cascade', hooks: true });
        // Patient.hasMany(models.PatientAddressDetail, { onDelete: 'cascade', hooks: true });
        // Patient.hasMany(models.PatientCreditCard, { onDelete: 'cascade', hooks: true });
        // Patient.hasMany(models.PatientPayment, { onDelete: 'cascade', hooks: true });
      }
    }
  });
  return Patient;
};
