import {
  Payer,
  PayerBankAccount,
  PayerContact,
  MutationAddPayerArgs,
  MutationUpdatePayerArgs,
  MutationAddPayerContactArgs,
  MutationUpdatePayerBankAccountArgs,
  MutationAddPayerBankAccountArgs,
  MutationUpdatePayerContactArgs,
  MutationDeletePayerBankAccountArgs,
  MutationDeletePayerContactArgs,
  QueryGetPayerArgs,
  QueryGetPayerContactArgs,
  QueryGetPayerBankAccountArgs,
  CustomResponse
} from '../../interfaces/types'
import {PayersService} from '../../services/payers/PayersService'
import {IAppContext} from '../../interfaces/IAppContext'

const resolveFunctions = {
  Payer: {
    payerContact(payer: Payer, args, context: IAppContext): Promise<PayerContact[]> {
      const payersService: PayersService = context.payersService

      return payersService.getPayerContacts(payer.id)
    },
    payerBankAccount(payer: Payer, args, context: IAppContext): Promise<PayerBankAccount[]> {
      const payersService: PayersService = context.payersService

      return payersService.getPayerBankAccount(payer.id)
    }
  },
  Query: {
    getPayer(_, args: QueryGetPayerArgs, context: IAppContext): Promise<Payer> {
      const payersService: PayersService = context.payersService

      return payersService.getPayer(args.id)
    },

    getPayerBankAccount(_, args: QueryGetPayerBankAccountArgs, context: IAppContext): Promise<PayerBankAccount[]> {
      const payersService: PayersService = context.payersService

      return payersService.getPayerBankAccount(args.PayerId)
    },
    getPayerContact(_, args: QueryGetPayerContactArgs, context: IAppContext): Promise<PayerContact[]> {
      const payersService: PayersService = context.payersService

      return payersService.getPayerContacts(args.PayerId)
    }
  },
  Mutation: {
    addPayer(_, args: MutationAddPayerArgs, context: IAppContext): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.addPayer(args.input)
    },

    updatePayer(_, args: MutationUpdatePayerArgs, context: IAppContext): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.updatePayer(args.input)
    },
    addPayerBankAccount(_, args: MutationAddPayerBankAccountArgs, context: IAppContext): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.addPayerBankAccount(args.input)
    },
    deletePayerBankAccount(
      _,
      args: MutationDeletePayerBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.deletePayerBankAccount(args.input)
    },
    updatePayerBankAccount(
      _,
      args: MutationUpdatePayerBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.updatePayerBankAccount(args.input)
    },
    addPayerContact(_, args: MutationAddPayerContactArgs, context: IAppContext): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.addPayerContact(args.input)
    },
    deletePayerContact(_, args: MutationDeletePayerContactArgs, context: IAppContext): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.deletePayerContact(args.input)
    },
    updatePayerContact(_, args: MutationUpdatePayerContactArgs, context: IAppContext): Promise<CustomResponse> {
      const payersService: PayersService = context.payersService

      return payersService.updatePayerContact(args.input)
    }
  }
}

export default resolveFunctions
