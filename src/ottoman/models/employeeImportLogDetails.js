var db = require('../db.js');
var ottoman = require('ottoman');

var EmployeeImportLogDetailsMdl = ottoman.model('EmployeeImportLogDetail', {
    EmployerId: { type: 'string' },
    EmployeeImportLogId:{ type: 'integer'},
    title: 'string',
    firstName: 'string',
    middleName: 'string',
    lastName: 'string',
    suffix:'string',
    dateOfBirth:'Date',
    ssn:'string',
    prePay:{ type:'number',default:0},
    ppi:{ type:'number',default:0},
    selfPay:{ type:'number',default:0},
    stopDate:'Date',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByEmployerId:{
        by:'EmployerId'
    }
  }
});

EmployeeImportLogDetailsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

EmployeeImportLogDetailsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - EmployeeImportLogDetailsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = EmployeeImportLogDetailsMdl;