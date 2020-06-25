var db = require('../db.js');
var ottoman = require('ottoman');

var EmployerContactsMdl = ottoman.model('EmployerContact', {
    EmployerId: { type: 'string' },
    name: 'string',
    position: 'string',
    phoneNumber: 'string',
    email: 'string',
    primaryParentId: 'integer',
    secondaryParentId: 'integer',
    type:'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByEmployerId:{
        by:'EmployerId'
    }
  }
});

EmployerContactsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

EmployerContactsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - EmployerContacts: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = EmployerContactsMdl;
