var db = require('../db.js');
var ottoman = require('ottoman');

var PayerContactMdl = ottoman.model('PayerContact', {
    PayerId: { type: 'string' },
    name: 'string',
    position: 'string',
    phoneNumber: 'string',
    email: 'string',
    isPrimary: 'boolean',
    isSecondary: 'boolean',
    type:'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByPayerId:{
        by:'PayerId'
    }
  }
});

PayerContactMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

PayerContactMdl.createAndSave = function (inputObject,  done) {
console.log("Model - PayerContactMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = PayerContactMdl;
