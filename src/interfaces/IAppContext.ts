import {CarsService} from '../services/cars/CarsService'
import {TrainsService} from '../services/trains/TrainsService'
import {TodosService} from '../services/todos/TodosService'

import {EmployersService} from '../services/employers/EmployersService'
import {PatientsService} from '../services/patients/PatientsService'
import {PayersService} from '../services/payers/PayersService'
import {ProvidersService} from '../services/providers/ProvidersService'
import {SecurityQuestionsService} from '../services/securityQuestions/SecurityQuestionsService'
import {MonthlyStatmentsService} from '../services/payments/MonthlyStatmentsService'
import {ClaimService} from '../services/claim/ClaimService'

export interface IAppContext {
  carsService: CarsService
  trainsService: TrainsService
  todosService: TodosService
  claimService: ClaimService
  employersService: EmployersService
  patientsService: PatientsService
  payersService: PayersService
  providersService: ProvidersService
  securityQuestionsService: SecurityQuestionsService
  monthlyStatmentsService: MonthlyStatmentsService
}
