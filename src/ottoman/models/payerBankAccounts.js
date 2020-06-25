var db = require('../db.js');
var ottoman = require('ottoman');

var PayerBankAccountMdl = ottoman.model('PayerBankAccount', {
    PayerId: { type: 'string' },
    nameOfAccount: 'string',
    position: 'string',
    routingNumber: 'string',
    accountNumber: 'string',
    accountType: 'string',
    address: 'string',
    stripeKey:'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByPayerId:{
        by:'PayerId'
    }
  }
});

PayerBankAccountMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

PayerBankAccountMdl.createAndSave = function (inputObject,  done) {
console.log("Model - PayerBankAccountMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = PayerBankAccountMdl;
