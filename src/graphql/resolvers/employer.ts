import {
  QueryGetEmployerBankAccountArgs,
  QueryGetEmployerContactArgs,
  QueryGetEmployerCreditCardArgs,
  QueryGetEmployerEmployeePoolArgs,
  QueryGetEmployeeImportLogArgs,
  QueryGetEmployeeImportLogDetailArgs,
  CustomResponse,
  EmployeeImportLogDetail,
  Employer,
  EmployerBankAccount,
  EmployerContact,
  EmployerCreditCard,
  EmployeeImportLog,
  EmployerEmployeePool,
  MutationUpdateEmployerBankAccountArgs,
  MutationDeleteEmployerBankAccountArgs,
  MutationAddEmployerBankAccountArgs,
  MutationAddEmployerContactArgs,
  MutationDeleteEmployerContactArgs,
  MutationUpdateEmployerContactArgs,
  MutationAddEmployerCreditCardArgs,
  MutationDeleteEmployerCreditCardArgs,
  MutationUpdateEmployerCreditCardArgs,
  MutationAddEmployeeImportLogArgs,
  MutationDeleteEmployeeImportLogArgs,
  MutationUpdateEmployeeImportLogArgs,
  MutationAddEmployeeImportLogDetailArgs,
  MutationDeleteEmployeeImportLogDetailArgs,
  MutationUpdateEmployeeImportLogDetailArgs,
  MutationAddEmployerEmployeePoolArgs,
  MutationDeleteEmployerEmployeePoolArgs,
  MutationUpdateEmployerEmployeePoolArgs,
  MutationAddEmployerArgs,
  MutationUpdateEmployerArgs,
  QueryGetEmployerArgs
} from '../../interfaces/types'
import {EmployersService} from '../../services/employers/EmployersService'
import {IAppContext} from '../../interfaces/IAppContext'

