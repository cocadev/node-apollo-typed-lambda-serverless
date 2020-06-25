'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('TempRegistrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      suffix: {
        allowNull: true,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      mobileNumber: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      inviteCode: {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      referralCode: {
        allowNull: true,
        type: Sequelize.STRING(10)
      },
      otp: {
        type: Sequelize.INTEGER
      },
      otpVerified: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      otpTTL: {
        allowNull: true,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('TempRegistrations');
  }
};
