'use strict';
module.exports = function(sequelize, DataTypes) {
  var Payer = sequelize.define('Payer', {
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
    institutionType: { allowNull: true, type: DataTypes.STRING(25) },
    licenseNumber: { allowNull: false, type: DataTypes.STRING(32) },
    ownership: { type: DataTypes.STRING(20) },
    phoneNumber: { type: DataTypes.STRING(20) }
    },{
    classMethods: {
      associate: function(models) {
        Payer.belongsTo(models.Patient);
      }
    }
  });
  return Payer;
};
    // states: {
    //     type:   Sequelize.ENUM,
    //     values: ['active', 'pending', 'deleted']
    //   }
