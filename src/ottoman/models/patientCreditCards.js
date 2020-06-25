var db = require('../db.js');
var ottoman = require('ottoman');

function PhoneValidator(val) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(val && !val.match(phoneno)) {
        throw new Error('Phone number is invalid.');
    }
}

function EmailValidator(mail)
{
    var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegEx.test(myForm.emailAddr.value))
    {
      throw new Error('You have entered an invalid email address!');
    }
}

var PatientCreditCardsMdl = ottoman.model('PatientCreditCards', {
    PatientId: { type: 'string' },
    cardType: 'string',
    nameOnCard: 'string',
    cardNumber: 'string',
    expiryMonth: 'string',
    expiryYear: 'string',
    cvvNumber: 'string',
    billingAddress: 'string',
    cardBrand: 'string',
    cardLevel: 'string',
    stripeToken:'string',
    stripeSource:'string',
    isPreferred: {type:'boolean', default:false},
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByPatientID:{
        by:'PatientId',
        type:'n1ql'
    }
  }
});

PatientCreditCardsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

PatientCreditCardsMdl.createAndSave = function (inputObject,  done) {
console.log("Model - PatientCreditCards: ")
console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = PatientCreditCardsMdl;
