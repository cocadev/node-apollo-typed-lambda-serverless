'use strict';
module.exports = function(sequelize, DataTypes) {
  var MonthlyStatementDetail = sequelize.define('MonthlyStatementDetail', {

    PatientId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'Patients' }, key: 'id' }
    },
    MonthlyStatementId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'MonthlyStatements' }, key: 'id' }
    },
    ActivityId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'Activities' }, key: 'id' }
    },
    ActivityInstallmentId: {
      type: DataTypes.INTEGER,
      references: { model: { tableName: 'ActivityInstallments' }, key: 'id' }
    },
    ClaimId: {
      type: DataTypes.INTEGER,
      defaultValue: -1
    },
    totalAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    previousPaidAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    installmentAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    paidAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
    balanceAmount: { type: DataTypes.FLOAT, defaultValue: 0 },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return MonthlyStatementDetail;
};
