import {
  UpdateProviderInput,
  AddProviderContactInput,
  AddProviderInput,
  Provider,
  ProviderBankAccount,
  CustomResponse,
  ProviderContact,
  ProviderCreditCard,
  ProviderEntity,
  AddProviderCreditCardInput,
  AddProviderBankAccountInput,
  DeleteProviderBankAccountInput,
  AddProviderEntityInput,
  DeleteProviderContactInput,
  DeleteProviderCreditCardInput,
  DeleteProviderEntityInput,
  UpdateProviderBankAccountInput,
  UpdateProviderCreditCardInput,
  UpdateProviderContactInput,
  UpdateProviderEntityInput
} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
import * as _ from 'lodash'

import * as providerBankAccountMdl from '../../ottoman/models/providerBankAccount.js'
import * as providerContactsMdl from '../../ottoman/models/providerContacts.js'
import * as providerCreditCardsMdl from '../../ottoman/models/providerCreditCards.js'
import * as providerEntitiesMdl from '../../ottoman/models/providerEntity.js'

import * as db from '../../sequelize/models/index'

import {CommonService} from '../CommonService'

@Injectable()
export class ProvidersService {
  // private commonService: CommonService = new CommonService(null)
  private commonService: CommonService
  private customResponse: CustomResponse = {status: 200, message: 'response message'}

  constructor(private logger: AbstractLogger) {
    this.commonService = new CommonService(logger)
  }

  public getProviderBankAccount(providerId?: string): Promise<ProviderBankAccount[]> {
    return new Promise((resolve, reject) => {
      providerBankAccountMdl.find({ProviderId: this.commonService.createHash(providerId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }
        resolve(returnObject)
      })
    })
  }

