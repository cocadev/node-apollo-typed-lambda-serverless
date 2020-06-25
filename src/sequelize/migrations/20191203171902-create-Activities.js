'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Activities', {
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
      ActivityTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'ActivityTypes'
          },
          key: 'id'
        }
      },
      activityDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      service: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      coInsurance: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      selfPay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      charity: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      buffer: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      prepay: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      ppi: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      fees: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      deductible: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      outOfPocketMax: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      total: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      installments: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paidAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      balanceAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      nextInstallmentAmount: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      isActive: {
        type: Sequelize.BOOLEAN, defaultValue: true
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
    return queryInterface.dropTable('Activities');
  }
};
