import {CustomResponse, PoemCheckOutCardsInput} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
// import * as db from '../../ottoman/db.js'
import * as db from '../../sequelize/models/index'
import * as moment from 'moment'
import * as _ from 'lodash'
import {securityQuestionModel} from '../../mongoose/models'

@Injectable()
export class PaymentService {
  constructor(private logger: AbstractLogger) {}

  public createPatientPayments(
    patientId: string,
    monthlyStatementId: string,
    checkOutCards: PoemCheckOutCardsInput[]
  ): Promise<CustomResponse> {
    return new Promise(async (resolve, reject) => {
      var statmentDetails = checkOutCards.map((checkOutCard) => {
        if (checkOutCard.amount > 0)
          return {
            PatientId: patientId,
            MonthlyStatementId: monthlyStatementId,
            PatientCreditCardId: checkOutCard.PatientCreditCardId,
            scheduleDate: checkOutCard.paymentDate,
            paymentAmount: checkOutCard.amount
          }
        else return null
      })

      var _StatmentDetails = _.filter(statmentDetails, function(o) {
        return !_.isNull(o)
      })

      db['PatientPayment']
        .bulkCreate(_StatmentDetails)
        .then(function(response) {
          resolve({status: 200, message: 'Data updated successfully', resultId: monthlyStatementId})
        })
        .catch(function(error) {
          reject(error)
        })
    })
  }
}
