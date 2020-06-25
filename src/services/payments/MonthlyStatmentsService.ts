import {CustomResponse} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
// import * as db from '../../ottoman/db.js'
import * as db from '../../sequelize/models/index'
import * as moment from 'moment'
import * as _ from 'lodash'
import {securityQuestionModel} from '../../mongoose/models'

@Injectable()
export class MonthlyStatmentsService {
  constructor(private logger: AbstractLogger) {}

  public genrateStatment(patientId: string): Promise<CustomResponse> {
    return new Promise(async (resolve, reject) => {
      var tableParams = {
        PatientId: patientId,
        statementDate: moment().format('YYYY-MM-DD HH:ss'),
        dueDate: moment()
          .add(10, 'days')
          .format('YYYY-MM-DD HH:ss'),
        totalAmount: 0,
        paidAmount: 0,
        balanceAmount: 0,
        prePay_this_statment: 0,
        prePay_paid: 0,
        prePay_due: 0,
        prePay_available: 0,
        ppi_this_statment: 0,
        ppi_paid: 0,
        ppi_due: 0,
        ppi_available: 0,
        buffer_this_statment: 0,
        buffer_paid: 0,
        buffer_due: 0,
        buffer_available: 0,
        lateFees_this_statment: 0,
        lateFees_paid: 0,
        lateFees_due: 0,
        lateFees_available: 0,
        intrest_this_statment: 0,
        intrest_paid: 0,
        intrest_due: 0,
        intrest_available: 0,
        finalClaim_this_statment: 0,
        finalClaim_paid: 0,
        finalClaim_due: 0,
        finalClaim_available: 0,
        finalClaim90days_this_statment: 0,
        finalClaim90days_paid: 0,
        finalClaim90days_due: 0,
        finalClaim90days_available: 0,
        estimatedClaim_this_statment: 0,
        estimatedClaim_paid: 0,
        estimatedClaim_due: 0,
        estimatedClaim_available: 0
      }

      console.log('MonthlyStatement Service - genrateStatment(): ' + patientId)

      var thisStatment = await db['sequelize'].query(
        `
            SELECT
              "AT"."id", "AT"."title", SUM("vAD"."InstallmentAmount") AS "Amount"
            FROM
              "ActivityTypes" AS "AT" LEFT JOIN "viewActivityDetails" AS "vAD"
              ON
                "AT"."id" = "vAD"."ActivityTypeId" AND "vAD"."PatientId" = (:PatientId) AND
                "vAD"."isActivityActive" = true AND "vAD"."isInstallmentPaid" = false
            GROUP BY "AT"."id", "AT"."title"
          `,
        {
          replacements: {PatientId: patientId},
          type: db['sequelize'].QueryTypes.SELECT
        }
      )
      tableParams.totalAmount = _.sumBy(thisStatment, function(o) {
        return o.Amount
      })
      tableParams.balanceAmount = _.sumBy(thisStatment, function(o) {
        return o.Amount
      })
      console.log('Total amount is : ' + tableParams.totalAmount)
      await thisStatment.map((x) => {
        switch (x.id) {
          case 3:
            tableParams.ppi_this_statment = _.isNull(x.Amount) ? 0 : x.Amount
            break
          case 4:
            tableParams.prePay_this_statment = _.isNull(x.Amount) ? 0 : x.Amount
            break
          case 5:
            tableParams.estimatedClaim_this_statment = _.isNull(x.Amount) ? 0 : x.Amount
            break
          case 6:
            tableParams.finalClaim_this_statment = _.isNull(x.Amount) ? 0 : x.Amount
            break
          case 7:
            tableParams.lateFees_this_statment = _.isNull(x.Amount) ? 0 : x.Amount
            break
          case 8:
            tableParams.intrest_this_statment = _.isNull(x.Amount) ? 0 : x.Amount
            break
        }
      })

      var toDate = await db['sequelize'].query(
        `
            SELECT
              "AT"."id", "AT"."title", SUM("vAD"."ActivityPaidAmount") AS "Paid", SUM("vAD"."ActivityBalanceAmount") AS "amountDue"
            FROM
              "ActivityTypes" AS "AT" LEFT JOIN "viewActivityDetails" AS "vAD"
              ON
                "AT"."id" = "vAD"."ActivityTypeId" AND "vAD"."PatientId" = (:PatientId) AND
                "vAD"."isActivityActive" = true
            GROUP BY "AT"."id", "AT"."title"
          `,
        {
          replacements: {PatientId: patientId},
          type: db['sequelize'].QueryTypes.SELECT
        }
      )
      await toDate.map((x) => {
        switch (x.id) {
          case 3:
            tableParams.ppi_paid = _.isNull(x.Paid) ? 0 : x.Paid
            tableParams.ppi_due = _.isNull(x.amountDue) ? 0 : x.amountDue
            break
          case 4:
            tableParams.prePay_paid = _.isNull(x.Paid) ? 0 : x.Paid
            tableParams.prePay_due = _.isNull(x.amountDue) ? 0 : x.amountDue
            break
          case 5:
            tableParams.estimatedClaim_paid = _.isNull(x.Paid) ? 0 : x.Paid
            tableParams.estimatedClaim_due = _.isNull(x.amountDue) ? 0 : x.amountDue
            break
          case 6:
            tableParams.finalClaim_paid = _.isNull(x.Paid) ? 0 : x.Paid
            tableParams.finalClaim_due = _.isNull(x.amountDue) ? 0 : x.amountDue
            break
          case 7:
            tableParams.lateFees_paid = _.isNull(x.Paid) ? 0 : x.Paid
            tableParams.lateFees_due = _.isNull(x.amountDue) ? 0 : x.amountDue
            break
          case 8:
            tableParams.intrest_paid = _.isNull(x.Paid) ? 0 : x.Paid
            tableParams.intrest_due = _.isNull(x.amountDue) ? 0 : x.amountDue
            break
        }
      })

      db['MonthlyStatement']
        .create(tableParams)
        .then(async (monthlyStatment) => {
          this.addStatmentDetails(patientId, monthlyStatment.id).then((_result) => {
            resolve({status: 200, message: 'Data updated successfully', resultId: monthlyStatment.id})
          })
        })
        .catch((error) => {
          // return error
          reject(error)
        })
    })
  }

