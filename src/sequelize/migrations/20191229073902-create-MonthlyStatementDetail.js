'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('MonthlyStatementDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Patients' }, key: 'id' }
      },
      MonthlyStatementId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'MonthlyStatements' }, key: 'id' }
      },
      ActivityId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'Activities' }, key: 'id' }
      },
      ActivityInstallmentId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: 'ActivityInstallments' }, key: 'id' }
      },
      ClaimId: {
        type: Sequelize.INTEGER,
        defaultValue: -1
      },
      totalAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      previousPaidAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      installmentAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      paidAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      balanceAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('MonthlyStatementDetails');
  }
};
