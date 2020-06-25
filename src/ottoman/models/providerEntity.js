var db = require('../db.js');
var ottoman = require('ottoman');

var ProviderEntityMdl = ottoman.model('ProviderEntities', {
    ProviderId: { type: 'string' },
    npi: 'string',
    name: 'string',
    type: 'string',
    email: 'string',
    primaryParentId:'integer',
    secondaryParentId:'integer',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByProviderId:{
      by:'ProviderId'
  }
  }
});

ProviderEntityMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

ProviderEntityMdl.createAndSave = function (inputObject,  done) {
console.log("Model - ProviderEntitiesMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = ProviderEntityMdl;