  public addStatmentDetails(patientId: string, monthlyStatementId: string): Promise<CustomResponse> {
    return new Promise(async (resolve, reject) => {
      resolve({status: 200, message: 'Data updated successfully'})

      var thisStatment = await db['sequelize'].query(
        `
        SELECT
          "AT"."id", "AT"."title",
          "vAD"."ActivityTypeId", "vAD"."ActivityId", "vAD"."ActivityInstallmentId", "vAD"."PatientId", "vAD"."ClaimId",
          "vAD"."ActivityAmount", "vAD"."ActivityPaidAmount", "vAD"."ActivityBalanceAmount", "vAD"."InstallmentAmount"
        FROM
          "ActivityTypes" AS "AT" LEFT JOIN "viewActivityDetails" AS "vAD"
          ON
            "AT"."id" = "vAD"."ActivityTypeId" AND "vAD"."isActivityActive" = true AND "vAD"."isInstallmentPaid" = false AND "vAD"."PatientId" = (:PatientId)
      `,
        {
          replacements: {PatientId: patientId},
          type: db['sequelize'].QueryTypes.SELECT
        }
      )
      var statmentDetails = thisStatment.map((_thisStatment) => {
        if (!_.isNull(_thisStatment.ActivityId))
          return {
            PatientId: patientId,
            MonthlyStatementId: monthlyStatementId,
            ActivityId: _thisStatment.ActivityId,
            ActivityInstallmentId: _thisStatment.ActivityInstallmentId,
            ClaimId: _.isNull(_thisStatment.ClaimId) ? -1 : _thisStatment.ClaimId,
            totalAmount: _.isNull(_thisStatment.ActivityAmount) ? 0 : _thisStatment.ActivityAmount,
            previousPaidAmount: _.isNull(_thisStatment.ActivityPaidAmount) ? 0 : _thisStatment.ActivityPaidAmount,
            installmentAmount: _.isNull(_thisStatment.InstallmentAmount) ? 0 : _thisStatment.InstallmentAmount,
            paidAmount: 0,
            balanceAmount: _.isNull(_thisStatment.ActivityBalanceAmount) ? 0 : _thisStatment.ActivityBalanceAmount
          }
        else return null
      })

      var _StatmentDetails = _.filter(statmentDetails, function(o) {
        return !_.isNull(o)
      })

      db['MonthlyStatementDetail']
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
