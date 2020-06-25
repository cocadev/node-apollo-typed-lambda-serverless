'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('MonthlyStatements', {
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
      statementDate: { allowNull: false, type: Sequelize.DATEONLY },
      dueDate: { allowNull: false, type: Sequelize.DATEONLY },
      totalAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      paidAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      balanceAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      paymentDate: { type: Sequelize.DATEONLY, allowNull: true },
      paymentAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      prePay_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      prePay_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      prePay_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      prePay_available: { type: Sequelize.FLOAT, defaultValue: 0 },
      ppi_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      ppi_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      ppi_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      ppi_available: { type: Sequelize.FLOAT, defaultValue: 0 },
      buffer_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      buffer_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      buffer_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      buffer_available: { type: Sequelize.FLOAT, defaultValue: 0 },
      lateFees_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      lateFees_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      lateFees_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      lateFees_available: { type: Sequelize.FLOAT, defaultValue: 0 },
      intrest_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      intrest_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      intrest_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      intrest_available: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim_available: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim90days_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim90days_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim90days_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      finalClaim90days_available: { type: Sequelize.FLOAT, defaultValue: 0 },
      estimatedClaim_this_statment: { type: Sequelize.FLOAT, defaultValue: 0 },
      estimatedClaim_paid: { type: Sequelize.FLOAT, defaultValue: 0 },
      estimatedClaim_due: { type: Sequelize.FLOAT, defaultValue: 0 },
      estimatedClaim_available: { type: Sequelize.FLOAT, defaultValue: 0 },
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
    return queryInterface.dropTable('MonthlyStatements');
  }
};
