import {
  QuerySearchPatientArgs,
  QueryUserLoginArgs,
  QueryGetPatientArgs,
  QueryGetPatientByUsernameArgs,
  QueryCheckUsernameAvailableArgs,
  QueryCheckMobileAvailableArgs,
  QueryCheckEmailAvailableArgs,
  QueryGetPatientAddressesArgs,
  QueryGetInsuranceInformationArgs,
  QueryGetPoemSummaryArgs,
  QueryGetPoemPaymentPlanArgs,
  QueryGetPatientCreditCardsArgs,
  QueryForgotUsernameStep1Args,
  QueryAnswerSecurityQuestionsArgs,
  QueryForgotUsernameStep2Args,
  QueryForgotPasswordStep1Args,
  QueryForgotPasswordStep2Args,
  QueryForgotPasswordStep3Args,
  QueryGetPatientSecurityQuestionArgs,
  QueryChangeUsernameStep1Args,
  QueryChangeUsernameArgs,
  QueryGetPoemCheckoutInformationArgs,
  QueryGetPaymentInfoArgs,
  QueryGetPatientSearchLogArgs,
  MutationTempRegisterArgs,
  MutationVerifyOtpArgs,
  MutationReSendOtpArgs,
  MutationPatientCurrentScreenArgs,
  MutationUpdateBasicDataArgs,
  MutationSendEmailOtpArgs,
  MutationAddPatientAddressDetailsArgs,
  MutationVerifyEmailArgs,
  MutationUpdateSecuritySecretQuestionsArgs,
  MutationUpdateAgreementArgs,
  MutationDeleteInsuranceArgs,
  MutationAddDependentArgs,
  MutationAddInsuranceArgs,
  MutationUpdateInsuranceArgs,
  MutationUpdatePoemInfoArgs,
  MutationUpdatePoemPaymentPlanArgs,
  MutationAddPatientCreditCardArgs,
  MutationUpdatePatientCreditCardArgs,
  MutationPoemCheckOutArgs,
  CustomResponse,
  SecurityResponse,
  SecretResponse,
  Patient,
  Provider,
  PatientDetails,
  PatientAddress,
  PatientInsurance,
  PoemSummay,
  PoemPaymentPlan,
  PatientCreditCard,
  PoemCheckoutInformation,
  PatientPayment,
  PatientSearchLog,
  TempRegister
} from '../../interfaces/types'
import {PatientsService} from '../../services/patients/PatientsService'
import {ProvidersService} from '../../services/providers/ProvidersService'
import {MonthlyStatmentsService} from '../../services/payments/MonthlyStatmentsService'
import {IAppContext} from '../../interfaces/IAppContext'

