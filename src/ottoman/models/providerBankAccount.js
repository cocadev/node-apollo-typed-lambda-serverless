var db = require('../db.js');
var ottoman = require('ottoman');

var ProviderBankAccountMdl = ottoman.model('ProviderBankAccount', {
    ProviderId: { type: 'string' },
    nameOnAccount: 'string',
    routingNumber: 'string',
    accountNumber: 'string',
    accountType: 'string',
    address:['string'],
    stripeToken:'string',
    stripeSource:'string',
    depositAmount1:'number',
    depositAmount2:'number',
    accountVerified:'boolean',
    accountVerifyDate:'Date',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByProviderId:{
        by:'ProviderId'
    }
  }
});

ProviderBankAccountMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

ProviderBankAccountMdl.createAndSave = function (inputObject,  done) {
console.log("Model - ProviderBankAccountMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = ProviderBankAccountMdl;
