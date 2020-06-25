'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('PatientPayments', {
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
      PatientCreditCardId: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      paymentDate: { allowNull: true, type: Sequelize.DATEONLY },
      scheduleDate: { allowNull: false, type: Sequelize.DATEONLY },
      paymentAmount: { type: Sequelize.FLOAT, defaultValue: 0 },
      paymentStatus: { type: Sequelize.ENUM('Scheduled', 'Paid', 'Declined'), defaultValue: 'Scheduled'},
      confirmationCode: { type: Sequelize.STRING(255) },

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
    return queryInterface.dropTable('PatientPayments');
  }
};
