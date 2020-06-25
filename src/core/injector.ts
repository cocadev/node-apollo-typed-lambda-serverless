import 'zone.js'
import 'reflect-metadata'
import {Server} from '../server'
import {AbstractLogger} from './logger/AbstractLogger'
import {AbstractSetting} from './config/AbstractSetting'
import {Setting} from './config/Setting'
import {Logger} from './logger/Logger'
import {CarsService} from '../services/cars/CarsService'
import {TrainsService} from '../services/trains/TrainsService'
import {TodosService} from '../services/todos/TodosService'
import {ClaimService} from '../services/claim/ClaimService'
import {EmployersService} from '../services/employers/EmployersService'
import {PatientsService} from '../services/patients/PatientsService'
import {PayersService} from '../services/payers/PayersService'
import {ProvidersService} from '../services/providers/ProvidersService'
import {SecurityQuestionsService} from '../services/securityQuestions/SecurityQuestionsService'
import {MonthlyStatmentsService} from '../services/payments/MonthlyStatmentsService'

import {Injector, ReflectiveInjector} from 'injection-js'

const injector: Injector = ReflectiveInjector.resolveAndCreate([
  {provide: AbstractLogger, useClass: Logger},
  {provide: AbstractSetting, useClass: Setting},
  CarsService,
  TrainsService,
  TodosService,
  ClaimService,
  EmployersService,
  PatientsService,
  PayersService,
  ProvidersService,
  SecurityQuestionsService,
  MonthlyStatmentsService,
  Server
])

export default injector
