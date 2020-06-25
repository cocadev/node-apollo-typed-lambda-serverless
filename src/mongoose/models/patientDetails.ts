import {Document, Schema, Model, model} from 'mongoose'
import {IPatientDetail} from '../interfaces/patientDetail'

export interface IPatientDetailModel extends IPatientDetail, Document {}

export var _PatientDetailSchema = new Schema(
  {
    PatientId: {type: String, required: true},
    address: {type: String},
    mobileNumber: {type: String},
    email: {type: String},
    dateOfBirth: {type: Date, format: 'YYYY-MM-DD HH:mm:ss'},
    ssn: {type: String},
    gender: {type: String},
    otp: {type: Number},
    otpVerified: {type: Boolean, default: false},
    otpTTL: {type: Date, format: 'YYYY-MM-DD HH:mm:ss'},
    emailCode: {type: String},
    isEmailVerified: {type: Boolean, default: false},
    emailCodeTTL: {type: Date, format: 'YYYY-MM-DD HH:mm:ss'},
    inviteCode: {type: String},
    referralCode: {type: String},
    securityQuestion1: {type: String},
    securityQuestion1_answer: {type: String},
    securityQuestion2: {type: String},
    securityQuestion2_answer: {type: String},
    securityQuestion3: {type: String},
    securityQuestion3_answer: {type: String},
    secretQuestion: {type: String},
    secretQuestion_answer: {type: String},
    isTcAccepted: {type: Boolean, default: false},
    isHIPPAAPrivacyAccepted: {type: Boolean, default: false},
    isPermissionToShare: {type: Boolean, default: false},
    maritalStatus: {type: String},
    occupation: {type: String},
    designation: {type: String},
    employersName: {type: String},
    employersAddress: {type: String},
    employeeNumber: {type: String},
    annualIncome: {type: Number},
    yearsWorkedInCurrentCompany: {type: String},
    monthsWorkedInCurrentCompany: {type: String},
    govtIdPic: {type: String},
    isRequestIdUpdate: {type: Boolean, default: false},
    isIdNotMatch: {type: Boolean, default: false},
    isPrePayPaymentSplit: {type: Boolean, default: false},
    prePay: {type: Number, default: 0},
    prePayToBePaid: {type: Number, default: 0},
    prePayInstallments: {type: Number, default: 0},
    prePay1stInstallment: {type: Number, default: 0},

    isPpiPaymentSplit: {type: Boolean, default: false},
    ppi: {type: Number, default: 0},
    ppiToBePaid: {type: Number, default: 0},
    ppiInstallments: {type: Number, default: 0},
    ppi1stInstallment: {type: Number, default: 0},

    assuredPaymentsToProviders: {type: Number},
    stripeKey: {type: String}
  },
  {timestamps: true}
)

export const patientDetailModel: Model<IPatientDetailModel> = model<IPatientDetailModel>(
  'PatientDetail',
  _PatientDetailSchema
)
