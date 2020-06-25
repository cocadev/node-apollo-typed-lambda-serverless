'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ActivityTypes', [
      { title : 'Buffer', createdAt : new Date(), updatedAt : new Date() },
      { title : 'SignUp', createdAt : new Date(), updatedAt : new Date() },
      { title : 'PPI', createdAt : new Date(), updatedAt : new Date() },
      { title : 'PrePay', createdAt : new Date(), updatedAt : new Date() },
      { title : 'Interest', createdAt : new Date(), updatedAt : new Date()},
      { title : 'Late Fees', createdAt : new Date(), updatedAt : new Date() },
      { title : 'Final Claim', createdAt : new Date(), updatedAt : new Date() },
      { title : 'Estimated Claim', createdAt : new Date(), updatedAt : new Date() }      
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ActivityTypes', [{}]);
  }
};
