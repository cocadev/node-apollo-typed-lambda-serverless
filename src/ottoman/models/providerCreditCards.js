var db = require('../db.js');
var ottoman = require('ottoman');

var ProviderCreditCardsMdl = ottoman.model('ProviderCreditCards', {
    // id:{type:'integer',auto:'uuid', readonly:true },
    ProviderId: { type: 'string' },
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
    findByProviderId:{
        by:'ProviderId'
    }
  }
});

ProviderCreditCardsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

ProviderCreditCardsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - ProviderCreditCardsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = ProviderCreditCardsMdl;