const resolveFunctions = {
  Employer: {
    employerBankAccount(employer: Employer, args, context: IAppContext): Promise<EmployerBankAccount[]> {
      const employerService: EmployersService = context.employersService

      return employerService.getEmployerBankAccount(employer.id)
    },
    employerContact(employer: Employer, args, context: IAppContext): Promise<EmployerContact[]> {
      const employerService: EmployersService = context.employersService

      return employerService.getEmployerContacts(employer.id)
    },
    employerCreditCard(employer: Employer, args, context: IAppContext): Promise<EmployerCreditCard[]> {
      const employerService: EmployersService = context.employersService

      return employerService.getEmployerCreditCards(employer.id)
    },
    employeeImportLog(employer: Employer, args, context: IAppContext): Promise<EmployeeImportLog> {
      const employerService: EmployersService = context.employersService

      return employerService.getEmployeeImportLog(employer.id)
    },
    employeeImportLogDetail(employer: Employer, args, context: IAppContext): Promise<EmployeeImportLogDetail> {
      const employerService: EmployersService = context.employersService

      return employerService.getEmployeeImportLogDetail(employer.id)
    },
    employerEmployeePool(employer: Employer, args, context: IAppContext): Promise<EmployerEmployeePool> {
      const employerService: EmployersService = context.employersService

      return employerService.getEmployerEmployeePool(employer.id)
    }
  },
  Query: {
    getEmployer(_, args: QueryGetEmployerArgs, context: IAppContext): Promise<Employer> {
      const employersService: EmployersService = context.employersService

      return employersService.getEmployer(args.id)
    },
    getEmployerBankAccount(
      _,
      args: QueryGetEmployerBankAccountArgs,
      context: IAppContext
    ): Promise<EmployerBankAccount[]> {
      const employersService: EmployersService = context.employersService

      return employersService.getEmployerBankAccount(args.EmployerId)
    },
    getEmployerContact(_, args: QueryGetEmployerContactArgs, context: IAppContext): Promise<EmployerContact[]> {
      const employersService: EmployersService = context.employersService

      return employersService.getEmployerContacts(args.EmployerId)
    },
    getEmployerCreditCard(
      _,
      args: QueryGetEmployerCreditCardArgs,
      context: IAppContext
    ): Promise<EmployerCreditCard[]> {
      const employersService: EmployersService = context.employersService

      return employersService.getEmployerCreditCards(args.EmployerId)
    },
    getEmployeeImportLog(
      _,
      args: QueryGetEmployeeImportLogArgs,
      context: IAppContext
    ): Promise<EmployeeImportLog> {
      const employersService: EmployersService = context.employersService

      return employersService.getEmployeeImportLog(args.EmployerId)
    },
    getEmployeeImportLogDetail(
      _,
      args: QueryGetEmployeeImportLogDetailArgs,
      context: IAppContext
    ): Promise<EmployeeImportLogDetail> {
      const employersService: EmployersService = context.employersService

      return employersService.getEmployeeImportLogDetail(args.EmployerId)
    },
    getEmployerEmployeePool(
      _,
      args: QueryGetEmployerEmployeePoolArgs,
      context: IAppContext
    ): Promise<EmployerEmployeePool> {
      const employersService: EmployersService = context.employersService

      return employersService.getEmployerEmployeePool(args.EmployerId)
    }
  },
  Mutation: {
    addEmployer(_, args: MutationAddEmployerArgs, context: IAppContext): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.addEmployer(args.input)
    },
    updateEmployer(_, args: MutationUpdateEmployerArgs, context: IAppContext): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.updateEmployer(args.input)
    },
    addEmployerBankAccount(
      _,
      args: MutationAddEmployerBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.addEmployerBankAccount(args.input)
    },
    deleteEmployerBankAccount(
      _,
      args: MutationDeleteEmployerBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.deleteEmployerBankAccount(args.input)
    },
    updateEmployerBankAccount(
      _,
      args: MutationUpdateEmployerBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.updateEmployerBankAccount(args.input)
    },
    addEmployerContact(_, args: MutationAddEmployerContactArgs, context: IAppContext): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.addEmployerContact(args.input)
    },
    deleteEmployerContact(
      _,
      args: MutationDeleteEmployerContactArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.deleteEmployerContact(args.input)
    },
    updateEmployerContact(
      _,
      args: MutationUpdateEmployerContactArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.updateEmployerContact(args.input)
    },
    addEmployerCreditCard(
      _,
      args: MutationAddEmployerCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.addEmployerCreditCard(args.input)
    },
    deleteEmployerCreditCard(
      _,
      args: MutationDeleteEmployerCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.deleteEmployerCreditCard(args.input)
    },
    updateEmployerCreditCard(
      _,
      args: MutationUpdateEmployerCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.updateEmployerCreditCard(args.input)
    },
    addEmployeeImportLog(
      _,
      args: MutationAddEmployeeImportLogArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.addEmployeeImportLog(args.input)
    },
    deleteEmployeeImportLog(
      _,
      args: MutationDeleteEmployeeImportLogArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.deleteEmployeeImportLog(args.input)
    },
    updateEmployeeImportLog(
      _,
      args: MutationUpdateEmployeeImportLogArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.updateEmployeeImportLog(args.input)
    },
    addEmployeeImportLogDetail(
      _,
      args: MutationAddEmployeeImportLogDetailArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.addEmployeeImportLogDetail(args.input)
    },
    deleteEmployeeImportLogDetail(
      _,
      args: MutationDeleteEmployeeImportLogDetailArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.deleteEmployeeImportLogDetail(args.input)
    },
    updateEmployeeImportLogDetail(
      _,
      args: MutationUpdateEmployeeImportLogDetailArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.updateEmployeeImportLogDetail(args.input)
    },
    addEmployerEmployeePool(
      _,
      args: MutationAddEmployerEmployeePoolArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.addEmployerEmployeePool(args.input)
    },
    deleteEmployerEmployeePool(
      _,
      args: MutationDeleteEmployerEmployeePoolArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.deleteEmployerEmployeePool(args.input)
    },
    updateEmployerEmployeePool(
      _,
      args: MutationUpdateEmployerEmployeePoolArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const employersService: EmployersService = context.employersService

      return employersService.updateEmployerEmployeePool(args.input)
    }
  }
}

export default resolveFunctions
