import {Document, Schema, Model, model} from 'mongoose'
import {IPatientCreditCard} from '../interfaces/patientCreditCard'

export interface IPatientCreditCardModel extends IPatientCreditCard, Document {}

export var _PatientCreditCardSchema = new Schema(
  {
    PatientId: {type: String, required: true},
    cardType: {type: String},
    nameOnCard: {type: String},
    cardNumber: {type: String},
    expiryDateMonYrs: {type: String},
    cvvNumber: {type: String},
    billingAddress: {type: String},
    cardBrand: {type: String},
    cardLevel: {type: String},
    stripeKey: {type: String},
    isPreferred: {type: Boolean, default: false}
  },
  {timestamps: true}
)

// smsSchema.plugin(autoIncrement.plugin, {model: 'sms', startAt: 1});

export const patientCreditCardModel: Model<IPatientCreditCardModel> = model<IPatientCreditCardModel>(
  'PatientCreditCard',
  _PatientCreditCardSchema
)
