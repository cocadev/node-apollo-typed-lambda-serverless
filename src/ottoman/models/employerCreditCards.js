var db = require('../db.js');
var ottoman = require('ottoman');

var EmployerCreditCardsMdl = ottoman.model('EmployerCreditCard', {
    EmployerId: { type: 'string' },
    cardType: 'string',
    nameOnCard: 'string',
    cardNumber: 'string',
    expiryMonth: 'string',
    expiryYear: 'string',
    cvvNumber:'string',
    billingAddress:'string',
    cardBrand:'string',
    cardLevel:'string',
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

EmployerCreditCardsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

EmployerCreditCardsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - EmployerCreditCardsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = EmployerCreditCardsMdl;
