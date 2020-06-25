import {
  QueryGetProviderBankAccountArgs,
  MutationAddProviderArgs,
  MutationDeleteProviderContactArgs,
  MutationUpdateProviderContactArgs,
  MutationAddProviderContactArgs,
  MutationAddProviderCreditCardArgs,
  MutationDeleteProviderCreditCardArgs,
  MutationUpdateProviderCreditCardArgs,
  MutationDeleteProviderEntityArgs,
  MutationAddProviderEntityArgs,
  MutationUpdateProviderEntityArgs,
  MutationUpdateProviderBankAccountArgs,
  MutationDeleteProviderBankAccountArgs,
  CustomResponse,
  MutationAddProviderBankAccountArgs,
  QueryGetProviderCreditCardArgs,
  QueryGetProviderContactsArgs,
  Provider,
  ProviderBankAccount,
  ProviderContact,
  ProviderCreditCard,
  ProviderEntity,
  QueryGetProviderEntityArgs,
  QueryGetProviderArgs,
  MutationUpdateProviderArgs
} from '../../interfaces/types'
import {ProvidersService} from '../../services/providers/ProvidersService'
import {IAppContext} from '../../interfaces/IAppContext'

const resolveFunctions = {
  Provider: {
    providerBankAccount(provider: Provider, args, context: IAppContext): Promise<ProviderBankAccount[]> {
      const providerService: ProvidersService = context.providersService

      return providerService.getProviderBankAccount(provider.id)
    },
    providerContact(provider: Provider, args, context: IAppContext): Promise<ProviderContact[]> {
      const providerService: ProvidersService = context.providersService

      return providerService.getProviderContacts(provider.id)
    },
    providerCreditCard(provider: Provider, args, context: IAppContext): Promise<ProviderCreditCard[]> {
      const providerService: ProvidersService = context.providersService

      return providerService.getProvierCreditCards(provider.id)
    },
    providerEntity(provider: Provider, args, context: IAppContext): Promise<ProviderEntity> {
      const providerService: ProvidersService = context.providersService

      return providerService.getProviderEntity(provider.id)
    }
  },
  Query: {
    getProvider(_, args: QueryGetProviderArgs, context: IAppContext): Promise<Provider> {
      const providersService: ProvidersService = context.providersService

      return providersService.getProvider(args.id)
    },

    getProviderBankAccount(
      _,
      args: QueryGetProviderBankAccountArgs,
      context: IAppContext
    ): Promise<ProviderBankAccount[]> {
      const providersService: ProvidersService = context.providersService

      return providersService.getProviderBankAccount(args.ProviderId)
    },
    getProviderContacts(_, args: QueryGetProviderContactsArgs, context: IAppContext): Promise<ProviderContact[]> {
      const providersService: ProvidersService = context.providersService

      return providersService.getProviderContacts(args.ProviderId)
    },
    getProviderCreditCard(
      _,
      args: QueryGetProviderCreditCardArgs,
      context: IAppContext
    ): Promise<ProviderCreditCard[]> {
      const providersService: ProvidersService = context.providersService

      return providersService.getProvierCreditCards(args.ProviderId)
    },
    getProviderEntity(_, args: QueryGetProviderEntityArgs, context: IAppContext): Promise<ProviderEntity> {
      const providersService: ProvidersService = context.providersService

      return providersService.getProviderEntity(args.ProviderId)
    }
  },
  Mutation: {
    addProviderBankAccount(
      _,
      args: MutationAddProviderBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.addProvierBankAccount(args.input)
    },
    deleteProviderBankAccount(
      _,
      args: MutationDeleteProviderBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.deleteProviderBankAccount(args.input)
    },
    updateProviderBankAccount(
      _,
      args: MutationUpdateProviderBankAccountArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.updateBankAccount(args.input)
    },
    addProviderContact(_, args: MutationAddProviderContactArgs, context: IAppContext): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.addProvierContact(args.input)
    },
    deleteProviderContact(
      _,
      args: MutationDeleteProviderContactArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.deleteProviderContact(args.input)
    },
    updateProviderContact(
      _,
      args: MutationUpdateProviderContactArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.updateContact(args.input)
    },

    addProviderCreditCard(
      _,
      args: MutationAddProviderCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.addProviderCreditCard(args.input)
    },
    deleteProviderCreditCard(
      _,
      args: MutationDeleteProviderCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.deleteProviderCreditCard(args.input)
    },
    updateProviderCreditCard(
      _,
      args: MutationUpdateProviderCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.updateCreditCard(args.input)
    },
    addProvider(_, args: MutationAddProviderArgs, context: IAppContext): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.addProvider(args.input)
    },

    updateProvider(_, args: MutationUpdateProviderArgs, context: IAppContext): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.updateProvider(args.input)
    },

    addProviderEntity(_, args: MutationAddProviderEntityArgs, context: IAppContext): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.addProviderEntity(args.input)
    },
    deleteProviderEntity(
      _,
      args: MutationDeleteProviderEntityArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.deleteProviderEntity(args.input)
    },
    updateProviderEntity(
      _,
      args: MutationUpdateProviderEntityArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const providersService: ProvidersService = context.providersService

      return providersService.updateEntity(args.input)
    }
  }
}

export default resolveFunctions
