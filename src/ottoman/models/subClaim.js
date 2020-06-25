var db = require('../db.js');
var ottoman = require('ottoman');

var SubClaimsMdl = ottoman.model('SubClaim', {
    ClaimId: { type: 'string' },
    BillingEntityId:{ type: 'integer'},
    ProviderEntityId: 'integer',
    dateOfServiceFrom: 'integer',
    dateOfServiceTo: 'Date',
    poemDiscount: 'boolean',
    total:'number',
    noPriorAuthorization:'string',
    notCovered:'string',
    denied:{ type:'string'},
    outOfNetwork:{ type:'string'},
    unbundlling:{ type:'string'},
    duplicate:'string',
    billed:'string',
    approved:'string',
    contractAdjustment:'string',
    paidAmount:'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByClaimId:{
        by:'ClaimId'
    }
  }
});

SubClaimsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

SubClaimsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - SubClaimsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = SubClaimsMdl;