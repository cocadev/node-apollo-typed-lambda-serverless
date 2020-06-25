'use strict';
module.exports = function(sequelize, DataTypes) {
  var Provider = sequelize.define('Provider', {
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
    businessAddressForNotices: { allowNull: true, type: DataTypes.STRING(25) },
    taxId: { allowNull: true, type: DataTypes.STRING(25) },
    npi: { allowNull: true, type: DataTypes.STRING(25) },
    institutionType: { allowNull: false, type: DataTypes.STRING(32) },
    ownerShip: { type: DataTypes.STRING(20) },
    phoneNumber: { type: DataTypes.STRING(20) },
    paymentFrom: { type: DataTypes.ENUM('BankAccount', 'CreditCard'), defaultValue: 'BankAccount' }
  }, {
    classMethods: {
      associate: function(models) {
        Provider.belongsTo(models.Patient);
      }
    }
  });
  return Provider;
};
