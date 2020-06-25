'use strict';
module.exports = function(sequelize, DataTypes) {
  var Employer = sequelize.define('Employer', {
    PatientId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Patients'
          },
          key: 'id'
        }
    },
    institutionName: { allowNull: true, type: DataTypes.STRING(25) },
    address: { allowNull: true, type: DataTypes.STRING(25) },
    taxID: { allowNull: true, type: DataTypes.STRING(25) },
    npi: { allowNull: true, type: DataTypes.STRING(25) },
    phoneNumber: { allowNull: false, type: DataTypes.STRING(32) }
  }, {
    classMethods: {
      associate: function(models) {
        Employer.belongsTo(models.Patient);
      }
    }
  });
  return Employer;
};
