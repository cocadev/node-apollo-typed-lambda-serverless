var db = require('../db.js');
var ottoman = require('ottoman');

var PatientAddressDetailsMdl = ottoman.model('PatientAddressDetails', {
    PatientId: { type: 'string' },
    address: 'string',
    year: 'string',
    month: 'string',
    homeStatus: 'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByPatientID:{
        by:'PatientId'
    }
  }
});

PatientAddressDetailsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

PatientAddressDetailsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - PatientAddressDetails: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = PatientAddressDetailsMdl;
