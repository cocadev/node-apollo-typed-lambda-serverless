import {
  Patient,
  PatientDetails,
  CustomResponse,
  StripeKeys,
  SecurityResponse,
  SecretResponse,
  PatientAddress,
  PatientInsurance,
  PoemSummay,
  PatientCreditCard,
  PoemPaymentPlan,
  PoemCheckoutInformation,
  PatientPayment,
  PatientSearchLog,
  TempRegisterInput,
  UpdateBasicDataInput,
  AddPatientAddressDetailsInput,
  UpdateSecuritySecretQuestionsInput,
  UpdateAgreementInput,
  DeleteInsuranceInput,
  AddDependentInput,
  AddInsuranceInput,
  UpdateInsuranceInput,
  UpdatePoemInfoInput,
  UpdatePoemPaymentPlanInput,
  AddPatientCreditCardInput,
  UpdatePatientCreditCardInput,
  PoemCheckOutInput
} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
import * as _ from 'lodash'
import md5 from 'md5-hash'
import * as moment from 'moment'
import * as patientAddressDetailsMdl from '../../ottoman/models/patientAddressDetails.js'
import * as patientCreditCardsMdl from '../../ottoman/models/patientCreditCards.js'
import * as patientInsurancesMdl from '../../ottoman/models/patientInsurances.js'
import * as patientDetailsMdl from '../../ottoman/models/patientDetails.js'
import * as patientSearchLogsMdl from '../../ottoman/models/patientSearchLogs.js'
import * as couchDB from '../../ottoman/db.js'
import * as db from '../../sequelize/models/index'

import {CommonService} from '../CommonService'
import {ActivitiesSerivce} from '../payments/ActivitiesSerivce'
import {MonthlyStatmentsService} from '../payments/MonthlyStatmentsService'
import {PaymentService} from '../payments/PaymentService'
import {StripeService} from '../payments/StripeService'

@Injectable()
export class PatientsService {
  // private commonService: CommonService = new CommonService(null)
  private commonService: CommonService
  private activitiesSerivce: ActivitiesSerivce
  private monthlyStatmentsService: MonthlyStatmentsService
  private paymentService: PaymentService
  private stripeService: StripeService
  private customResponse: CustomResponse = {status: 200, message: 'response message'}

  constructor(private logger: AbstractLogger) {
    this.commonService = new CommonService(logger)
    this.activitiesSerivce = new ActivitiesSerivce(logger)
    this.monthlyStatmentsService = new MonthlyStatmentsService(logger)
    this.paymentService = new PaymentService(logger)
    this.stripeService = new StripeService(logger)
  }
  searchPatient(searchString?: string): Promise<Patient[]> {
    return new Promise((resolve, reject) => {
      var regex = /^\d+$/
      var result = regex.test(searchString)

      if (!result) {
        var ssnLast4 = '',
          birth = ''
        var ssn = /\d{4}$/
        var bDate = /(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}/
        if (searchString.match(ssn)) {
          ssnLast4 = searchString.match(ssn)[0]
        }
        if (searchString.match(bDate)) {
          birth = searchString.match(bDate)[0]
        }

        var name = searchString.match('[a-zA-Z]+')
        var dateOfBirth =
          birth.substring(birth.length - 4, birth.length) +
          '-' +
          birth.substring(0, 2) +
          '-' +
          birth.substring(3, 5)
        var statement =
          "SELECT _id as patientDetailId FROM poem_dev as s WHERE s._type='PatientDetails' AND ssn LIKE '%" +
          ssnLast4 +
          "' AND dateOfBirth LIKE '" +
          dateOfBirth +
          "%'"
        var query = couchDB.N1qlQuery.fromString(statement)
        couchDB.bucket.query(query, (err, result, meta) => {
          if (err) {
            this.logger.error('searchPatient: ' + JSON.stringify(err))
            reject(err)
          } else {
            db['Patient']
              .findAll({where: {$or: result, $and: {name: name}}})
              .then((patients) => {
                if (!patients) {
                  resolve([{}])
                } else {
                  resolve(patients)
                }
              })
              .catch((error) => {
                reject(error)
              })
          }
        })
      } else {
        var statement =
          "SELECT _id as patientDetailId FROM poem_dev as s WHERE s._type='PatientDetails' AND ssn ='" +
          searchString +
          "'"
        var query = couchDB.N1qlQuery.fromString(statement)
        couchDB.bucket.query(query, (err, result, meta) => {
          if (err) {
            this.logger.error('searchPatient: ' + JSON.stringify(err))
            reject(err)
          } else {
            db['Patient']
              .findAll({where: {$or: result}})
              .then((patients) => {
                if (!patients) {
                  // resolve([{}])
                } else {
                  resolve(patients)
                }
              })
              .catch((error) => {
                reject(error)
              })
          }
        })
      }
    })
  }

