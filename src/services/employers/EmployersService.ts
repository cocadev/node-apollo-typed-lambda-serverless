import {
  CustomResponse,
  EmployeeImportLogDetail,
  Employer,
  EmployerBankAccount,
  EmployerContact,
  EmployerCreditCard,
  EmployeeImportLog,
  EmployerEmployeePool,
  AddEmployerBankAccountInput,
  DeleteEmployerBankAccountInput,
  UpdateEmployerBankAccountInput,
  AddEmployerContactInput,
  DeleteEmployerContactInput,
  UpdateEmployerContactInput,
  AddEmployerCreditCardInput,
  DeleteEmployerCreditCardInput,
  UpdateEmployerCreditCardInput,
  AddEmployeeImportLogInput,
  DeleteEmployeeImportLogInput,
  UpdateEmployeeImportLogInput,
  AddEmployeeImportLogDetailInput,
  DeleteEmployeeImportLogDetailInput,
  UpdateEmployeeImportLogDetailInput,
  AddEmployerEmployeePoolInput,
  DeleteEmployerEmployeePoolInput,
  UpdateEmployerEmployeePoolInput,
  AddEmployerInput,
  UpdateEmployerInput
} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
import * as _ from 'lodash'

import * as employerBankAccountsMdl from '../../ottoman/models/employerBankAccounts.js'
import * as employerContactsMdl from '../../ottoman/models/employerContacts.js'
import * as employerCreditCardsMdl from '../../ottoman/models/employerCreditCards.js'
import * as employeeImportLogsMdl from '../../ottoman/models/employeeImportLogs.js'
import * as employeeImportLogDetailsMdl from '../../ottoman/models/employeeImportLogDetails.js'
import * as employerEmployeePoolsMdl from '../../ottoman/models/employerEmployeePools.js'

import * as db from '../../sequelize/models/index'

import {CommonService} from '../CommonService'

@Injectable()
export class EmployersService {
  // private commonService: CommonService = new CommonService(null)
  private commonService: CommonService
  private customResponse: CustomResponse = {status: 200, message: 'response message'}

  constructor(private logger: AbstractLogger) {
    this.commonService = new CommonService(logger)
  }

  public getEmployerBankAccount(employerId?: string): Promise<EmployerBankAccount[]> {
    return new Promise((resolve, reject) => {
      employerBankAccountsMdl.find(
        {EmployerId: this.commonService.createHash(employerId)},
        (err, returnObject) => {
          if (err) {
            reject(err.toString())
          }
          resolve(returnObject)
        }
      )
    })
  }

