import {Injector} from 'injection-js'
import {IAppContext} from '@src/interfaces/IAppContext'
import {CarsService} from '@src/services/cars/CarsService'
import {TrainsService} from '@src/services/trains/TrainsService'
import {TodosService} from '@src/services/todos/TodosService'

import {EmployersService} from '@src/services/employers/EmployersService'
import {PatientsService} from '@src/services/patients/PatientsService'
import {PayersService} from '@src/services/payers/PayersService'
import {ProvidersService} from '@src/services/providers/ProvidersService'
import {SecurityQuestionsService} from '@src/services/securityQuestions/SecurityQuestionsService'
import {MonthlyStatmentsService} from '@src/services/payments/MonthlyStatmentsService'
import {ClaimService} from '@src/services/claim/ClaimService'
export function getContext(injector: Injector): IAppContext {
  return {
    carsService: injector.get(CarsService),
    trainsService: injector.get(TrainsService),
    todosService: injector.get(TodosService),
    claimService: injector.get(ClaimService),
    employersService: injector.get(EmployersService),
    patientsService: injector.get(PatientsService),
    payersService: injector.get(PayersService),
    providersService: injector.get(ProvidersService),
    securityQuestionsService: injector.get(SecurityQuestionsService),
    monthlyStatmentsService: injector.get(MonthlyStatmentsService)
  }
}
