import {Document, Schema, Model, model} from 'mongoose'
import {IPatientAddressDetail} from '../interfaces/patientAddressDetail'

export interface IPatientAddressDetailModel extends IPatientAddressDetail, Document {}

export var _PatientAddressDetailSchema = new Schema(
  {
    PatientId: {type: String, required: true},
    address: {type: String},
    year: {type: String},
    month: {type: String},
    homeStatus: {type: String}
  },
  {timestamps: true}
)

export const patientAddressDetailModel: Model<IPatientAddressDetailModel> = model<IPatientAddressDetailModel>(
  'PatientAddressDetail',
  _PatientAddressDetailSchema
)
