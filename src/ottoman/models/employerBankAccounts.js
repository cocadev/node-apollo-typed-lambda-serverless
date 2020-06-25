var db = require('../db.js');
var ottoman = require('ottoman');

var EmployerBankAccountsMdl = ottoman.model('EmployerBankAccount', {
    EmployerId: { type: 'string' },
    nameOfAccount: 'string',
    routingNumber: 'string',
    accountNumber: 'string',
    accountType: 'string',
    address:'string',
    stripeToken:'string',
    stripeSource:'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByEmployerId:{
        by:'EmployerId'
    }
  }
});

EmployerBankAccountsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

EmployerBankAccountsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - EmployerBankAccountsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = EmployerBankAccountsMdl;
