import {
  CustomResponse,
  Payer,
  PayerBankAccount,
  PayerContact,
  AddPayerBankAccountInput,
  AddPayerContactInput,
  DeletePayerBankAccountInput,
  DeletePayerContactInput,
  UpdatePayerContactInput,
  UpdatePayerBankAccountInput,
  AddPayerInput,
  UpdatePayerInput
} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
import * as _ from 'lodash'

import * as payerBankAccountsMdl from '../../ottoman/models/payerBankAccounts.js'
import * as payerContactsMdl from '../../ottoman/models/payerContacts.js'
import * as db from '../../sequelize/models/index'

import {CommonService} from '../CommonService'

@Injectable()
export class PayersService {
  private commonService: CommonService
  private customResponse: CustomResponse = {status: 200, message: 'response message'}
  constructor(private logger: AbstractLogger) {
    this.commonService = new CommonService(logger)
  }

  public getPayerBankAccount(payerId?: string): Promise<PayerBankAccount[]> {
    return new Promise((resolve, reject) => {
      payerBankAccountsMdl.find({PayerId: this.commonService.createHash(payerId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }
        resolve(returnObject)
      })
    })
  }

  public getPayer(id?: string): Promise<Payer> {
    this.logger.info('getPayer for: ' + id)

    return new Promise((resolve, reject) => {
      db['Payer']
        .findOne({where: {id: id}})
        .then((payer) => {
          if (!payer) {
            resolve({})
          } else {
            resolve(payer)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getPayerContacts(payerId?: string): Promise<PayerContact[]> {
    this.logger.info('getPayerContacts for: ' + payerId)

    return new Promise((resolve, reject) => {
      payerContactsMdl.find({PayerId: this.commonService.createHash(payerId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }
        resolve(returnObject)
      })
    })
  }

  addPayer(input?: AddPayerInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const _input = {
        PatientId: input.PatientId,
        institutionName: input.institutionName,
        address: input.address,
        taxID: input.taxID,
        licenseNumber: input.licenseNumber,
        institutionType: input.institutionType,
        phoneNumber: input.phoneNumber,
        ownership: input.ownership
        // attachments:input.attachments
      }
      console.log(input.address)
      db['Payer']
        .create(_input)
        .then((payer) => {
          if (!payer) {
            resolve({})
          } else {
            resolve({status: 200, message: 'Data submitted successfully', resultId: payer.id})
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  updatePayer(input?: UpdatePayerInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['Payer']
        .update(
          {
            PatientId: input.PatientId,
            institutionName: input.institutionName,
            address: input.address,
            taxID: input.taxID,
            licenseNumber: input.licenseNumber,
            institutionType: input.institutionType,
            phoneNumber: input.phoneNumber,
            ownership: input.ownership
          },
          {where: {id: input.id}} // where clause
        )
        .then((payer) => {
          resolve({status: 200, message: 'Provider changed successfully', resultId: payer.address})
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public addPayerBankAccount(input?: AddPayerBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const _input = {
        PayerId: this.commonService.createHash(input.PayerId),
        nameOfAccount: input.nameOfAccount,
        routingNumber: input.routingNumber,
        accountNumber: input.accountNumber,
        accountType: input.accountType,
        address: input.address
      }

      payerBankAccountsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deletePayerBankAccount(input?: DeletePayerBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      payerBankAccountsMdl.getById(input._id, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.PayerId})
          }
        })
      })
    })
  }

  updatePayerBankAccount(input?: UpdatePayerBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      payerBankAccountsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.nameOfAccount = input.nameOfAccount
          record.routingNumber = input.routingNumber
          record.accountNumber = input.accountNumber
          record.accountType = input.accountType
          record.address = input.address

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

  public addPayerContact(input?: AddPayerContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const _input = {
        PayerId: this.commonService.createHash(input.PayerId),
        name: input.name,
        position: input.position,
        phoneNumber: input.phoneNumber,
        email: input.email,
        isPrimary: input.isPrimary,
        type: input.type,
        isSecondary: input.isSecondary
      }
      payerContactsMdl.createAndSave(_input, (err, result) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
        }
      })
    })
  }

  deletePayerContact(input?: DeletePayerContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      payerContactsMdl.getById(input._id, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.PayerId})
          }
        })
      })
    })
  }

  updatePayerContact(input?: UpdatePayerContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      payerContactsMdl.getById(input._id, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.name = input.name
          record.position = input.position
          record.phoneNumber = input.phoneNumber
          record.email = input.email
          record.isPrimary = input.isPrimary
          record.isSecondary = input.isSecondary
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
}
