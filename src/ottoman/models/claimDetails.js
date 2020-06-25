var db = require('../db.js');
var ottoman = require('ottoman');

var ClaimDetailsMdl = ottoman.model('ClaimDetail', {
    ClaimId: { type: 'string' },
    serviceLocationAddress: 'string',
    providerGenratedId: 'string',
    insuranceGenratedId: 'string',
    dateOfAppointment:'Date',
    dateOfServiceFrom: 'Date',
    dateOfServiceTo:'Date',
    outOfNetwork:'number',
    notCovered:'number',
    noPriorAuthorization:'number',
    denied:'number',
    charity:'number',
    writeOff:'number',
    rebate:'number',
    coupon:'number',
    other:'number',
    unbundlling:'string',
    duplicate:'string',
    billed:'string',
    approved:'string',
    contractAssignment:'string',
    claimDescription:'string',
    selfNote:'string',
    payerNote:'string',
    providerBillingNote:'string',
    attachments: [{fileName: 'string', fileUrl: 'string'}]
  },{
  index: {
    findByClaimId:{
        by:'ClaimId'
    }
  }
});

ClaimDetailsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - ClaimDetailsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = ClaimDetailsMdl;