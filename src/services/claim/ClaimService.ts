import {
  CustomResponse,
  CreateEstimatedClaimInput,
  UpdateEstimatedClaimInput,
  CreateFinalClaimInput,
  UpdateFinalClaimInput,
  ClaimDetail,
  Claim
} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
import * as _ from 'lodash'
import * as moment from 'moment'

import * as db from '../../sequelize/models/index'

import {CommonService} from '../CommonService'
import {ActivitiesSerivce} from '../payments/ActivitiesSerivce'
import * as claimDetailsMdl from '../../ottoman/models/claimDetails'
import * as claimHistoriesMdl from '../../ottoman/models/claimHistories'
@Injectable()
export class ClaimService {
  private commonService: CommonService
  private activitiesSerivce: ActivitiesSerivce
  constructor(private logger: AbstractLogger) {
    this.commonService = new CommonService(logger)
    this.activitiesSerivce = new ActivitiesSerivce(logger)
  }
  private createClaim(input: object, dateInput: object): Promise<CustomResponse> {
    //input : input for Claim, dateInput for ClaimDetails
    return new Promise((resolve, reject) => {
      db['Claim']
        .create(input)
        .then((claim) => {
          if (!claim) {
            // if result of creation is false
            resolve({})
          } else {
            // if success
            Object.assign(dateInput, {ClaimId: this.commonService.createHash(claim.id)}) // add the new claimId for creating a new record of claimdetails
            console.log(dateInput)
            claimDetailsMdl.createAndSave(dateInput, (err, result) => {
              if (err) reject(err.toString())
              else {
                resolve({status: 200, message: 'Data submitted successfully', resultId: result._id})
              }
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  createEstimatedClaim(input?: CreateEstimatedClaimInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      this.activitiesSerivce
        .createActivity(input.PatientId, 'Estimated Claim', 0, input.total, 0, 0) // at first create the new activity and get the id
        .then((activity) => {
          if (activity.status == 200) {
            var id = activity.resultId // get the activityId for creating new claim
          }
          const _input = {
            // input data for new claim creation
            PatientId: input.PatientId,
            ProviderId: input.ProviderId,
            ActivityId: id, // this id is activityId that created newly
            providerEntityId: input.providerEntityId,
            billingEntityId: input.billingEntityId,
            coPay: input.coPay,
            deductible: input.deductible,
            coInsurance: input.coInsurance,
            selfPay: input.selfPay,
            total: input.total,
            isOutOfNetwork: input.isOutOfNetwork
          }
          const dateInput = {
            // input data for new Claimdetail
            dateOfAppointment: new Date(input.dateOfAppointment),
            dateOfServiceFrom: new Date(input.dateOfServiceFrom),
            dateOfServiceTo: new Date(input.dateOfServiceTo)
          }
          this.createClaim(_input, dateInput).then((claim) => {
            console.log('success')
            console.log(claim)
            resolve({status: 200, message: 'Creating Data submitted successfully'})
          })
        })
    })
  }

  updateEstimatedClaim(input?: UpdateEstimatedClaimInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['Claim']
        .update(
          {
            // update the claim based on ClaimId
            coPay: input.coPay,
            deductible: input.deductible,
            coInsurance: input.coInsurance,
            selfPay: input.selfPay,
            total: input.total,
            isOutOfNetwork: input.isOutOfNetwork
          },
          {where: {id: input.ClaimId}}
        )
        .then((result) => {
          db['Claim']
            .find({id: input.ClaimId}) // find the update record
            .then((claim) => {
              var ActivityId = claim.ActivityId // get the activityId for updating activity
              console.log(ActivityId)
              claimDetailsMdl.find({ClaimId: claim.id}, (err, returnObject) => {
                //get the claimDetail by ClaimId
                if (err) {
                  reject(err.toString())
                }
                if (returnObject.length > 0) {
                  // if claimdetaile exists
                  var claimDetail = returnObject[0]
                  claimDetail.dateOfAppointment = new Date(input.dateOfAppointment) // update the claimdetail
                  claimDetail.dateOfServiceFrom = new Date(input.dateOfServiceFrom)
                  claimDetail.dateOfServiceTo = new Date(input.dateOfServiceTo)
                  claimDetail.save((error) => {
                    if (error) {
                      reject(err.toString())
                    } else this.activitiesSerivce.updateActivity(ActivityId, 0, input.total, 0, 0) //update activity by claim.activityId
                    resolve({status: 200, message: '--Data updated successfully'})
                  })
                }
              })
            })
        })
    })
  }
  createFinalClaim(input?: CreateFinalClaimInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['Claim']
        .findOne({
          // check if the claim that match the condition 1 exists
          where: {
            PatientId: input.PatientId,
            providerEntityId: input.providerEntityId,
            billingEntityId: input.billingEntityId
          }
        })
        .then((claim) => {
          if (!claim) {
            console.log('estimatedClaim not exist !')
            resolve({message: 'claim not exist !'}) // no match with condition 1
          } else {
            claimDetailsMdl.find(
              {ClaimId: claim.id, dateOfServiceFrom: new Date(input.dateOfServiceFrom)}, // check the condition 2
              (err, returnObject) => {
                if (err) {
                  reject(err.toString())
                }
                if (returnObject.length > 0) {
                  // if match the condition
                  console.log(returnObject[0])
                  claim.isActive = false
                  claim.save().then(() => {
                    //update claim with isActive = false
                    console.log('success upadate claim')
                  })
                  db['Activity'] //update activity with isActive = false
                    .update(
                      {
                        isActive: false
                      },
                      {where: {id: claim.ActivityId}}
                    )
                    .then((activity) => {
                      if (activity) console.log('IsActive is set as false')
                    })
                  db['ActivityInstallment'] //update ActivityInstallment with isActive = false
                    .update(
                      {
                        isActive: false
                      },
                      {where: {ActivityId: claim.ActivityId}}
                    )
                    .then((activityInstallment) => {
                      if (activityInstallment) console.log('IsActive of installment is set as false')
                    })
                  this.activitiesSerivce
                    .createActivity(input.PatientId, 'Final Claim', 0, input.total, 0, 0) // create activity
                    .then((activity) => {
                      const _input = {
                        // input data for creating new claim
                        PatientId: input.PatientId,
                        ProviderId: input.ProviderId,
                        ActivityId: activity.resultId, //new activityId
                        estimatedCoPay: claim.coPay,
                        diffCoPay: input.coPay - claim.coPay,
                        estimatedDeductible: claim.estimatedDeductible,
                        diffDeductible: input.deductible - claim.deductible,
                        estimatedCoInsurance: claim.coInsurance,
                        diffCoInsurance: input.coInsurance - claim.coInsurance,
                        estimatedSelfPay: claim.selfPay,
                        diffSelfPay: input.selfPay - claim.selfPay,
                        claimType: 'Final'
                      }
                      const dataInput = {
                        // input data for creating new claimdetail
                        dateOfAppointment: new Date(input.dateOfAppointment),
                        dateOfServiceFrom: new Date(input.dateOfServiceFrom),
                        dateOfServiceTo: new Date(input.dateOfServiceTo)
                      }
                      this.createClaim(_input, dataInput).then((claim) => {
                        resolve({status: 200, message: '---Data updated successfully'})
                      })
                    })
                }
              }
            )
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  updateFinalClaim(input?: UpdateFinalClaimInput): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      db['Claim'].findById(input.ClaimId).then((claim) => {
        //get the claim data by id
        if (!claim) {
          resolve({message: 'claim with ClaimId not exist !'})
        } else {
          const newInput = {
            // input data for creating new claimhistory
            coPay: claim.coPay,
            deductible: claim.deductible,
            coInsurance: claim.coInsurance,
            outOfNetwork: claim.outOfNetwork,
            notCovered: claim.notCovered,
            noPriorAuthorization: claim.noPriorAuthorization,
            denied: claim.denied,
            total: claim.total,
            charity: claim.charity,
            writeOff: claim.writeOff,
            rebate: claim.rebate,
            coupon: claim.coupon,
            other: claim.other
          }

          claimHistoriesMdl.createAndSave(newInput, (err, result) => {
            //create new claimhistory
            if (err) reject(err.toString())
            else {
              console.log('history saving success')
              console.log(claim)
              if (input.outOfNetwork < claim.outOfNetwork && input.isHeartFlag == true) {
                var flag = true // variable for isHeartFlag
              } else if (input.outOfNetwork > claim.outOfNetwork) {
                flag = false
              } else {
                flag = input.isHeartFlag
              }
              claim.coPay = input.coPay
              claim.deductible = input.deductible
              claim.coInsurance = input.coInsurance
              claim.isHeartFlag = flag // isHeartFlag that changed by condition
              claim.save().then(() => {
                claimDetailsMdl.find({ClaimId: this.commonService.createHash(claim.id)}, (err, returnObject) => {
                  if (err) {
                    reject(err.toString())
                  }
                  if (returnObject.length > 0) {
                    var claimDetail = returnObject[0] // update the claimdetail wiht input data
                    claimDetail.outOfNetwork = input.outOfNetwork
                    claimDetail.notCovered = input.notCovered
                    claimDetail.noPriorAuthorization = input.noPriorAuthorization
                    claimDetail.denied = input.denied
                    claimDetail.charity = input.charity
                    claimDetail.writeOff = input.writeOff
                    claimDetail.rebate = input.rebate
                    claimDetail.coupon = input.coupon
                    claimDetail.other = input.other
                    claimDetail.selfNote = input.selfNote
                    claimDetail.save((error) => {
                      if (error) {
                        reject(err.toString())
                      } else {
                        this.activitiesSerivce.updateFinalClaimActivity(claim.id)
                        console.log('success')
                        resolve({status: 200, message: 'Data updated successfully'})
                      }
                    })
                  } else {
                    resolve({message: 'ClaimDetail is not exits'})
                  }
                })
              })
            }
          })
        }
      })
    })
  }

  public claimsForApp(patientId?: string, lastUpdate?: string): Promise<Claim[]> {
    return new Promise((resolve, reject) => {
      var whereClause = {}
      if (!_.isEmpty(lastUpdate) && !_.isNull(lastUpdate)) {
        //whereClause = {PatientId: patientId, updatedAt: {$gte: moment(lastUpdate, "YYYY-mm-dd").format("YYYY-mm-dd")}}
        whereClause = {PatientId: patientId, updatedAt: {$gte: lastUpdate}}
      } else whereClause = {PatientId: patientId}

      db['Claim']
        .find({where: whereClause})
        .then((claims) => {
          if (!claims) {
            resolve([{}])
          } else {
            resolve(claims)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public getClaim(id?: string): Promise<Claim> {
    this.logger.info('getEmployer for: ' + id)

    return new Promise((resolve, reject) => {
      db['Claim']
        .findOne({where: {id: id}})
        .then((claim) => {
          if (!claim) {
            resolve({})
          } else {
            resolve(claim)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  public getClaimDetail(claimId?: string): Promise<ClaimDetail> {
    this.logger.info('getClaimDetail for: ' + claimId)

    return new Promise((resolve, reject) => {
      //claimDetailsMdl.find({ClaimId: this.commonService.createHash(claimId)}, (err, returnObject) => {
      claimDetailsMdl.find({ClaimId: claimId}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        resolve(returnObject[0])
      })
    })
  }
}