  public userLogin(username?: string, password?: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['Patient']
        .findOne({where: {username: username}})
        .then((patient) => {
          // Check if record exists in db
          if (!patient) {
            db['TempRegistration']
              .findOne({where: {username: username}})
              .then((tempRegister) => {
                if (tempRegister) {
                  if (tempRegister.password == password) {
                    // if record is still in tempRegister, then mobile not verified
                    resolve({status: 410, message: 'Mobile not verified', resultId: tempRegister.id})
                  } else resolve({status: 400, message: 'Invalid password provided', resultId: null})
                } else {
                  resolve({status: 400, message: 'Invalid username provided', resultId: null})
                }
              })
              .catch((error) => {
                reject(error)
              })
          } else {
            if (patient.password == password) {
              patientDetailsMdl.find({PatientId: this.commonService.createHash(patient.id)}, (err, records) => {
                this.logger.info('patientDetailsMdl: ' + JSON.stringify(records))
                var patientDetails = records[0]
                if (!patientDetails.otpVerified)
                  resolve({status: 410, message: 'Mobile not verified', resultId: patient.id})
                else if (!patientDetails.isEmailVerified)
                  resolve({status: 415, message: 'Email not verified', resultId: patient.id})
                else resolve({status: 200, message: patient.lastScreen, resultId: patient.id})
              })
            } else resolve({status: 400, message: 'Invalid password provided', resultId: null})
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getPatientDetails(patientDetailId?: string): Promise<PatientDetails> {
    return new Promise((resolve, reject) => {
      patientDetailsMdl.getById(patientDetailId, (err, patientDetails) => {
        if (err) reject(err)
        else resolve(patientDetails)
      })
    })
  }

  public getDependents(patientId?: string): Promise<[Patient]> {
    return new Promise((resolve, reject) => {
      db['Patient']
        .findAll({where: {ParentId: patientId}})
        .then((patients) => {
          // Check if record exists in db
          if (!patients) {
            resolve([{}])
          } else {
            resolve(patients)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getPatient(id?: string): Promise<Patient> {
    this.logger.info('getPatient for: ' + id)

    return new Promise((resolve, reject) => {
      db['Patient']
        .findOne({where: {id: id}})
        .then((patient) => {
          // Check if record exists in db
          if (!patient) {
            resolve({})
          } else {
            resolve(patient)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getPatientByUsername(username?: string): Promise<Patient> {
    this.logger.info('getPatientByUsername for: ' + username)

    return new Promise((resolve, reject) => {
      db['Patient']
        .findOne({where: {username: username}})
        .then((patient) => {
          // Check if record exists in db
          if (!patient) {
            resolve({})
          } else {
            resolve(patient)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public checkUsernameAvailable(username?: string): Promise<CustomResponse> {
    this.logger.info('checkUsernameAvailable for: ' + username)

    return new Promise((resolve, reject) => {
      this.commonService.usernameAvailable(username).then((chk) => {
        if (username) {
          resolve({status: 200, message: 'username is available'})
        } else {
          resolve({status: 400, message: 'username is already taken'})
        }
      })
    })
  }

  public checkMobileAvailable(mobile?: string): Promise<CustomResponse> {
    this.logger.info('checkMobileAvailable for: ' + mobile)

    return new Promise((resolve, reject) => {
      this.commonService.mobileAvailable(mobile).then((chk) => {
        if (chk) {
          resolve({status: 200, message: 'mobile number is not registered'})
        } else {
          resolve({status: 400, message: 'mobile number is already registered'})
        }
      })
    })
  }

  public checkEmailAvailable(email?: string): Promise<CustomResponse> {
    this.logger.info('checkEmailAvailable for: ' + email)

    return new Promise((resolve, reject) => {
      this.commonService.emailAvailable(email).then((chk) => {
        if (chk) {
          resolve({status: 200, message: 'email is not registered'})
        } else {
          resolve({status: 400, message: 'email is already registered'})
        }
      })
    })
  }

  public getPatientAddresses(patientId?: string): Promise<PatientAddress[]> {
    this.logger.info('getPatientAddresses for: ' + patientId)

    return new Promise((resolve, reject) => {
      patientAddressDetailsMdl.find({PatientId: this.commonService.createHash(patientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }
        // resolve([{}])
        resolve(returnObject)
      })
    })
  }

  public getInsuranceInformation(patientId?: string): Promise<PatientInsurance[]> {
    this.logger.info('getInsuranceInformation for: ' + patientId)

    return new Promise((resolve, reject) => {
      patientInsurancesMdl.find({PatientId: this.commonService.createHash(patientId)}, function(
        err,
        returnObject
      ) {
        if (err) {
          reject(err.toString())
        }

        resolve(returnObject)
      })
    })
  }

  public getPOEMSummary(patientId?: string): Promise<PoemSummay[]> {
    this.logger.info('getInsuranceInformation for: ' + patientId)
    var returnRecords = []

    return new Promise((resolve, reject) => {
      var statement =
        "SELECT SUM(s.prePay) as prePay, SUM(s.ppi) as ppi, SUM(s.buffer) as buffer, SUM(s.totalToPay) as totalToPay FROM poem_dev as s WHERE s._type='PatientInsurances' AND PatientId ='" +
        this.commonService.createHash(patientId) +
        "'"

      this.logger.error('statement: ' + statement)
      var query = couchDB.N1qlQuery.fromString(statement)

      couchDB.bucket.query(query, (err, result, meta) => {
        if (err) {
          this.logger.error('getPOEMSummary: ' + JSON.stringify(err))
          reject(err)
        } else {
          if (result[0]) {
            returnRecords.push({
              name: 'You',
              prePay: result[0].prePay,
              ppi: result[0].ppi,
              buffer: result[0].buffer,
              totalToPay: result[0].totalToPay
            })
            var countRecords = 0

            this.getDependents(patientId).then((dependents) => {
              var _dependents = dependents.map((dependent) => {
                var _statement =
                  "SELECT SUM(s.prePay) as prePay, SUM(s.ppi) as ppi, SUM(s.buffer) as buffer, SUM(s.totalToPay) as totalToPay FROM poem_dev as s WHERE s._type='PatientInsurances' AND _id ='" +
                  dependent.patientDetailId +
                  "'"
                var _query = couchDB.N1qlQuery.fromString(_statement)

                var _a = couchDB.bucket.query(_query, (err, _result, meta) => {
                  return {
                    prePay: _result[0].prePay,
                    ppi: _result[0].ppi,
                    buffer: _result[0].buffer,
                    totalToPay: _result[0].totalToPay
                  }
                })

                return _.assign({name: dependent.name}, _a)
              })

              resolve(_.concat(returnRecords, _dependents))
            })
          } else {
            resolve([{}])
          }
        }
      })
    })
  }

  public getPOEMPaymentPlan(patientId?: string): Promise<PoemPaymentPlan> {
    this.logger.info('getPOEMPaymentPlan for: ' + patientId)

    return new Promise((resolve, reject) => {
      // var N1qlQuery = require("couchbase").N1qlQuery;

      var statement =
        "select SUM(s.prePay) as prePay, SUM(s.ppi) as ppi, SUM(s.buffer) as buffer, SUM(s.totalToPay) as totalToPay from poem_dev as s where s._type='PatientInsurances'"
      var query = couchDB.N1qlQuery.fromString(statement)
      couchDB.bucket.query(query, (err, result, meta) => {
        if (err) {
          this.logger.error('getPOEMPaymentPlan: ' + JSON.stringify(err))
          reject(err)
        } else {
          this.logger.info('getPOEMPaymentPlan: ' + JSON.stringify(result))
          var prePayInstallment = result[0].prePay * 0.1 + result[0].prePay
          var prePayInstallment1stMinPayment = prePayInstallment * 0.4
          var ppiInstallment = result[0].ppi * 0.1 + result[0].ppi
          var ppiInstallment1stMinPayment = ppiInstallment * 0.4

          resolve({
            PatientId: patientId,
            prePay: result[0].prePay,
            prePayInstallment: prePayInstallment,
            prePayInstallment1stMinPayment: prePayInstallment1stMinPayment,
            ppi: result[0].ppi,
            ppiInstallment: ppiInstallment,
            ppiInstallment1stMinPayment: ppiInstallment1stMinPayment
          })
        }
      })
    })
  }

  public getPatientCreditCards(patientId?: string): Promise<PatientCreditCard[]> {
    this.logger.info('getPatientCreditCards for: ' + patientId)

    return new Promise((resolve, reject) => {
      patientCreditCardsMdl.find({PatientId: this.commonService.createHash(patientId)}, function(
        err,
        returnObject
      ) {
        if (err) {
          reject(err.toString())
        }

        resolve(returnObject)
      })
    })
  }

  public getPatientCreditCard(patientCreditCardId?: string): Promise<PatientCreditCard> {
    this.logger.info('getPatientCreditCard for: ' + patientCreditCardId)

    return new Promise((resolve, reject) => {
      patientCreditCardsMdl.getById(patientCreditCardId, (err, record) => {
        if (err) {
          resolve({})
        }
        resolve(record)
      })
    })
  }

  public forgotUsernameStep1(name?: string, dateOfBirth?: string, ssn?: string): Promise<SecurityResponse> {
    this.logger.info('forgotUsernameStep1 for ssn: ' + ssn)

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({ssn: ssn}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (!returnObject) resolve({status: 400, message: 'No record found', ssn: ssn})
        else {
          resolve({status: 200, message: 'Record found', ssn: ssn, question1: returnObject.securityQuestion1})
        }
      })
    })
  }

  public answerSecurityQuestions(
    ssn?: string,
    answer1?: string,
    answer2?: string,
    answer3?: string
  ): Promise<SecurityResponse> {
    this.logger.info('answerSecurityQuestions for ssn: ' + ssn)

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({ssn: ssn}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (!returnObject) resolve({status: 400, message: 'No record found', ssn: ssn})
        else {
          var patient = returnObject
          var responseObject = {
            ssn: patient.ssn,
            question1: patient.securityQuestion1,
            answer1: answer1,
            question2: patient.securityQuestion2,
            answer2: answer2,
            question3: '',
            answer3: '',
            secretQuestion: null,
            status: 200,
            message: 'Record found'
          }
          var correctAnswers = patient.securityQuestion1_answer == answer1 ? 1 : 0
          correctAnswers = patient.securityQuestion2_answer == answer2 ? correctAnswers + 1 : correctAnswers
          correctAnswers = patient.securityQuestion3_answer == answer3 ? correctAnswers + 1 : correctAnswers

          if (correctAnswers > 1) responseObject.secretQuestion = patient.secretQuestion

          if (!_.isEmpty(answer1) && _.isEmpty(answer2) && _.isEmpty(answer3)) resolve(responseObject)
          else if (!_.isEmpty(answer1) && !_.isEmpty(answer2) && correctAnswers == 1) {
            responseObject.question3 = patient.securityQuestion3
            resolve(responseObject)
          } else if (!_.isEmpty(answer1) && !_.isEmpty(answer2) && correctAnswers == 0) {
            responseObject.status = 400
            responseObject.message = 'Incorrect answers to security questions'
            resolve(responseObject)
          } else if (!_.isEmpty(answer1) && !_.isEmpty(answer2) && !_.isEmpty(answer3) && correctAnswers < 2) {
            responseObject.status = 400
            responseObject.message = 'Incorrect answers to security questions'
            resolve(responseObject)
          } else resolve(responseObject)
        }
      })
    })
  }

  public forgotUsernameStep2(ssn?: string, secretAnswer?: string): Promise<SecretResponse> {
    this.logger.info('forgotUsernameStep2 for ssn: ' + ssn)

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({ssn: ssn}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (!returnObject) resolve({status: 400, message: 'No record found'})
        else if (returnObject.secretQuestion_answer == secretAnswer) {
          db['Patient']
            .findOne({where: {'md5(CAST("id" as VARCHAR))': returnObject.PatientId}})
            .then((patient) => {
              // Check if record exists in db
              if (!patient) {
                resolve({status: 400, message: 'No record found'})
              } else {
                resolve({status: 200, message: 'Record found', username: patient.username})
              }
            })
            .catch((error) => {
              reject(error)
            })
        } else resolve({status: 400, message: 'Incorrect answer to secret question'})
      })
    })
  }

  public forgotPasswordStep1(
    ssn?: string,
    username?: string,
    name?: string,
    dateOfBirth?: string
  ): Promise<SecurityResponse> {
    this.logger.info('forgotPasswordStep1 for ssn: ' + ssn)

    return new Promise((resolve, reject) => {
      db['Patient']
        .findOne({where: {username: username}})
        .then((patient) => {
          // Check if record exists in db
          if (!patient) {
            resolve({status: 400, message: 'No record found'})
          } else {
            patientDetailsMdl.find({ssn: ssn}, (err, returnObject) => {
              if (err) {
                reject(err.toString())
              }

              if (!returnObject) resolve({status: 400, message: 'No record found', ssn: ssn})
              else {
                resolve({
                  status: 200,
                  message: 'Record found',
                  ssn: ssn,
                  question1: returnObject.securityQuestion1
                })
              }
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public forgotPasswordStep2(username?: string, secretAnswer?: string): Promise<SecretResponse> {
    this.logger.info('forgotUsernameStep2 for username: ' + username)

    return new Promise((resolve, reject) => {
      db['Patient']
        .findOne({where: {username: username}})
        .then((patient) => {
          // Check if record exists in db
          if (!patient) {
            resolve({status: 400, message: 'No record found'})
          } else {
            patientDetailsMdl.find({PatientId: this.commonService.createHash(patient.id)}, (err, returnObject) => {
              if (err) {
                reject(err.toString())
              }

              if (!returnObject) resolve({status: 400, message: 'No record found'})
              else if (returnObject[0].secretQuestion_answer == secretAnswer)
                resolve({status: 200, message: 'Record found', username: username})
              else {
                resolve({status: 400, message: 'Incorrect answer to secret question'})
              }
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public forgotPasswordStep3(
    username?: string,
    secretAnswer?: string,
    newPassword?: string
  ): Promise<CustomResponse> {
    this.logger.info('forgotPasswordStep3 for username: ' + username)

    return new Promise((resolve, reject) => {
      db['Patient']
        .findOne({where: {username: username}})
        .then((patient) => {
          // Check if record exists in db
          if (!patient) {
            resolve({status: 400, message: 'No record found'})
          } else {
            patientDetailsMdl.find({PatientId: this.commonService.createHash(patient.id)}, (err, returnObject) => {
              if (err) {
                reject(err.toString())
              }

              if (!returnObject) resolve({status: 400, message: 'No record found'})
              else {
                db['Patient']
                  .update(
                    {password: this.commonService.createHash(newPassword)},
                    {where: {id: patient.id}} // where clause
                  )
                  .then((patient) => {
                    resolve({status: 200, message: 'Password changed successfully'})
                  })
                  .catch((error) => {
                    reject(error)
                  })
              }
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getPatientSecurityQuestion(patientId?: string): Promise<SecurityResponse> {
    this.logger.info('getPatientSecurityQuestion for PatientId: ' + patientId)

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(patientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (!returnObject) resolve({status: 400, message: 'No record found'})
        else {
          resolve({status: 200, message: 'Record found', question1: returnObject.securityQuestion1})
        }
      })
    })
  }

  public changeUsernameStep1(patientId?: string, secretAnswer?: string): Promise<SecretResponse> {
    this.logger.info('changeUsernameStep1 for PatientId: ' + patientId)

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(patientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (!returnObject) {
          resolve({status: 400, message: 'No record found'})
        } else if (returnObject.secretQuestion_answer == secretAnswer) {
          db['Patient']
            .findOne({where: {id: patientId}})
            .then((patient) => {
              resolve({status: 200, message: 'Record found', username: patient.username})
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          resolve({status: 400, message: 'Incorrect answer to secret question'})
        }
      })
    })
  }

  public changeUsername(patientId?: string, secretAnswer?: string, newUsername?: string): Promise<CustomResponse> {
    this.logger.info('forgotPasswordStep3 for changeUsername: ' + patientId)

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(patientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (!returnObject) resolve({status: 400, message: 'No record found'})
        else if (returnObject[0].secretQuestion_answer == secretAnswer) {
          resolve({status: 400, message: 'Incorrect answer to secret question'})
        } else {
          db['Patient']
            .update(
              {username: newUsername},
              {where: {id: patientId}} // where clause
            )
            .then((patient) => {
              resolve({status: 200, message: 'Username changed successfully'})
            })
            .catch((error) => {
              reject(error)
            })
        }
      })
    })
  }

  public getPoemCheckoutInformation(patientId?: string): Promise<PoemCheckoutInformation> {
    this.logger.info('forgotPasswordStep3 for changeUsername: ' + patientId)

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(patientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (!returnObject) resolve({})
        else {
          var record = returnObject[0]
          var dueAmount = record.prePay1stInstallment + record.ppi1stInstallment

          var employerContribution = 0
          var totalDueAmount = dueAmount + employerContribution

          resolve({
            dueAmount: dueAmount,
            employerContribution: employerContribution,
            totalDueAmount: totalDueAmount
          })
        }
      })
    })
  }

  public getPaymentInfo(statementId?: string): Promise<PatientPayment[]> {
    this.logger.info('getPaymentInfo: ' + statementId)

    return new Promise((resolve, reject) => {
      db['PatientPayment'].findAll({where: {MonthlyStatementId: statementId}}).then((patientPayment) => {
        if (patientPayment) resolve(patientPayment)
        else resolve([{}])
      })
    })
  }

  public getPatientSearchLog(patientId?: string): Promise<PatientSearchLog[]> {
    this.logger.info('getPatientSearchLog: ' + patientId)

    return new Promise((resolve, reject) => {
      patientSearchLogsMdl.find({PatientId: patientId}, (err, returnObject) => {
        resolve(returnObject)
      })
    })
  }

  public tempRegister(input?: TempRegisterInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      this.commonService.usernameAvailable(input.username).then((usernameAvailable) => {
        if (usernameAvailable) {
          this.commonService.mobileAvailable(input.mobileNumber).then((mobileAvailable) => {
            if (mobileAvailable) {
              const tempInput = {
                name: input.name,
                suffix: input.suffix,
                username: input.username,
                password: input.password,
                mobileNumber: input.mobileNumber,
                inviteCode: input.inviteCode,
                referralCode: input.referralCode,
                otp: this.commonService.createOTP(),
                otpTTL: moment()
                  .add(2, 'minutes')
                  .format('YYYY-MM-DD HH:mm')
              }

              db['TempRegistration']
                .create(tempInput)
                .then((result) => {
                  resolve({status: 200, message: 'Data submitted successfully', resultId: result.id})
                })
                .catch((error) => {
                  reject(error)
                })
            } else {
              resolve({status: 200, message: 'mobile number already registered'})
            }
          })
        } else {
          resolve({status: 400, message: 'username is already taken'})
        }
      })
    })
  }

  verifyOTP(otp?: string, tempRegisterId?: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['TempRegistration']
        .findOne({where: {id: tempRegisterId}})
        .then((_tempRegistration) => {
          if (!_tempRegistration) {
            resolve({status: 400, message: 'record not found'})
          } else {
            if (_tempRegistration.otpTTL <= moment().format('YYYY-MM-DD HH:mm')) {
              // if TTL is expired
              resolve({status: 400, message: 'OTP expired'})
            } else if (parseInt(_tempRegistration.otp) == parseInt(otp)) {
              // Update values in db
              const patientInput = {
                username: _tempRegistration.username,
                password: _tempRegistration.password,
                name: _tempRegistration.name,
                suffix: _tempRegistration.suffix
              }

              db['Patient'].create(patientInput).then((record) => {
                const patientDetailInput = {
                  PatientId: this.commonService.createHash(record.id),
                  mobileNumber: _tempRegistration.mobileNumber,
                  inviteCode: _tempRegistration.inviteCode,
                  referralCode: _tempRegistration.referralCode,
                  otp: _tempRegistration.otp,
                  otpTTL: _tempRegistration.otpTTL,
                  otpVerified: true
                }

                patientDetailsMdl.createAndSave(patientDetailInput, (err, _patientDetail) => {
                  if (err) reject(err.toString())
                  else {
                    db['Patient']
                      .update({patientDetailId: _patientDetail._id.toString()}, {where: {id: record.id}}) // where clause
                      .then((result) => {
                        _tempRegistration.destroy()
                        resolve({status: 200, message: 'OTP has been verified successfully', resultId: record.id})
                      })
                  }
                })
              })
            } else {
              // if provide OTP is invalid
              resolve({status: 400, message: 'Invalid OTP provided'})
            }
          }
        })
        .catch((error) => {
          reject({status: 4001, message: error.toString()})
        })
    })
  }

  public reSendOTP(tempRegisterId?: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const tempInput = {
        otp: this.commonService.createOTP(),
        otpTTL: moment()
          .add(2, 'minutes')
          .format('YYYY-MM-DD HH:mm')
      }

      db['TempRegistration']
        .update(tempInput, {where: {id: tempRegisterId}}) // where clause
        .then((result) => {
          resolve({
            status: 200,
            message: 'OTP sent successfully' + ' : ' + tempInput.otp,
            resultId: tempRegisterId
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public patientCurrentScreen(patientId?: string, lastScreen?: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const tempInput = {
        lastScreen: lastScreen
      }

      db['Patient']
        .update(tempInput, {where: {id: patientId}}) // where clause
        .then((result) => {
          resolve({status: 200, message: 'Data submitted successfully', resultId: patientId})
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public updateBasicData(input?: UpdateBasicDataInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(input.PatientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (returnObject.length > 0) {
          var _patientDetail = returnObject[0]
          _patientDetail.email = input.email
          _patientDetail.ssn = input.ssn
          _patientDetail.dateOfBirth = input.dateOfBirth
          _patientDetail.gender = input.gender
          _patientDetail.maritalStatus = input.maritalStatus
          _patientDetail.address = input.address
          _patientDetail.employersName = input.employersName
          _patientDetail.employersAddress = input.employersAddress
          _patientDetail.employeeNumber = input.employeeNumber
          _patientDetail.annualIncome = input.annualIncome
          _patientDetail.yearsWorkedInCurrentCompany = input.yearsWorkedInCurrentCompany
          _patientDetail.monthsWorkedInCurrentCompany = input.monthsWorkedInCurrentCompany
          // returnObject.emailCode = this.commonService.createOTP()
          // returnObject.emailCodeTTL = moment()
          //   .add(2, 'minutes')
          //   .format('YYYY-MM-DD HH:mm')

          _patientDetail.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: input.PatientId})
          })
        } else {
          resolve({status: 400, message: 'record not found'})
        }
      })
    })
  }

  public sendEmailOTP(patientId?: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(patientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }
        this.logger.info('=> returnObject: ' + JSON.stringify(returnObject))
        if (returnObject.length > 0) {
          var _patientDetail = returnObject[0]
          _patientDetail.emailCode = this.commonService.createOTP()
          _patientDetail.emailCodeTTL = moment()
            .add(2, 'minutes')
            .format('YYYY-MM-DD HH:mm')

          _patientDetail.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({
              status: 200,
              message: 'OTP sent successfully' + ' : ' + _patientDetail.emailCode,
              resultId: patientId
            })
          })
        } else {
          resolve({status: 400, message: 'record not found'})
        }
      })
    })
  }

  public addPatientAddressDetails(input?: AddPatientAddressDetailsInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const addressInput = {
        PatientId: this.commonService.createHash(input.PatientId),
        address: input.address,
        year: input.year,
        month: input.month,
        homeStatus: input.homeStatus
      }

      patientAddressDetailsMdl.createAndSave(addressInput, (err, _addressDetail) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: _addressDetail._id.toString()})
        }
      })
    })
  }

  verifyEmail(patientId?: string, emailCode?: string): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(patientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (returnObject.length > 0) {
          var _patientDetail = returnObject[0]

          this.logger.info('=> _patientDetail.emailCodeTTL: ' + _patientDetail.emailCodeTTL)
          this.logger.info(
            '=> _patientDetail.emailCodeTTL moment(): ' +
              moment(_patientDetail.emailCodeTTL).format('YYYY-MM-DD HH:mm')
          )
          this.logger.info("=> moment().format('YYYY-MM-DD HH:mm'): " + moment().format('YYYY-MM-DD HH:mm'))

          if (
            moment(_patientDetail.emailCodeTTL).format('YYYY-MM-DD HH:mm') <= moment().format('YYYY-MM-DD HH:mm')
          ) {
            // if TTL is expired
            resolve({status: 400, message: 'OTP expired'})
          } else if (parseInt(_patientDetail.emailCode) == parseInt(emailCode)) {
            // Update values in db
            _patientDetail.isEmailVerified = true
            _patientDetail.save(function(error) {
              if (error) {
                resolve({status: 400, message: JSON.stringify(error)})
              }
              resolve({status: 200, message: 'Email has been verified successfully', resultId: patientId})
            })
          } else {
            // if provide OTP is invalid
            resolve({status: 400, message: 'Invalid OTP provided'})
          }
        } else {
          resolve({status: 400, message: 'record not found'})
        }
      })
    })
  }

  updateSecuritySecretQuestions(input?: UpdateSecuritySecretQuestionsInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(input.PatientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (returnObject.length > 0) {
          var _returnObject = returnObject[0]
          _returnObject.securityQuestion1 = input.securityQuestion1
          _returnObject.securityQuestion1_answer = input.securityQuestion1_answer
          _returnObject.securityQuestion2 = input.securityQuestion2
          _returnObject.securityQuestion2_answer = input.securityQuestion2_answer
          _returnObject.securityQuestion3 = input.securityQuestion3
          _returnObject.securityQuestion3_answer = input.securityQuestion3_answer
          _returnObject.secretQuestion = input.secretQuestion
          _returnObject.secretQuestion_answer = input.secretQuestion_answer

          _returnObject.save(function(error) {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: input.PatientId})
          })
        } else {
          resolve({status: 400, message: 'record not found'})
        }
      })
    })
  }

  updateAgreement(input?: UpdateAgreementInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({PatientId: this.commonService.createHash(input.PatientId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        if (returnObject.length > 0) {
          var _returnObject = returnObject[0]
          _returnObject.isTcAccepted = input.isTcAccepted
          _returnObject.isHIPPAAPrivacyAccepted = input.isHIPPAAPrivacyAccepted
          _returnObject.isPermissionToShare = input.isPermissionToShare

          _returnObject.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: input.PatientId})
          })
        } else {
          resolve({status: 400, message: 'record not found'})
        }
      })
    })
  }

  deleteInsurance(input?: DeleteInsuranceInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      patientInsurancesMdl.find({_id: input.PatientInsuranceId}, (err, returnObject) => {
        if (returnObject.length > 0) {
          var _record = returnObject[0]
          _record.remove((err, result) => {
            if (err) {
              reject(err.toString())
            }
            resolve({status: 200, message: 'Record removed successfully', resultId: input.PatientId})
          })
        } else {
          resolve({status: 400, message: 'record not found'})
        }
      })
    })
  }

  addDependent(input?: AddDependentInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const patientInput = {ParentId: input.PatientId, name: input.name, suffix: input.suffix, type: input.type}
      db['Patient'].create(patientInput).then((record) => {
        const patientDetailInput = {
          PatientId: this.commonService.createHash(record.id),
          dateOfBirth: input.dateOfBirth,
          gender: input.gender,
          address: input.address,
          email: input.email,
          ssn: input.email
        }

        patientDetailsMdl.createAndSave(patientDetailInput, (err, _patientDetail) => {
          if (err) reject(err.toString())
          else {
            // _tempRegistration.destroy()
            db['Patient']
              .update({patientDetailId: _patientDetail._id.toString()}, {where: {id: record.id}}) // where clause
              .then((result) => {
                resolve({status: 200, message: 'Data submitted successfully', resultId: record.id})
              })
          }
        })
      })
    })
  }

  addInsurance(input?: AddInsuranceInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const insuranceInput = {
        PatientId: this.commonService.createHash(input.PatientId),
        planName: input.planName,
        planIssuer: input.planIssuer,
        planEffectiveDate: input.planEffectiveDate,
        nameOnCard: input.nameOnCard,
        memberId: input.memberId,
        groupPlanId: input.groupPlanId,
        planAddress: input.planAddress,
        csNo: input.csNo,
        providerSupportPhoneNumber: input.providerSupportPhoneNumber,
        patientSupportPhoneNumber: input.patientSupportPhoneNumber,
        areYouPrimary: input.areYouPrimary,
        emailPrimary: input.emailPrimary,
        isVerifiedByPrimary: input.isVerifiedByPrimary,
        isFinancialResponsible: input.isFinancialResponsible,
        financialResponsibleName: input.financialResponsibleName,
        financialResponsibleRelation: input.financialResponsibleRelation,
        financialResponsibleAddress: input.financialResponsibleAddress,
        cardFrontImage: input.cardFrontImage,
        cardBackImage: input.cardBackImage,
        insuranceType: input.insuranceType
      }

      patientInsurancesMdl.createAndSave(insuranceInput, (err, _patientDetail) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: _patientDetail._id.toString()})
        }
      })
    })
  }

  updateInsurance(input?: UpdateInsuranceInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const insuranceInput = {
        planName: input.planName,
        planIssuer: input.planIssuer,
        planEffectiveDate: input.planEffectiveDate,
        nameOnCard: input.nameOnCard,
        memberId: input.memberId,
        groupPlanId: input.groupPlanId,
        planAddress: input.planAddress,
        csNo: input.csNo,
        providerSupportPhoneNumber: input.providerSupportPhoneNumber,
        patientSupportPhoneNumber: input.patientSupportPhoneNumber,
        areYouPrimary: input.areYouPrimary,
        emailPrimary: input.emailPrimary,
        isVerifiedByPrimary: input.isVerifiedByPrimary,
        isFinancialResponsible: input.isFinancialResponsible,
        financialResponsibleName: input.financialResponsibleName,
        financialResponsibleRelation: input.financialResponsibleRelation,
        financialResponsibleAddress: input.financialResponsibleAddress,
        cardFrontImage: input.cardFrontImage,
        cardBackImage: input.cardBackImage,
        insuranceType: input.insuranceType
      }

      patientInsurancesMdl.getById(input.PatientInsuranceId, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.planName = input.planName
          record.planIssuer = input.planIssuer
          record.planEffectiveDate = input.planEffectiveDate
          record.nameOnCard = input.nameOnCard
          record.memberId = input.memberId
          record.groupPlanId = input.groupPlanId
          record.planAddress = input.planAddress
          record.csNo = input.csNo
          record.providerSupportPhoneNumber = input.providerSupportPhoneNumber
          record.patientSupportPhoneNumber = input.patientSupportPhoneNumber
          record.areYouPrimary = input.areYouPrimary
          record.emailPrimary = input.emailPrimary
          record.isVerifiedByPrimary = input.isVerifiedByPrimary
          record.isFinancialResponsible = input.isFinancialResponsible
          record.financialResponsibleName = input.financialResponsibleName
          record.financialResponsibleRelation = input.financialResponsibleRelation
          record.financialResponsibleAddress = input.financialResponsibleAddress
          record.cardFrontImage = input.cardFrontImage
          record.cardBackImage = input.cardBackImage
          record.insuranceType = input.insuranceType

          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id.toString()})
          })
        }
      })
    })
  }

  updatePoemInfo(input?: UpdatePoemInfoInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      this.logger.info(JSON.stringify(input))
      patientInsurancesMdl.getById(input.PatientInsuranceId, (err, record) => {
        this.logger.info(JSON.stringify(record))
        if (!err) {
          const tempDedPK = []

          tempDedPK.push(input.individualDedPktMaxInNetBenefits)
          tempDedPK.push(input.individualOutOfPktMaxInNetBenefits)
          tempDedPK.push(input.familyDedPktMaxInNetBenefits)
          tempDedPK.push(input.familyOutOfPktMax)

          let finalDedutible = _.max(tempDedPK)
          var prePay = 0.25 * finalDedutible
          var prePayInstallment = 0.1 * prePay + prePay
          var ppi = 0.04 * prePay
          var ppiInstallment = 0.15 * ppi + ppi
          var buffer = 0.5 * finalDedutible
          var totalToPay = prePay + ppi

          record.isOutOfPocketMaxInNetWorkBenefits = input.isOutOfPocketMaxInNetWorkBenefits
          record.individualDedPktMaxInNetBenefits = input.individualDedPktMaxInNetBenefits
          record.individualOutOfPktMaxInNetBenefits = input.individualOutOfPktMaxInNetBenefits
          record.familyDedPktMaxInNetBenefits = input.familyDedPktMaxInNetBenefits
          record.familyOutOfPktMax = input.familyOutOfPktMax
          record.isOutOfNetworkBenefits = input.isOutOfNetworkBenefits
          record.individualDedOutOfNetBenefits = input.individualDedOutOfNetBenefits
          record.individualOutOfPktMaxOfNetBenefits = input.individualOutOfPktMaxOfNetBenefits
          record.familyDedOutOfNetBenefits = input.familyDedOutOfNetBenefits
          record.familyOutOfPocketMax = input.familyOutOfPocketMax
          record.prePay = prePay
          record.ppi = ppi
          record.buffer = buffer
          record.totalToPay = totalToPay
          record.finalDedutible = finalDedutible

          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
          })
        } else {
          resolve({status: 400, message: 'no record found'})
        }
      })
    })
  }

  updatePOEMPaymentPlan(input?: UpdatePoemPaymentPlanInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      this.getPOEMPaymentPlan(input.PatientId).then((poemPamentPlan) => {
        this.logger.info(JSON.stringify(input))

        var prePayToBePaid = input.isPrePayPaymentSplit
          ? poemPamentPlan.prePay * 0.1 + poemPamentPlan.prePay
          : poemPamentPlan.prePay
        var ppiToBePaid = input.isPpiPaymentSplit
          ? poemPamentPlan.ppi * 0.1 + poemPamentPlan.ppi
          : poemPamentPlan.ppi

        this.logger.info('createHash: ' + this.commonService.createHash(input.PatientId))
        patientDetailsMdl.find(
          {PatientId: this.commonService.createHash(input.PatientId)},
          (err, returnObject) => {
            if (err) {
              reject(err.toString())
            }
            this.logger.info('returnObject.length: ' + returnObject.length)
            if (returnObject.length > 0) {
              var record = returnObject[0]
              record.prePay = poemPamentPlan.prePay
              record.ppi = poemPamentPlan.ppi
              record.prePayToBePaid = prePayToBePaid
              record.ppiToBePaid = ppiToBePaid
              record.isPrePayPaymentSplit = input.isPrePayPaymentSplit
              record.prePayInstallments = input.prePayInstallments
              record.prePay1stInstallment = input.prePay1stInstallment
              record.isPpiPaymentSplit = input.isPpiPaymentSplit
              record.ppiInstallments = input.ppiInstallments
              record.ppi1stInstallment = input.ppi1stInstallment

              // this.logger.info(JSON.stringify(record))
              // resolve({status: 200, message: 'Data submitted successfully', resultId: input.PatientId})

              record.save((error) => {
                if (error) reject(error.toString())
                else {
                  this.activitiesSerivce.findActivity(input.PatientId, 'PrePay').then((prepayActivityId) => {
                    if (prepayActivityId == 0) {
                      // already have activity record which is not started yet
                      this.activitiesSerivce
                        .createActivity(
                          input.PatientId,
                          'PrePay',
                          input.prePayInstallments,
                          prePayToBePaid,
                          0,
                          input.prePay1stInstallment
                        )
                        .then((prepayActivity) => {
                          if (prepayActivity.status == 200) {
                            this.activitiesSerivce
                              .createActivity(
                                input.PatientId,
                                'PPI',
                                input.ppiInstallments,
                                ppiToBePaid,
                                0,
                                input.ppi1stInstallment
                              )
                              .then((ppiActivity) => {
                                if (ppiActivity.status == 200) {
                                  resolve({
                                    status: 200,
                                    message: 'Data submitted successfully',
                                    resultId: input.PatientId
                                  })
                                }
                              })
                          }
                        })
                    } else {
                      this.activitiesSerivce
                        .updateActivity(
                          prepayActivityId,
                          input.prePayInstallments,
                          prePayToBePaid,
                          0,
                          input.prePay1stInstallment
                        )
                        .then((prepayActivity) => {
                          // if(prepayActivity.status == 200){
                          this.activitiesSerivce.findActivity(input.PatientId, 'PPI').then((ppiActivityId) => {
                            this.activitiesSerivce
                              .updateActivity(
                                ppiActivityId,
                                input.ppiInstallments,
                                ppiToBePaid,
                                0,
                                input.ppi1stInstallment
                              )
                              .then((ppiActivity) => {
                                // if(ppiActivity.status == 200){
                                resolve({
                                  status: 200,
                                  message: 'Data submitted successfully',
                                  resultId: input.PatientId
                                })
                                // }
                              })
                          })
                          // }
                        })
                    }
                    this.logger.info('prepayActivity: ' + prepayActivityId)
                    resolve({status: 200, message: 'Data submitted successfully', resultId: input.PatientId})
                  })
                  // resolve({status: 200, message: 'Data submitted successfully', resultId: input.PatientId})
                }
              })
            } else {
              resolve({status: 400, message: 'no record found'})
            }
          }
        )
      })
    })
  }

  addPatientCreditCard(input?: AddPatientCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const cardInput = {
        PatientId: this.commonService.createHash(input.PatientId),
        cardType: input.cardType,
        nameOnCard: input.nameOnCard,
        cardNumber: input.cardNumber,
        expiryMonth: input.expiryMonth,
        expiryYear: input.expiryYear,
        cvvNumber: input.cvvNumber,
        billingAddress: input.billingAddress,
        cardBrand: input.cardBrand,
        cardLevel: input.cardLevel,
        isPreferred: input.isPreferred,
        stripeToken: '',
        stripeSource: ''
      }

      this._registerCreditCard(cardInput).then((_result) => {
        cardInput.stripeToken = _result.token
        cardInput.stripeSource = _result.source

        patientCreditCardsMdl.createAndSave(cardInput, (err, _patientDetail) => {
          if (err) reject(err.toString())
          else {
            resolve({status: 200, message: 'Data submitted successfully', resultId: _patientDetail._id.toString()})
          }
        })
      })
    })
  }

  updatePatientCreditCard(input?: UpdatePatientCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      patientCreditCardsMdl.getById(input.PatientCreditCardId, (err, record) => {
        // this.logger.info(JSON.stringify(record))
        if (!err) {
          record.cardType = input.cardType
          record.nameOnCard = input.nameOnCard
          record.cardNumber = input.cardNumber
          record.expiryMonth = input.expiryMonth
          record.expiryYear = input.expiryYear
          record.cvvNumber = input.cvvNumber
          record.billingAddress = input.billingAddress
          record.cardBrand = input.cardBrand
          record.cardLevel = input.cardLevel
          record.isPreferred = input.isPreferred

          if (_.isNull(record.stripeToken) || _.isEmpty(record.stripeToken)) {
            this._registerCreditCard(record).then((_result) => {
              record.stripeToken = _result.token
              record.stripeSource = _result.source
              record.save((error) => {
                if (error) {
                  resolve({status: 400, message: JSON.stringify(error)})
                }
                resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
              })
            })
          } else {
            record.save((error) => {
              if (error) {
                resolve({status: 400, message: JSON.stringify(error)})
              }
              resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
            })
          }
        } else {
          resolve({status: 400, message: 'no record found'})
        }
      })
    })
  }

  poemCheckOut(input?: PoemCheckOutInput): Promise<CustomResponse> {
    return new Promise(async (resolve, reject) => {
      // this.logger.info('--> poemCheckOut(): ' + JSON.stringify(input))
      this.activitiesSerivce.genrateInstallments(input.PatientId).then((result) => {
        // this.logger.info('--> poemCheckOut()')
        // this.logger.info(JSON.stringify(result))
        this.monthlyStatmentsService.genrateStatment(input.PatientId).then((monthlyStatement) => {
          this.paymentService
            .createPatientPayments(input.PatientId, monthlyStatement.resultId, input.CreditCards)
            .then((patientPayment) => {
              // resolve(monthlyStatement.resultId)
              resolve({status: 200, message: 'Data submitted successfully', resultId: monthlyStatement.resultId})
            })
        })
        // resolve(result)
      })
    })
  }

  private _patientStripeKey(patientId): Promise<string> {
    return new Promise((resolve, reject) => {
      // this.logger.info('--> _patientStripeKey(): getting patientDetailsMdl for PatientId: '+ patientId)
      patientDetailsMdl.find({PatientId: patientId}, (err, _patientDetails) => {
        var patientDetails = _patientDetails[0]
        // this.logger.info('--> _patientStripeKey(): checking for patientDetails.stripeKey: '+ patientDetails.stripeKey)
        if (_.isNull(patientDetails.stripeKey) || _.isEmpty(patientDetails.stripeKey)) {
          // this.logger.info('--> _patientStripeKey(): TRUE (it is EMPTY) email: '+ patientDetails.email)
          this.stripeService
            .registerCustomer(patientDetails.email, patientDetails.PatientId)
            .then((registeredKey) => {
              // this.logger.info('--> _patientStripeKey(): NEW registeredKey: '+ registeredKey)
              patientDetails.stripeKey = registeredKey
              // this.logger.info('--> _patientStripeKey(): saving patientDetails ')
              patientDetails.save((error) => {
                if (error) {
                  reject(JSON.stringify(error))
                }
                resolve(patientDetails.stripeKey)
              })
            })
        } else {
          this.logger.info(
            '--> _patientStripeKey(): got it NEW patientDetails.stripeKey: ' + patientDetails.stripeKey
          )
          resolve(patientDetails.stripeKey)
        }
      })
    })
  }

  private _registerCreditCard(creditCardInfo: PatientCreditCard): Promise<StripeKeys> {
    return new Promise(async (resolve, reject) => {
      var customerStripeId = await this._patientStripeKey(creditCardInfo.PatientId)

      this._patientStripeKey(creditCardInfo.PatientId).then((customerStripeId) => {
        this.logger.info('--> _registerCreditCard(): customerStripeId: ' + customerStripeId)

        this.stripeService
          .registerCustomerCreditCard(
            creditCardInfo.cardNumber,
            parseInt(creditCardInfo.expiryMonth),
            parseInt(creditCardInfo.expiryYear),
            creditCardInfo.cvvNumber,
            customerStripeId
          )
          .then((result) => {
            resolve(result)
          })
          .catch((err) => {
            reject(JSON.stringify(err))
            // Error
          })
      })
    })
  }
}