const resolveFunctions = {
  Patient: {
    patientDetails(patient: Patient, args, context: IAppContext): Promise<PatientDetails> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientDetails(patient.patientDetailId)
    },
    dependents(patient: Patient, args, context: IAppContext): Promise<Patient[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getDependents(patient.id)
    },
    patientAddressDetails(patient: Patient, args, context: IAppContext): Promise<PatientAddress[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientAddresses(patient.id)
    },

    patientCreditCards(patient: Patient, args, context: IAppContext): Promise<PatientCreditCard[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientCreditCards(patient.id)
    },
    patientInsurances(patient: Patient, args, context: IAppContext): Promise<PatientInsurance[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getInsuranceInformation(patient.id)
    }
  },
  PatientPayment: {
    patient(patientPayment: PatientPayment, args, context: IAppContext): Promise<Patient> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatient(patientPayment.PatientId)
    },
    creditCard(patientPayment: PatientPayment, args, context: IAppContext): Promise<PatientCreditCard> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientCreditCard(patientPayment.PatientCreditCardId)
    }
  },
  PatientSearchLog: {
    patient(patientSearchLog: PatientSearchLog, args, context: IAppContext): Promise<Patient> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatient(patientSearchLog.PatientId)
    },
    provider(patientSearchLog: PatientSearchLog, args, context: IAppContext): Promise<Provider> {
      const providersService: ProvidersService = context.providersService

      return providersService.getProvider(patientSearchLog.ProviderId)
    }
  },
  Query: {
    searchPatient(_, args: QuerySearchPatientArgs, context: IAppContext): Promise<Patient[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.searchPatient(args.searchString)
    },
    userLogin(_, args: QueryUserLoginArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.userLogin(args.username, args.password)
    },

    getPatient(_, args: QueryGetPatientArgs, context: IAppContext): Promise<Patient> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatient(args.id)
    },

    getPatientByUsername(_, args: QueryGetPatientByUsernameArgs, context: IAppContext): Promise<Patient> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientByUsername(args.username)
    },

    checkUsernameAvailable(
      _,
      args: QueryCheckUsernameAvailableArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.checkUsernameAvailable(args.username)
    },

    checkMobileAvailable(_, args: QueryCheckMobileAvailableArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.checkMobileAvailable(args.mobile)
    },

    checkEmailAvailable(_, args: QueryCheckEmailAvailableArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.checkEmailAvailable(args.email)
    },

    getPatientAddresses(_, args: QueryGetPatientAddressesArgs, context: IAppContext): Promise<PatientAddress[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientAddresses(args.PatientId)
    },

    getInsuranceInformation(
      _,
      args: QueryGetInsuranceInformationArgs,
      context: IAppContext
    ): Promise<PatientInsurance[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getInsuranceInformation(args.PatientId)
    },

    getPOEMSummary(_, args: QueryGetPoemSummaryArgs, context: IAppContext): Promise<PoemSummay[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPOEMSummary(args.PatientId)
    },

    getPOEMPaymentPlan(_, args: QueryGetPoemPaymentPlanArgs, context: IAppContext): Promise<PoemPaymentPlan> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPOEMPaymentPlan(args.PatientId)
    },

    getPatientCreditCards(
      _,
      args: QueryGetPatientCreditCardsArgs,
      context: IAppContext
    ): Promise<PatientCreditCard[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientCreditCards(args.PatientId)
    },

    forgotUsernameStep1(_, args: QueryForgotUsernameStep1Args, context: IAppContext): Promise<SecurityResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.forgotUsernameStep1(args.name, args.dateOfBirth, args.ssn)
    },

    answerSecurityQuestions(
      _,
      args: QueryAnswerSecurityQuestionsArgs,
      context: IAppContext
    ): Promise<SecurityResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.answerSecurityQuestions(args.ssn, args.answer1, args.answer2, args.answer3)
    },

    forgotUsernameStep2(_, args: QueryForgotUsernameStep2Args, context: IAppContext): Promise<SecretResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.forgotUsernameStep2(args.ssn, args.secretAnswer)
    },

    forgotPasswordStep1(_, args: QueryForgotPasswordStep1Args, context: IAppContext): Promise<SecurityResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.forgotPasswordStep1(args.ssn, args.username, args.name, args.dateOfBirth)
    },

    forgotPasswordStep2(_, args: QueryForgotPasswordStep2Args, context: IAppContext): Promise<SecretResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.forgotPasswordStep2(args.username, args.secretAnswer)
    },

    forgotPasswordStep3(_, args: QueryForgotPasswordStep3Args, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.forgotPasswordStep3(args.username, args.secretAnswer, args.newPassword)
    },

    getPatientSecurityQuestion(
      _,
      args: QueryGetPatientSecurityQuestionArgs,
      context: IAppContext
    ): Promise<SecurityResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientSecurityQuestion(args.PatientId)
    },

    changeUsernameStep1(_, args: QueryChangeUsernameStep1Args, context: IAppContext): Promise<SecretResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.changeUsernameStep1(args.PatientId, args.secretAnswer)
    },

    changeUsername(_, args: QueryChangeUsernameArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.changeUsername(args.PatientId, args.secretAnswer, args.newUsername)
    },

    getPoemCheckoutInformation(
      _,
      args: QueryGetPoemCheckoutInformationArgs,
      context: IAppContext
    ): Promise<PoemCheckoutInformation> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPoemCheckoutInformation(args.PatientId)
    },

    getPaymentInfo(_, args: QueryGetPaymentInfoArgs, context: IAppContext): Promise<PatientPayment[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPaymentInfo(args.statementId)
    },

    getPatientSearchLog(_, args: QueryGetPatientSearchLogArgs, context: IAppContext): Promise<PatientSearchLog[]> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.getPatientSearchLog(args.PatientId)
    }
  },
  Mutation: {
    tempRegister(_, args: MutationTempRegisterArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.tempRegister(args.input)
    },

    verifyOTP(_, args: MutationVerifyOtpArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.verifyOTP(args.otp, args.TempRegisterId)
    },

    reSendOTP(_, args: MutationReSendOtpArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.reSendOTP(args.TempRegisterId)
    },

    patientCurrentScreen(
      _,
      args: MutationPatientCurrentScreenArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.patientCurrentScreen(args.PatientId, args.lastScreen)
    },

    updateBasicData(_, args: MutationUpdateBasicDataArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.updateBasicData(args.input)
    },

    sendEmailOTP(_, args: MutationSendEmailOtpArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.sendEmailOTP(args.PatientId)
    },

    addPatientAddressDetails(
      _,
      args: MutationAddPatientAddressDetailsArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.addPatientAddressDetails(args.input)
    },

    verifyEmail(_, args: MutationVerifyEmailArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.verifyEmail(args.PatientId, args.emailCode)
    },

    updateSecuritySecretQuestions(
      _,
      args: MutationUpdateSecuritySecretQuestionsArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.updateSecuritySecretQuestions(args.input)
    },

    updateAgreement(_, args: MutationUpdateAgreementArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.updateAgreement(args.input)
    },

    deleteInsurance(_, args: MutationDeleteInsuranceArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.deleteInsurance(args.input)
    },

    addDependent(_, args: MutationAddDependentArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.addDependent(args.input)
    },

    addInsurance(_, args: MutationAddInsuranceArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.addInsurance(args.input)
    },

    updateInsurance(_, args: MutationUpdateInsuranceArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.updateInsurance(args.input)
    },

    updatePoemInfo(_, args: MutationUpdatePoemInfoArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.updatePoemInfo(args.input)
    },

    updatePOEMPaymentPlan(
      _,
      args: MutationUpdatePoemPaymentPlanArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.updatePOEMPaymentPlan(args.input)
    },

    addPatientCreditCard(
      _,
      args: MutationAddPatientCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.addPatientCreditCard(args.input)
    },

    updatePatientCreditCard(
      _,
      args: MutationUpdatePatientCreditCardArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.updatePatientCreditCard(args.input)
    },

    poemCheckOut(_, args: MutationPoemCheckOutArgs, context: IAppContext): Promise<CustomResponse> {
      const patientsService: PatientsService = context.patientsService

      return patientsService.poemCheckOut(args.input)
    }
  }
}

export default resolveFunctions
