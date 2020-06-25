var db = require('../db.js');
var ottoman = require('ottoman');

// function PhoneValidator(val) {
//     var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//     if(val && !val.match(phoneno)) {
//         throw new Error('Phone number is invalid.');
//     }
// }
//
// function EmailValidator(mail)
// {
//     var emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (!emailRegEx.test(mail.value))
//     {
//       throw new Error('You have entered an invalid email address!');
//     }
// }

var PatientInsurancesMdl = ottoman.model('PatientInsurances', {
    PatientId: { type: 'string' },
    planName: 'string',
    planIssuer: 'string',
    planEffectiveDate: 'string',
    nameOnCard: 'string',
    memberId: 'string',
    groupPlanId: 'string',
    planAddress: 'string',
    csNo: 'string',
    providerSupportPhoneNumber: 'string',
    patientSupportPhoneNumber: 'string',
    areYouPrimary: {type:'boolean', default:false},
    // emailPrimary: {type:'string',validator: EmailValidator},
    emailPrimary: {type:'string'},
    isVerifiedByPrimary: {type:'boolean', default:true},
    isFinancialResponsible: {type:'boolean', default:false},
    financialResponsibleName: 'string',
    financialResponsibleRelation: 'string',
    financialResponsibleAddress: 'string',
    cardFrontImage: 'string',
    cardBackImage: 'string',
    insuranceType:  'string', //ENUM('Medical’, ‘Dental’, ‘Vision’), default: 'Default'
    isOutOfPocketMaxInNetWorkBenefits: {type:'boolean', default:false},
    individualDedPktMaxInNetBenefits: 'number',
    individualOutOfPktMaxInNetBenefits: 'number',
    familyDedPktMaxInNetBenefits: 'number',
    familyOutOfPktMax: 'number',
    isOutOfNetworkBenefits: {type:'boolean', default:false},
    individualDedOutOfNetBenefits: 'number',
    individualOutOfPktMaxOfNetBenefits: 'number',
    familyDedOutOfNetBenefits: 'number',
    familyOutOfPocketMax: 'number',
    finalDedutible: 'number',
    prePay: 'number',
    ppi: 'number',
    buffer: 'number',
    totalToPay: 'number',
    createdAt: { allowNull: false, type: 'Date', default:new Date() },
    updatedAt: { allowNull: false, type: 'Date' }
  },{
  index: {

  }
});

PatientInsurancesMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

PatientInsurancesMdl.createAndSave = function (inputObject,  done) {
    this.create(inputObject, done);
}

module.exports = PatientInsurancesMdl;
