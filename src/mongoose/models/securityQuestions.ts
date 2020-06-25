import {Document, Schema, Model, model} from 'mongoose'
import {ISecurityQuestion} from '../interfaces/securityQuestion'

export interface ISecurityQuestionModel extends ISecurityQuestion, Document {}

export var _SecurityQuestionSchema = new Schema(
  {
    question: {type: String, required: true}
  },
  {timestamps: true}
)

export const securityQuestionModel: Model<ISecurityQuestionModel> = model<ISecurityQuestionModel>(
  'SecurityQuestion',
  _SecurityQuestionSchema
)
