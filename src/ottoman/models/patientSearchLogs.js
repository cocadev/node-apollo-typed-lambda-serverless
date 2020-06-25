var db = require('../db.js');
var ottoman = require('ottoman');

var PatientSearchLogsMdl = ottoman.model('PatientSearchLogs', {
    PatientId: { allowNull: false, type: 'string' },
    ProviderId: { allowNull: false, type: 'string' },
    isConcern: {type:'boolean', default:false},
    searchedOn: { allowNull: false, type: 'string' },
    location: { allowNull: false, type: 'string' },
    result: { allowNull: true, type: 'string' },
    resultDetails: { allowNull: true, type: 'string' },
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {

  }
});

PatientSearchLogsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

PatientSearchLogsMdl.createAndSave = function (inputObject,  done) {
    this.create(inputObject, done);
}

module.exports = PatientSearchLogsMdl;