  public getProvider(id?: string): Promise<Provider> {
    this.logger.info('getPatient for: ' + id)

    return new Promise((resolve, reject) => {
      db['Provider']
        .findOne({where: {id: id}})
        .then((provider) => {
          if (!provider) {
            resolve({})
          } else {
            resolve(provider)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getProviderContacts(providerId?: string): Promise<ProviderContact[]> {
    this.logger.info('getPatientAddresses for: ' + providerId)

    return new Promise((resolve, reject) => {
      providerContactsMdl.find({ProviderId: this.commonService.createHash(providerId)}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }
        resolve(returnObject)
      })
    })
  }

  public getProvierCreditCards(providerId?: string): Promise<ProviderCreditCard[]> {
    this.logger.info('getProviderCreditCards for: ' + providerId)

    return new Promise((resolve, reject) => {
      providerCreditCardsMdl.find({ProviderId: this.commonService.createHash(providerId)}, function(
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

  public getProviderEntity(providerId?: string): Promise<ProviderEntity> {
    this.logger.info('getInsuranceInformation for: ' + providerId)

    return new Promise((resolve, reject) => {
      providerEntitiesMdl.find({ProviderId: this.commonService.createHash(providerId)}, function(
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

  public addProvierBankAccount(input?: AddProviderBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const accountInput = {
        ProviderId: this.commonService.createHash(input.ProviderId),
        nameOnAccount: input.nameOnAccount,
        routingNumber: input.routingNumber,
        accountNumber: input.accountNumber,
        accountType: input.accountType,
        address: input.address,
        depositAmount1: input.depositAmount1,
        depositAmount2: input.depositAmount2,
        accountVerified: input.accountVerified,
        accountVerifyDate: input.accountVerifyDate
      }

      providerBankAccountMdl.createAndSave(accountInput, (err, _accountDetail) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: _accountDetail._id.toString()})
        }
      })
    })
  }

  deleteProviderBankAccount(input?: DeleteProviderBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerBankAccountMdl.getById(input.ProviderBankAccountId, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.ProviderId})
          }
        })
      })
    })
  }
  addProvider(input?: AddProviderInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const providerInput = {
        PatientId: input.PatientId,
        institutionName: input.institutionName,
        businessAddressForNotices: input.businessAddressForNotices,
        taxId: input.taxId,
        npi: input.npi,
        institutionType: input.institutionType,
        ownerShip: input.ownerShip,
        phoneNumber: input.phoneNumber,
        paymentFrom: input.paymentFrom
      }
      db['Provider']
        .create(providerInput)
        .then((provider) => {
          if (!provider) {
            resolve({})
          } else {
            resolve({status: 200, message: 'Data submitted successfully', resultId: provider.id})
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  updateProvider(input?: UpdateProviderInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['Provider']
        .update(
          {
            PatientId: input.PatientId,
            institutionName: input.institutionName,
            businessAddressForNotices: input.businessAddressForNotices,
            taxId: input.taxId,
            npi: input.npi,
            institutionType: input.institutionType,
            ownerShip: input.ownerShip,
            phoneNumber: input.phoneNumber,
            paymentFrom: input.paymentFrom
          },
          {where: {id: input.id}} // where clause
        )
        .then((provider) => {
          resolve({status: 200, message: 'Provider changed successfully'})
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public addProvierContact(input?: AddProviderContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      var newType
      if (input.type !== '') {
        newType = input.type
      } else {
        newType = 'General'
      }
      const contactInput = {
        ProviderId: this.commonService.createHash(input.ProviderId),
        name: input.name,
        position: input.position,
        phoneNumber: input.phoneNumber,
        email: input.email,
        primaryParentId: input.primaryParentId,
        secondaryParentId: input.secondaryParentId,
        type: newType
      }

      providerContactsMdl.createAndSave(contactInput, (err, _contactDetail) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: _contactDetail._id.toString()})
        }
      })
    })
  }
  public addProviderCreditCard(input?: AddProviderCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      const creditCardInput = {
        ProviderId: this.commonService.createHash(input.ProviderId),
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
      providerCreditCardsMdl.createAndSave(creditCardInput, (err, _creditCardDetail) => {
        if (err) reject(err.toString())
        else {
          resolve({
            status: 200,
            message: 'Data submitted successfully',
            resultId: _creditCardDetail._id.toString()
          })
        }
      })
    })
  }
  public addProviderEntity(input?: AddProviderEntityInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      var newType
      if (input.type !== '') {
        newType = input.type
      } else {
        newType = 'ProviderEntity'
      }
      const entityInput = {
        ProviderId: this.commonService.createHash(input.ProviderId),
        npi: input.npi,
        name: input.name,
        entityType: input.entityType,
        type: newType
      }

      providerEntitiesMdl.createAndSave(entityInput, (err, _entityDetail) => {
        if (err) reject(err.toString())
        else {
          resolve({status: 200, message: 'Data submitted successfully', resultId: _entityDetail._id.toString()})
        }
      })
    })
  }
  deleteProviderContact(input?: DeleteProviderContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerContactsMdl.getById(input.ProviderContactId, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.ProviderId})
          }
        })
      })
    })
  }
  deleteProviderCreditCard(input?: DeleteProviderCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerCreditCardsMdl.getById(input.ProviderCreditCardId, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.ProviderId})
          }
        })
      })
    })
  }
  deleteProviderEntity(input?: DeleteProviderEntityInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerEntitiesMdl.getById(input.ProviderEntityId, function(error, result) {
        if (error) {
          reject(error.toString())
        }
        result.remove(function(error) {
          if (error) reject(error.toString())
          else {
            resolve({status: 200, message: 'Record removed successfully', resultId: input.ProviderId})
          }
        })
      })
    })
  }
  updateBankAccount(input?: UpdateProviderBankAccountInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerBankAccountMdl.getById(input.ProviderId, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.nameOnAccount = input.nameOnAccount
          record.routingNumber = input.routingNumber
          record.accountNumber = input.accountNumber
          record.accountType = input.accountType
          record.address = input.address
          record.depositAmount1 = input.depositAmount1
          record.depositAmount2 = input.depositAmount2
          record.accountVerified = input.accountVerified
          record.accountVerifyDate = input.accountVerifyDate

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

  updateCreditCard(input?: UpdateProviderCreditCardInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerCreditCardsMdl.getById(input.ProviderId, (err, record) => {
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

  updateContact(input?: UpdateProviderContactInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerContactsMdl.getById(input.ProviderId, (err, record) => {
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
  updateEntity(input?: UpdateProviderEntityInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      providerEntitiesMdl.getById(input.ProviderId, (err, record) => {
        if (err) reject(err.toString())
        else {
          record.npi = input.npi
          record.name = input.name
          record.entityType = input.entityType
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
