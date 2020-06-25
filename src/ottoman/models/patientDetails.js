var db = require('../db.js');
var ottoman = require('ottoman');

// function PhoneValidator(val) {
//     var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     if(val && !val.match(phoneno)) {
//         throw new Error('Phone number is invalid.');
//     }
// }

function EmailValidator(mail)
{
    // var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (!emailRegEx.test(mail.value))
    // {
    //   throw new Error('You have entered an invalid email address!');
    // }
}

var PatientDetailsMdl = ottoman.model('PatientDetails', {
    PatientId: { type: 'string' },
    address: 'string',
    mobileNumber: 'string',
    email: {type:'string',validator: EmailValidator},
    dateOfBirth: 'string',
    ssn: 'string',
    gender: 'string',
    otp: 'integer',
    otpVerified: {type:'boolean', default:false},
    otpTTL: 'Date',
    emailCode: 'string',
    isEmailVerified: {type:'boolean', default:false},
    emailCodeTTL: 'Date',
    inviteCode: 'string',
    referralCode: 'string',
    securityQuestion1: 'string',
    securityQuestion1_answer: 'string',
    securityQuestion2: 'string',
    securityQuestion2_answer: 'string',
    securityQuestion3: 'string',
    securityQuestion3_answer: 'string',
    secretQuestion: 'string',
    secretQuestion_answer: 'string',
    isTcAccepted: {type:'boolean', default:false},
    isHIPPAAPrivacyAccepted: {type:'boolean', default:false},
    isPermissionToShare: {type:'boolean', default:false},
    maritalStatus: 'string',
    occupation: 'string',
    designation: 'string',
    employersName: 'string',
    employersAddress: 'string',
    employeeNumber: 'string',
    annualIncome: 'number',
    yearsWorkedInCurrentCompany: 'string',
    monthsWorkedInCurrentCompany: 'string',
    govtIdPic: 'string',
    isRequestIdUpdate: {type:'boolean', default:false},
    isIdNotMatch: {type:'boolean', default:false},
    prePay: 'number',
    prePayInstallment: 'number',
    prePayToBePaid: 'number',
    ppi: 'number',
    ppiInstallment: 'number',
    ppiToBePaid: 'number',
    isPpiPaymentSplit: {type:'boolean', default:false},
    isPrePayPaymentSplit: {type:'boolean', default:false},
    prePay1stInstallment: 'number',
    ppi1stInstallment: 'number',
    ppiInstallments: 'integer',
    prePayInstallments: 'integer',
    assuredPaymentsToProviders: 'number',
    stripeKey: 'string',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {
    findByPatientID:{
      by:'PatientId',
      type:'refdoc'
    },
    findByEmail: {
      by: 'email',
      type: 'refdoc'
    },
    findByMobile: {
      by: 'mobileNumber',
      type: 'refdoc'
    },
    findBySsn: {
      by: 'ssn',
      type: 'refdoc'
    }
  }
});


PatientDetailsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});


PatientDetailsMdl.createAndSave = function (inputObject, done) {
// console.log("Model - PatientDetails: ")
// console.dir(inputObject)
    this.create(inputObject, done);
}

module.exports = PatientDetailsMdl;
