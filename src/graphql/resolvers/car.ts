import {QueryCarArgs, Car, MutationUpdateCarNameArgs} from '../../interfaces/types'
import {CarsService} from '../../services/cars/CarsService'
import {IAppContext} from '../../interfaces/IAppContext'

const resolveFunctions = {
  Query: {
    car(_, args: QueryCarArgs, context: IAppContext): Promise<Car[]> {
      const carsService: CarsService = context.carsService
      console.log('Resover for cars')

      return carsService.getCars(args.name)
    },

    stripeTest(_, args, context: IAppContext): Promise<string> {
      const carsService: CarsService = context.carsService
      console.log('Resover for stripeTest')

      return carsService.stripeTest()
    }
  },

  Mutation: {
    updateCarName(_, args: MutationUpdateCarNameArgs, context: IAppContext): Promise<Car> {
      const carsService: CarsService = context.carsService

      return carsService.updateCarName(args._id, args.newName)
    }
  }
}

export default resolveFunctions
