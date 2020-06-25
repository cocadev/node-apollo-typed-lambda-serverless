import {CustomResponse} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
// import * as db from '../../ottoman/db.js'
import * as db from '../../sequelize/models/index'
import * as moment from 'moment'
import {securityQuestionModel} from '../../mongoose/models'

@Injectable()
export class ActivitiesSerivce {
  constructor(private logger: AbstractLogger) {}

  public updateFinalClaimActivity(claimId: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      resolve({status: 200, message: 'Data updated successfully', resultId: claimId})
    })
  }

  public createActivity(
    patientId: string,
    service: string,
    installments: number,
    amount: number,
    paidAmount: number,
    nextInstallmentAmount: number
  ): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      let _installments = installments > 0 ? installments : 1
      let _nextInstallmentAmount = nextInstallmentAmount > 0 ? nextInstallmentAmount : 0
      let _balanceAmount = amount - paidAmount
      db['ActivityType']
        .findOne({where: {title: service}})
        .then((activityType) => {
          if (activityType) {
            db['Activity']
              .create({
                PatientId: patientId,
                ActivityTypeId: activityType.id, // for ActivityTypeId for PPI Activity
                activityDate: moment().format('YYYY-MM-DD HH:ss'),
                service: service,
                // coPay: 0, coInsurance: 0, selfPay: 0, charity: 0, buffer: 0, prepay: 0, ppi: payload.ppiTotalAmount,
                // fees: 0, deductible: 0, outOfPocketMax: 0,
                total: amount,
                paidAmount: paidAmount,
                balanceAmount: _balanceAmount,
                installments: _installments,
                nextInstallmentAmount: _nextInstallmentAmount
              })
              .then((returnObject) => {
                resolve({status: 200, message: 'Data updated successfully', resultId: returnObject.id})
              })
              .catch((error) => {
                reject({status: 400, message: 'Kindly try again'})
              })
          } else {
            reject({status: 400, message: 'Invalid service'})
          }
        })
        .catch((error) => {
          reject({status: 400, message: 'Kindly try again', content: error})
        })
    })
  }

  public findActivity(patientId: string, service: string): Promise<number> {
    return new Promise((resolve, reject) => {
      db['Activity']
        .findOne(
          {where: {PatientId: patientId, service: service}} // where clause
        )
        .then((activityObject) => {
          if (activityObject) {
            db['ActivityInstallment'].find({where: {ActivityId: activityObject.id}}).then((installments) => {
              if (!installments) resolve(activityObject.id)
              else resolve(0)
            })
          } else resolve(0)
        })
        .catch((error) => {
          reject({status: 400, message: 'Kindly try again', content: error})
        })
    })
  }

  public updateActivity(
    activityId: number,
    installments: number,
    amount: number,
    paidAmount: number,
    nextInstallmentAmount: number
  ): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      let _installments = installments > 0 ? installments : 1
      let _nextInstallmentAmount = nextInstallmentAmount > 0 ? nextInstallmentAmount : 0
      let _balanceAmount = amount - paidAmount

      db['Activity']
        .findById(activityId)
        .then((_activity) => {
          _activity.activityDate = moment().format('YYYY-MM-DD HH:ss')
          _activity.total = amount
          _activity.paidAmount = paidAmount > 0 ? paidAmount : _activity.paidAmount
          _activity.balanceAmount = _balanceAmount > 0 ? _balanceAmount : _activity.balanceAmount
          _activity.installments = _installments > 0 ? _installments : _activity.installments
          _activity.nextInstallmentAmount =
            _nextInstallmentAmount > 0 ? _nextInstallmentAmount : _activity.nextInstallmentAmount

          _activity.save().then(() => {
            resolve({status: 200, message: 'Data updated successfully'})
          })
        })
        .catch((error) => {
          reject({status: 400, message: 'Kindly try again', content: error})
        })
    })
  }

  public genrateInstallments(patientId: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      // var patientId = 1
      var currentStatments = db['sequelize'].query(
        `
        SELECT
          "vAD"."ActivityId", "vAD"."ClaimId", MAX("vAD"."ActivityNextInstallmentAmount") AS "ActivityNextInstallmentAmount",
          MAX("ActivityAmount") AS "ActivityAmount",
          MAX("ActivityPaidAmount") AS "ActivityPaidAmount",
          MAX("ActivityBalanceAmount") AS "ActivityBalanceAmount",
          MAX("ActivityInstallments") AS "ActivityInstallments",
          COUNT("vAD"."InstallmentNumber") AS "InstallmentsCreated"
        FROM
        	"viewActivityDetails" AS "vAD"
        WHERE
            "vAD"."isActivityActive" = true AND "vAD"."PatientId" = (:PatientId)
        GROUP BY
        	"vAD"."ActivityId", "vAD"."ClaimId"
      `,
        {
          replacements: {PatientId: patientId},
          type: db['sequelize'].QueryTypes.SELECT
        }
      )

      if (currentStatments.length == 0)
        resolve({status: 200, message: 'Installments created successfully', resultId: '0'})
      else {
        var totalCount = currentStatments.length
        var recordCount = 0

        var installmnetQueries = currentStatments.map((x) => {
          var _remaingInstallments = parseInt(x.ActivityInstallments) - parseInt(x.InstallmentsCreated)
          var nextInstallmentNumber = parseInt(x.InstallmentsCreated) + 1 // Next Installment number

          if (_remaingInstallments > 0) {
            var nextInstallmentAmount =
              x.ActivityNextInstallmentAmount > 0
                ? parseFloat(x.ActivityNextInstallmentAmount)
                : parseFloat(x.ActivityBalanceAmount) / _remaingInstallments
          } else {
            var nextInstallmentAmount = parseFloat(x.ActivityBalanceAmount)
          }

          var newRecord = {
            ActivityId: x.ActivityId,
            PatientId: patientId,
            installmentNumber: nextInstallmentNumber,
            amount: nextInstallmentAmount.toFixed(2),
            amountPaid: 0,
            amountDue: nextInstallmentAmount.toFixed(2),
            installmentDate: moment().format('YYYY-MM-DD HH:ss'),
            paymentDate: null,
            dueDate: moment()
              .add(10, 'days')
              .format('YYYY-MM-DD HH:ss'),
            isPaid: false,
            isActive: true
          }

          this.logger.info('--> Creating installment for Activity: ' + x.ActivityId)
          this.logger.info(JSON.stringify(newRecord))

          db['ActivityInstallment']
            .update({isActive: false}, {where: {ActivityId: x.ActivityId}})
            .then((_x) => {
              db['ActivityInstallment'].create(newRecord).then((result) => {
                this.logger.info('--> Installment created for ActivityId: ' + x.ActivityId)
                db['Activity']
                  .update(
                    {nextInstallmentAmount: 0}, // what going to be updated
                    {where: {id: x.ActivityId}} // where clause
                  )
                  .then((_result) => {
                    recordCount++
                    if ((recordCount) => totalCount)
                      resolve({
                        status: 200,
                        message: 'Installments created successfully',
                        resultId: recordCount.toString()
                      })
                  })
              })
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    })
  }
}
