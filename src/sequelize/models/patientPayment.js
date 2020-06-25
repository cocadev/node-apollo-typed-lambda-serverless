'use strict';
module.exports = function(sequelize, DataTypes) {
  var PatientPayment = sequelize.define('PatientPayment', {
    PatientId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'Patients' }, key: 'id' }
    },
    MonthlyStatementId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'MonthlyStatements' }, key: 'id' }
    },
    PatientCreditCardId: {
      allowNull: true,
      type: DataTypes.STRING(100)
    },
    paymentDate: { allowNull: true, type: DataTypes.DATEONLY },
    scheduleDate: { allowNull: false, type: DataTypes.DATEONLY },
    paymentAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    paymentStatus: { type: DataTypes.ENUM('Scheduled', 'Paid', 'Declined'), defaultValue: 'Scheduled'},
    confirmationCode: { type: DataTypes.STRING(255) },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PatientPayment;
};
