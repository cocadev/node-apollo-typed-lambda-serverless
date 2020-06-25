import {Document, Schema, Model, model} from 'mongoose'
import {IPatientInsurance} from '../interfaces/patientInsurance'

export interface IPatientInsuranceModel extends IPatientInsurance, Document {}

export var _PatientInsuranceSchema = new Schema(
  {
    PatientId: {type: String, required: true},
    planName: {type: String},
    planIssuer: {type: String},
    planEffectiveDate: {type: Date, format: 'YYYY-MM-DD HH:mm:ss'},
    nameOnCard: {type: String},
    memberId: {type: String},
    groupPlanId: {type: String},
    planAddress: {type: String},
    csNo: {type: String},
    providerSupportPhoneNumber: {type: String},
    patientSupportPhoneNumber: {type: String},
    areYouPrimary: {type: Boolean, default: false},
    // emailPrimary: {type:{type: String},validator: EmailValidator},
    emailPrimary: {type: String},
    isVerifiedByPrimary: {type: Boolean, default: true},
    isFinancialResponsible: {type: Boolean, default: false},
    financialResponsibleName: {type: String},
    financialResponsibleRelation: {type: String},
    financialResponsibleAddress: {type: String},
    cardFrontImage: {type: String},
    cardBackImage: {type: String},
    insuranceType: {type: String}, //ENUM('Medical’, ‘Dental’, ‘Vision’), default: 'Default'
    isOutOfPocketMaxInNetWorkBenefits: {type: Boolean, default: false},
    individualDedPktMaxInNetBenefits: {type: Number},
    individualOutOfPktMaxInNetBenefits: {type: Number},
    familyDedPktMaxInNetBenefits: {type: Number},
    familyOutOfPktMax: {type: Number},
    isOutOfNetworkBenefits: {type: Boolean, default: false},
    individualDedOutOfNetBenefits: {type: Number},
    individualOutOfPktMaxOfNetBenefits: {type: Number},
    familyDedOutOfNetBenefits: {type: Number},
    familyOutOfPocketMax: {type: Number},
    finalDedutible: {type: Number},
    prePay: {type: Number},
    ppi: {type: Number},
    buffer: {type: Number},
    totalToPay: {type: Number}
  },
  {timestamps: true}
)

export const patientInsuranceModel: Model<IPatientInsuranceModel> = model<IPatientInsuranceModel>(
  'PatientInsurance',
  _PatientInsuranceSchema
)
