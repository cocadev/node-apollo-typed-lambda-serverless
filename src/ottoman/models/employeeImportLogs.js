var db = require('../db.js');
var ottoman = require('ottoman');

var EmployeeImportLogsMdl = ottoman.model('EmployeeImportLog', {
    EmployerId: { type: 'string' },
    dateOfImport: 'Date',
    totalPrePay: {allowNull: false, type:'number',default:0},
    totalPpi: {allowNull: false, type:'number',default:0},
    totalSelfPay: {allowNull: false, type:'number',default:0},
    totalAmount:{allowNull: false, type:'number',default:0},
    paymentStatus:'string',
    s3File:'string',
    error_name:'string',
    error_position:'string',
    error_email:'string',
    error_phone:'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByEmployerId:{
        by:'EmployerId'
    }
  }
});

EmployeeImportLogsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

EmployeeImportLogsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - EmployeeImportLogsMdl: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = EmployeeImportLogsMdl;