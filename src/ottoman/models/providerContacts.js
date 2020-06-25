var db = require('../db.js');
var ottoman = require('ottoman');

var ProviderContactsMdl = ottoman.model('ProviderContacts', {
    ProviderId: { type: 'string' },
    name: 'string',
    position: 'string',
    phoneNumber: 'string',
    email: 'string',
    primaryParentId:'integer',
    secondaryParentId:'integer',
    type:'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByProviderId:{
        by:'ProviderId'
    }
  }
});

ProviderContactsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

ProviderContactsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - ProviderContactsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = ProviderContactsMdl;