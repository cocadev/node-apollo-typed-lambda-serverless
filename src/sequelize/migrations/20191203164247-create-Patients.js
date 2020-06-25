'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ParentId: {
        allowNull: false,
        defaultValue: -1,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING(25)
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(25)
      },
      isProvider: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      isEmployer: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      suffix: {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      type: {
        type: Sequelize.ENUM('Primary', 'MinorDependent', 'AdultDependent'),
        defaultValue: 'Primary'
      },
      patientDetailId: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      lastScreen: {
        allowNull: true,
        type: Sequelize.STRING(100)
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
    return queryInterface.dropTable('Patients');
  }
};
