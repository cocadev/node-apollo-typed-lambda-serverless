'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Patients'
          },
          key: 'id'
        }
      },

      institutionName: {
        type: Sequelize.STRING(75)
      },
      businessAddressForNotices: {
        type: Sequelize.STRING(75)
      },
      taxId: {
        type: Sequelize.STRING(75)
      },
      npi: {
        type: Sequelize.STRING(75)
      },
      institutionType: {
        type: Sequelize.STRING(75)
      },
      ownerShip: {
        type: Sequelize.STRING(75)
      },
      phoneNumber: {
        type: Sequelize.STRING(15)
      },
      paymentFrom: {
        type: Sequelize.ENUM('BankAccount', 'CreditCard'),
        defaultValue: 'BankAccount'
      },
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
    return queryInterface.dropTable('Providers');
  }
};
