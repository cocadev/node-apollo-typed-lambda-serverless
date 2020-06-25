var db = require('../db.js');
var ottoman = require('ottoman');

var ClaimHistoriesMdl = ottoman.model('ClaimHistories', {
    ClaimId: { type: 'string' },
    coPay:{ type: 'number'},
    deductible: 'number',
    coInsurance: 'number',
    selfPay: 'number',
    outOfNetwork: 'number',
    notCovered:'number',
    noPriorAuthorization:'number',
    denied:'number',
    total:{ type:'number',default:0},
    charity:{ type:'number',default:0},
    writeOff:{ type:'number',default:0},
    rebate:'number',
    coupon:'number',
    other:'number',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByClaimId:{
        by:'ClaimId'
    }
  }
});

ClaimHistoriesMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

ClaimHistoriesMdl.createAndSave = function (inputObject,  done) {
console.log("Model - ClaimHistoriesMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = ClaimHistoriesMdl;