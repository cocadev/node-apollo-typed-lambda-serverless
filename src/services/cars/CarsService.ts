import {Car} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'

import {StripeService} from '../payments/StripeService'

@Injectable()
export class CarsService {
  private carList: Car[] = [{_id: '1234', name: 'sampleCar1'}, {_id: '1244', name: 'sampleCar2'}]
  private stripeService: StripeService

  constructor(private logger: AbstractLogger) {
    this.stripeService = new StripeService(logger)
  }

  public getCars(carName?: string): Promise<Car[]> {
    this.logger.info('Returning all cars...')

    return new Promise((resolve) => {
      let filteredCarsList
      if (carName) {
        filteredCarsList = this.carList.filter((car) => car.name === carName)
        resolve(filteredCarsList)
      } else {
        resolve(this.carList)
      }
    })
  }

  public updateCarName(_id: string, newName: string): Promise<Car> {
    return new Promise((resolve) => {
      for (const car of this.carList) {
        if (car._id === _id) {
          car.name = newName
          resolve(car)

          return
        }
      }
      resolve({})
    })
  }

  public stripeTest(): Promise<string> {
    return new Promise((resolve) => {
      this.stripeService
        .chargeCustomerOnStripe('123', 'Charge Customer description', 'cus_GTr5wxJMXTNFf2')
        // this.stripeService.chargeCustomerSourceOnStripe('120', "Some description here", "card_1FyBBLFQAqQTMEe1Mm0kZUl7", 'cus_GTr5wxJMXTNFf2')
        // this.stripeService.registerCustomerCreditCard('4012888888881881', 12, 2020, '333', "cus_GTr5wxJMXTNFf2" )
        // this.stripeService.getCustomerFromStripe("cus_GTr5wxJMXTNFf2")
        // this.stripeService.registerCustomer("email01@email.com", "full name01")

        .then((result) => {
          resolve(result)
        })
    })
  }
}
