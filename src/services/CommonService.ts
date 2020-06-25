import {AbstractLogger} from '../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
import md5 from 'md5-hash'
import * as _ from 'lodash'

// import {patientDetailModel} from '../mongoose/models'
import * as patientDetailsMdl from '../ottoman/models/patientDetails.js'

import * as db from '../sequelize/models/index'

@Injectable()
export class CommonService {
  // private customerList: Customer[] = []
  constructor(private logger: AbstractLogger) {}

  public usernameAvailable(username?: string): Promise<boolean> {
    this.logger.info('CommonService - usernameAvailable username: ' + username)

    return new Promise((resolve, reject) => {
      // Check in Patients table
      db['Patient']
        .findOne({where: {username: username}})
        .then((patient) => {
          // if(!_.isNull(patient)){
          if (patient) {
            // username already registered in Patients table
            resolve(false)
          } else {
            // Check in TempRegistration table
            db['TempRegistration']
              .findOne({where: {username: username}})
              .then((tempRegister) => {
                // if(!_.isNull(tempRegister)){
                if (tempRegister) {
                  // username already registered in TempRegistration table
                  resolve(false)
                } else {
                  // username available
                  resolve(true)
                }
              })
              .catch((error) => {
                reject(error)
              })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public mobileAvailable(mobile?: string): Promise<boolean> {
    this.logger.info('CommonService - mobileAvailable mobile: ' + mobile)

    return new Promise((resolve, reject) => {
      // Check in TempRegistrations table
      db['TempRegistration']
        .findOne({where: {mobileNumber: mobile}})
        .then((patient) => {
          if (patient) {
            this.logger.info('CommonService - mobileAvailable mobile: TempRegistration FOUND')
            // mobileNumber already registered in TempRegistrations table
            resolve(false)
          } else {
            // Check in PatientDetails (NoSQL)
            patientDetailsMdl.find({mobileNumber: mobile}, (err, returnObject) => {
              if (err) {
                reject(err.toString())
              }

              if (returnObject.length > 0) {
                // mobile already registered
                resolve(false)
              } else {
                // mobile available
                resolve(true)
              }
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public emailAvailable(email?: string): Promise<boolean> {
    this.logger.info('CommonService - emailAvailable for email: ' + email)

    return new Promise((resolve, reject) => {
      // Check in PatientDetails (NoSQL)
      patientDetailsMdl.find({email: email}, function(err, returnObject) {
        if (err) {
          reject(err.toString())
        }
        if (returnObject.length > 0) {
          // email already registered
          resolve(false)
        } else {
          // email available
          resolve(true)
        }
      })
    })
  }

  public createHash(input?: string): string {
    this.logger.info('createHash: ' + input)
    if (_.isString(input)) return md5(input)
    else return md5(input.toString())
  }

  public createOTP(): string {
    var otp = Math.ceil(Math.random() * 10000)
    this.logger.info('createOTP: ' + otp)

    return otp.toString()
  }
}