  public getEmployer(id?: string): Promise<Employer> {
    this.logger.info('getEmployer for: ' + id)

    return new Promise((resolve, reject) => {
      db['Employer']
        .findOne({where: {id: id}})
        .then((employer) => {
          if (!employer) {
            resolve({})
          } else {
            resolve(employer)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getEmployerContacts(employerId?: string): Promise<EmployerContact[]> {
    this.logger.info('getEmployerContacts for: ' + employerId)

    return new Promise((resolve, reject) => {
      employerContactsMdl.find({EmployerId: this.commonService.createHash(employerId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }
        resolve(returnObject)
      })
    })
  }

  public getEmployerCreditCards(employerId?: string): Promise<EmployerCreditCard[]> {
    this.logger.info('getEmployerCreditCards for: ' + employerId)

    return new Promise((resolve, reject) => {
      employerCreditCardsMdl.find({EmployerId: this.commonService.createHash(employerId)}, function(
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

  public getEmployeeImportLog(employerId?: string): Promise<EmployeeImportLog> {
    this.logger.info('getEmployeeImportLog for: ' + employerId)

    return new Promise((resolve, reject) => {
      employeeImportLogsMdl.find({EmployerId: this.commonService.createHash(employerId)}, function(
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

  public getEmployeeImportLogDetail(employerId?: string): Promise<EmployeeImportLogDetail> {
    this.logger.info('getEmployeeImportLogDetail for: ' + employerId)

    return new Promise((resolve, reject) => {
      employeeImportLogDetailsMdl.find({EmployerId: this.commonService.createHash(employerId)}, function(
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

  public getEmployerEmployeePool(employerId?: string): Promise<EmployerEmployeePool> {
    this.logger.info('getEmployerEmployeePool for: ' + employerId)

    return new Promise((resolve, reject) => {
      employerEmployeePoolsMdl.find({EmployerId: this.commonService.createHash(employerId)}, function(
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
  addEmployer(input?: AddEmployerInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const employerInput = {
        PatientId: input.PatientId,
        institutionName: input.institutionName,
        address: input.address,
        taxID: input.taxID,
        phoneNumber: input.phoneNumber
      }
      console.log(input.address)
      db['Employer']
        .create(employerInput)
        .then((employer) => {
          if (!employer) {
            resolve({})
          } else {
            resolve({status: 200, message: 'Data submitted successfully', resultId: employer.id})
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  updateEmployer(input?: UpdateEmployerInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['Provider']
        .update(
          {
            PatientId: input.PatientId,
            institutionName: input.institutionName,
            address: input.address,
            taxID: input.taxID,
            phoneNumber: input.phoneNumber
          },
          {where: {id: input.id}} // where clause
        )
        .then((employer) => {
          resolve({status: 200, message: 'Provider changed successfully', resultId: employer.address})
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public addEmployerBankAccount(input?: AddEmployerBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const _input = {
        EmployerId: this.commonService.createHash(input.EmployerId),
        nameOfAccount: input.nameOfAccount,
        routingNumber: input.routingNumber,
        accountNumber: input.accountNumber,
        accountType: input.accountType,
        address: input.address
      }

      employerBankAccountsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deleteEmployerBankAccount(input?: DeleteEmployerBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerBankAccountsMdl.getById(input._id, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.EmployerId})
          }
        })
      })
    })
  }

  updateEmployerBankAccount(input?: UpdateEmployerBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerBankAccountsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.nameOfAccount = input.nameOfAccount
          record.routingNumber = input.routingNumber
          record.accountNumber = input.accountNumber
          record.accountType = input.accountType
          record.address = input.address
          console.log(input.nameOfAccount)
          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
          })
        }
      })
    })
  }

  public addEmployerContact(input?: AddEmployerContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      var newType
      if (input.type !== '') {
        newType = input.type
      } else {
        newType = 'General'
      }
      const _input = {
        EmployerId: this.commonService.createHash(input.EmployerId),
        name: input.name,
        position: input.position,
        phoneNumber: input.phoneNumber,
        email: input.email,
        primaryParentId: input.primaryParentId,
        type: newType,
        secondaryParentId: input.secondaryParentId
      }
      employerContactsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deleteEmployerContact(input?: DeleteEmployerContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerContactsMdl.getById(input._id, function(error, result) {
        if (error) {
          console.log('An error happened -&gt; ' + JSON.stringify(error))
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.EmployerId})
          }
        })
      })
    })
  }

  updateEmployerContact(input?: UpdateEmployerContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerContactsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.name = input.name
          record.position = input.position
          record.phoneNumber = input.phoneNumber
          record.email = input.email
          record.primaryParentId = input.primaryParentId
          record.secondaryParentId = input.secondaryParentId
          record.type = input.type
          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
          })
        }
      })
    })
  }
  public addEmployerCreditCard(input?: AddEmployerCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const _input = {
        EmployerId: this.commonService.createHash(input.EmployerId),
        cardType: input.cardType,
        nameOnCard: input.nameOnCard,
        cardNumber: input.cardNumber,
        expiryMonth: input.expiryMonth,
        expiryYear: input.expiryYear,
        cvvNumber: input.cvvNumber,
        billingAddress: input.billingAddress,
        cardBrand: input.cardBrand,
        cardLevel: input.cardLevel
      }
      employerCreditCardsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deleteEmployerCreditCard(input?: DeleteEmployerCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerCreditCardsMdl.getById(input._id, function(error, result) {
        if (error) {
          console.log('An error happened -&gt; ' + JSON.stringify(error))
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.EmployerId})
          }
        })
      })
    })
  }

  updateEmployerCreditCard(input?: UpdateEmployerCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerCreditCardsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.cardType = input.cardType
          record.nameOnCard = input.nameOnCard
          record.cardNumber = input.cardNumber
          record.expiryMonth = input.expiryMonth
          record.expiryYear = input.expiryYear
          record.cvvNumber = input.cvvNumber
          record.billingAddress = input.billingAddress
          record.cardBrand = input.cardBrand
          record.cardLevel = input.cardLevel
          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
          })
        }
      })
    })
  }
  public addEmployeeImportLog(input?: AddEmployeeImportLogInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      var status
      if (input.paymentStatus !== '') {
        status = input.paymentStatus
      } else {
        status = 'Default'
      }
      const _input = {
        EmployerId: this.commonService.createHash(input.EmployerId),
        dateOfImport: input.dateOfImport,
        totalPrePay: input.totalPrePay,
        totalPpi: input.totalPpi,
        totalSelfPay: input.totalSelfPay,
        totalAmount: input.totalAmount,
        paymentStatus: status,
        s3File: input.s3File,
        error_position: input.error_position,
        error_email: input.error_email,
        error_phone: input.error_phone
      }

      employeeImportLogsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deleteEmployeeImportLog(input?: DeleteEmployeeImportLogInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employeeImportLogsMdl.getById(input._id, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.EmployerId})
          }
        })
      })
    })
  }

  updateEmployeeImportLog(input?: UpdateEmployeeImportLogInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employeeImportLogsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.dateOfImport = input.dateOfImport
          record.totalPrePay = input.totalPrePay
          record.totalPpi = input.totalPpi
          record.totalSelfPay = input.totalSelfPay
          record.totalAmount = input.totalAmount
          record.paymentStatus = input.paymentStatus
          record.s3File = input.s3File
          record.error_name = input.error_name
          record.error_position = input.error_position
          record.error_email = input.error_email
          record.error_phone = input.error_phone
          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
          })
        }
      })
    })
  }
  public addEmployeeImportLogDetail(input?: AddEmployeeImportLogDetailInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const _input = {
        EmployerId: this.commonService.createHash(input.EmployerId),
        EmployeeImportLogId: input.EmployeeImportLogId,
        title: input.title,
        firstName: input.firstName,
        middleName: input.middleName,
        lastName: input.lastName,
        suffix: input.suffix,
        dateOfBirth: input.dateOfBirth,
        ssn: input.ssn,
        prePay: input.prePay,
        ppi: input.ppi,
        selfPay: input.selfPay,
        stopDate: input.stopDate
      }

      employeeImportLogDetailsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deleteEmployeeImportLogDetail(input?: DeleteEmployeeImportLogDetailInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employeeImportLogDetailsMdl.getById(input._id, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.EmployerId})
          }
        })
      })
    })
  }

  updateEmployeeImportLogDetail(input?: UpdateEmployeeImportLogDetailInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employeeImportLogDetailsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.EmployeeImportLogId = input.EmployeeImportLogId
          record.title = input.title
          record.firstName = input.firstName
          record.middleName = input.middleName
          record.lastName = input.lastName
          record.suffix = input.suffix
          record.dateOfBirth = input.dateOfBirth
          record.ssn = input.ssn
          record.prePay = input.prePay
          record.ppi = input.ppi
          record.selfPay = input.selfPay
          record.stopDate = input.stopDate
          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
          })
        }
      })
    })
  }

  public addEmployerEmployeePool(input?: AddEmployerEmployeePoolInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const _input = {
        EmployerId: this.commonService.createHash(input.EmployerId),
        EmployeeImportLogId: input.EmployeeImportLogId,
        title: input.title,
        firstName: input.firstName,
        middleName: input.middleName,
        lastName: input.lastName,
        suffix: input.suffix,
        dateOfBirth: input.dateOfBirth,
        ssn: input.ssn,
        prePay: input.prePay,
        ppi: input.ppi,
        selfPay: input.selfPay,
        stopDate: input.stopDate
      }

      employerEmployeePoolsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deleteEmployerEmployeePool(input?: DeleteEmployerEmployeePoolInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerEmployeePoolsMdl.getById(input._id, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.EmployerId})
          }
        })
      })
    })
  }

  updateEmployerEmployeePool(input?: UpdateEmployerEmployeePoolInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      employerEmployeePoolsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.EmployeeImportLogId = input.EmployeeImportLogId
          record.title = input.title
          record.firstName = input.firstName
          record.middleName = input.middleName
          record.lastName = input.lastName
          record.suffix = input.suffix
          record.dateOfBirth = input.dateOfBirth
          record.ssn = input.ssn
          record.prePay = input.prePay
          record.ppi = input.ppi
          record.selfPay = input.selfPay
          record.stopDate = input.stopDate
          record.save((error) => {
            if (error) {
              resolve({status: 400, message: JSON.stringify(error)})
            }
            resolve({status: 200, message: 'Data submitted successfully', resultId: record._id})
          })
        }
      })
    })
  }
}
