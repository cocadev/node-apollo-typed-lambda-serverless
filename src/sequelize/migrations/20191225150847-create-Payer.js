'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Payers', {
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
      institutionName: { allowNull: true, type: Sequelize.STRING(25) },
      address: { allowNull: true, type: Sequelize.STRING(25) },
      taxID: { allowNull: true, type: Sequelize.STRING(25) },
      institutionType: { allowNull: true, type: Sequelize.STRING(25) },
      licenseNumber: { allowNull: false, type: Sequelize.STRING(32) },
      ownership: { type: Sequelize.STRING(20) },
      phoneNumber: { type: Sequelize.STRING(20) },      
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
    return queryInterface.dropTable('Payers');
  }
};
