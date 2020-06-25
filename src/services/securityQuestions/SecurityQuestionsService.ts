import {SecurityQuestion} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
// import * as db from '../../ottoman/db.js'

// import {patientDetailsMdl} from '../../mongoose/models'
import * as patientDetailsMdl from '../../ottoman/models/patientDetails.js'

@Injectable()
export class SecurityQuestionsService {
  constructor(private logger: AbstractLogger) {}

  public getSecurityQuestions(): Promise<SecurityQuestion[]> {
    this.logger.info('SecurityQuestion for: ')

    return new Promise((resolve, reject) => {
      patientDetailsMdl.find({}, (err, returnObject) => {
        if (err) {
          reject(err.toString())
        }

        resolve(returnObject)
      })
    })
  }

  public addRecord(question: string): Promise<SecurityQuestion> {
    return new Promise((resolve, reject) => {
      resolve({})
      // new patientDetailsMdl({question: question}).save((err, returnObject) => {
      //   if (err) reject(err.toString())
      //   else {
      //     resolve(returnObject)
      //   }
      // })
    })
  }
}
