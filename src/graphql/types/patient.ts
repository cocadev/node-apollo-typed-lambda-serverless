const schema = `
type PatientDetails {
  _id: ID
  PatientId: ID
  address: String
  mobileNumber: String
  email: String
  dateOfBirth: String
  ssn: String
  gender: String
  otp: Int
  otpVerified: Boolean
  otpTTL: String
  emailCode: String
  isEmailVerified: Boolean
  emailCodeTTL: String
  inviteCode: String
  referralCode: String
  securityQuestion1: String
  securityQuestion1_answer: String
  securityQuestion2: String
  securityQuestion2_answer: String
  securityQuestion3: String
  securityQuestion3_answer: String
  secretQuestion: String
  secretQuestion_answer: String
  isTcAccepted: Boolean
  isHIPPAAPrivacyAccepted: Boolean
  isPermissionToShare: Boolean
  maritalStatus: String
  occupation: String
  designation: String
  employersName: String
  employersAddress: String
  employeeNumber: String
  annualIncome: Float
  yearsWorkedInCurrentCompany: String
  monthsWorkedInCurrentCompany: String
  govtIdPic: String
  isRequestIdUpdate: Boolean
  isIdNotMatch: Boolean
  prePay: Float
  prePayInstallment: Float
  ppi: Float
  ppiInstallment: Float
  isPpiPaymentSplit: Boolean
  isPrePayPaymentSplit: Boolean
  paymentFrequencyPrePay: Int
  paymentFrequencyPpi: Int
  assuredPaymentsToProviders: Float
  stripeKey: String
}

type PatientAddress {
  _id: ID
  PatientId: ID
  address: String
  year: String
  month: String
  homeStatus: String
}

type PatientCreditCard{
  _id: ID
  PatientId: ID
  cardType: String
  nameOnCard: String
  cardNumber: String
  expiryMonth: String
  expiryYear: String
  cvvNumber: String
  billingAddress: String
  cardBrand: String
  cardLevel: String
  stripeToken: String
  stripeSource: String
  isPreferred: Boolean
}

type PatientInsurance{
  _id: ID
  PatientId: ID
  planName: String
  planIssuer: String
  planEffectiveDate: String
  nameOnCard: String
  memberId: String
  groupPlanId: String
  planAddress: String
  csNo: String
  providerSupportPhoneNumber: String
  patientSupportPhoneNumber: String
  areYouPrimary: Boolean
  emailPrimary: String
  isVerifiedByPrimary: Boolean
  isFinancialResponsible: Boolean
  financialResponsibleName: String
  financialResponsibleRelation: String
  financialResponsibleAddress: String
  cardFrontImage: String
  cardBackImage: String
  insuranceType: String
  isOutOfPocketMaxInNetWorkBenefits: Boolean
  individualDedPktMaxInNetBenefits: Float
  individualOutOfPktMaxInNetBenefits: Float
  familyDedPktMaxInNetBenefits: Float
  familyOutOfPktMax: Float
  isOutOfNetworkBenefits: Boolean
  individualDedOutOfNetBenefits: Float
  individualOutOfPktMaxOfNetBenefits: Float
  familyDedOutOfNetBenefits: Float
  familyOutOfPocketMax: Float
  prePay: Float
  ppi: Float
  buffer: Float
  totalToPay: Float
}

type Patient {
  id: ID
  ParentId: ID
  username: String
  password: String
  isProvider: Boolean
  isEmployer: Boolean
  name: String
  suffix: String
  type: String
  patientDetailId: String
  dependents: [Patient]
  patientDetails: PatientDetails
  patientAddressDetails: [PatientAddress]
  patientCreditCards: [PatientCreditCard]
  patientInsurances: [PatientInsurance]
}

type PoemPaymentPlan{
  PatientId: ID
  prePay: Float
  prePayInstallment: Float
  prePayInstallment1stMinPayment: Float
  ppi: Float
  ppiInstallment: Float
  ppiInstallment1stMinPayment: Float
}

type PoemSummay{
  name: String
  prePay: Float
  ppi: Float
  buffer: Float
  totalToPay: Float
}

type TempRegister {
  id: ID
  name: String
  suffix: String
  username: String
  password: String
  mobileNumber: String
  inviteCode: String
  referralCode: String
  otp: Int
  otpVerified: Boolean
  otpTTL: String
}

type SecurityResponse {
  ssn: String
  question1: String
  question2: String
  question3: String
  answer1: String
  answer2: String
  answer3: String
  status: Int
  message: String
  secretQuestion: String
}
type SecretResponse {
  status: Int
  message: String
  username: String
}

type PoemCheckoutInformation {
  PatientId: ID
  dueAmount: Float
  employerContribution: Float
  totalDueAmount: Float
}

type PatientPayment {
  id: ID
  PatientId: ID
  MonthlyStatementId: ID
  PatientCreditCardId: ID
  paymentDate: String
  scheduleDate: String
  paymentAmount: String
  paymentStatus: String
  confirmationCode: String
  patient: Patient
  creditCard: PatientCreditCard
}

type PatientSearchLog {
  id: ID
  PatientId: ID
  ProviderId: ID
  isConcern: Boolean
  searchedOn: String
  location: String
  result: String
  resultDetails: String
  patient: Patient
  provider: Provider
}

# the schema allows the following query:
type Query {
  searchPatient(searchString:String!):[Patient]
  userLogin(username: String!, password: String!): CustomResponse
  getPatientByUsername(username: String): [Patient]
  getPatient(id: ID): Patient
  checkUsernameAvailable(username: String) : CustomResponse
  checkMobileAvailable(mobile: String) : CustomResponse
  checkEmailAvailable(email: String) : CustomResponse
  getPatientAddresses(PatientId: ID) : [PatientAddress]
#  getSecurityQuestions : [SecurityQuestion] -- in securityQuestions.ts
  getInsuranceInformation(PatientId: ID) : [PatientInsurance]
  getPOEMSummary(PatientId: ID) : [PoemSummay]
  getPOEMPaymentPlan(PatientId: ID) : PoemPaymentPlan
  getPatientCreditCards(PatientId: ID): [PatientCreditCard]

  forgotUsernameStep1(name: String, dateOfBirth: String, ssn: String) : SecurityResponse
  answerSecurityQuestions(ssn: String, answer1: String, answer2: String, answer3: String) : SecurityResponse
  forgotUsernameStep2(ssn: String, secretAnswer: String) : SecretResponse
  forgotPasswordStep1(username: String, name: String, dateOfBirth: String, ssn: String) : SecurityResponse
#  answerSecurityQuestions(ssn: String, answer1: String, answer2: String, answer3: String) : SecurityResponse
  forgotPasswordStep2(username: String, secretAnswer: String): SecretResponse
  forgotPasswordStep3(username: String, secretAnswer: String, newPassword: String): CustomResponse
  getPatientSecurityQuestion(PatientId: ID): SecurityResponse
  changeUsernameStep1(PatientId: ID, secretAnswer: String): SecretResponse
  changeUsername(PatientId: ID, secretAnswer: String, newUsername: String): CustomResponse
  getPoemCheckoutInformation(PatientId: ID): PoemCheckoutInformation
  getPaymentInfo(statementId: ID): [PatientPayment]

  getPatientSearchLog(PatientId: ID): [PatientSearchLog]
}

type Mutation {
  tempRegister(input: TempRegisterInput!) : CustomResponse
  verifyOTP(otp: String, TempRegisterId: ID) : CustomResponse
  reSendOTP(TempRegisterId: ID) : CustomResponse
  patientCurrentScreen(PatientId: ID, lastScreen: String) : CustomResponse
  updateBasicData(input: UpdateBasicDataInput!) : CustomResponse
  sendEmailOTP(PatientId: ID) : CustomResponse
  addPatientAddressDetails(input: AddPatientAddressDetailsInput!) : CustomResponse

  verifyEmail(PatientId: ID, emailCode: String) : CustomResponse
  updateSecuritySecretQuestions(input: UpdateSecuritySecretQuestionsInput!) : CustomResponse

  updateAgreement(input: UpdateAgreementInput!) : CustomResponse
  deleteInsurance(input: DeleteInsuranceInput!) : CustomResponse
  addDependent(input: AddDependentInput!) : CustomResponse
  addInsurance(input: AddInsuranceInput!) : CustomResponse
  updateInsurance(input: UpdateInsuranceInput!) : CustomResponse

  updatePoemInfo(input: UpdatePoemInfoInput!) : CustomResponse
  updatePOEMPaymentPlan(input: UpdatePOEMPaymentPlanInput!): CustomResponse
  addPatientCreditCard(input: AddPatientCreditCardInput!) : CustomResponse
  updatePatientCreditCard(input: UpdatePatientCreditCardInput!) : CustomResponse

  poemCheckOut(input: PoemCheckOutInput!) : CustomResponse
}

input TempRegisterInput{
  name: String!, suffix: String, username: String!, password: String!, mobileNumber: String!, inviteCode: String, referralCode: String
}

input UpdateBasicDataInput{
  PatientId: ID!, email: String!, ssn: String, dateOfBirth: String,  gender: String, maritalStatus: String, address: String,
  employersName: String!, employersAddress: String, employeeNumber: String, annualIncome: Float, yearsWorkedInCurrentCompany: String, monthsWorkedInCurrentCompany: String
}

input AddPatientAddressDetailsInput{
  PatientId: ID!, address: String!, year: String, month: String, homeStatus: String
}

input UpdateSecuritySecretQuestionsInput{
  PatientId: ID!, securityQuestion1: String, securityQuestion1_answer: String, securityQuestion2: String, securityQuestion2_answer: String, securityQuestion3: String, securityQuestion3_answer: String, secretQuestion: String, secretQuestion_answer: String
}

input UpdateAgreementInput{
  PatientId: ID!, isTcAccepted: Boolean!, isHIPPAAPrivacyAccepted: Boolean!, isPermissionToShare: Boolean!
}

input DeleteInsuranceInput{
  PatientId: ID, PatientInsuranceId: ID
}

input AddDependentInput{
  PatientId: ID!, name: String!, suffix: String, type: String!, dateOfBirth: String, gender: String, address: String, email: String, ssn: String
}

input AddInsuranceInput{
  PatientId: ID!, planName: String, planIssuer: String, planEffectiveDate: String, nameOnCard: String, memberId: String, groupPlanId: String, planAddress: String, csNo: String, providerSupportPhoneNumber: String, patientSupportPhoneNumber: String, areYouPrimary: Boolean, emailPrimary: String, isVerifiedByPrimary: Boolean, isFinancialResponsible: Boolean, financialResponsibleName: String, financialResponsibleRelation: String, financialResponsibleAddress: String, cardFrontImage: String, cardBackImage: String, insuranceType: String
}

input UpdateInsuranceInput{
  PatientInsuranceId: ID!, planName: String, planIssuer: String, planEffectiveDate: String, nameOnCard: String, memberId: String, groupPlanId: String, planAddress: String, csNo: String, providerSupportPhoneNumber: String, patientSupportPhoneNumber: String, areYouPrimary: Boolean, emailPrimary: String, isVerifiedByPrimary: Boolean, isFinancialResponsible: Boolean, financialResponsibleName: String, financialResponsibleRelation: String, financialResponsibleAddress: String, cardFrontImage: String, cardBackImage: String, insuranceType: String
}

input UpdatePoemInfoInput{
  PatientInsuranceId: ID, isOutOfPocketMaxInNetWorkBenefits: Boolean, individualDedPktMaxInNetBenefits: Float, individualOutOfPktMaxInNetBenefits: Float, familyDedPktMaxInNetBenefits: Float, familyOutOfPktMax: Float, isOutOfNetworkBenefits: Boolean, individualDedOutOfNetBenefits: Float, individualOutOfPktMaxOfNetBenefits: Float, familyDedOutOfNetBenefits: Float, familyOutOfPocketMax: Float
}

input UpdatePOEMPaymentPlanInput{
  PatientId: ID!, isPrePayPaymentSplit: Boolean, prePayInstallments: Int, prePay1stInstallment: Float, isPpiPaymentSplit: Boolean, ppiInstallments: Int,  ppi1stInstallment: Float
}

input AddPatientCreditCardInput{
  PatientId: ID, cardType: String, nameOnCard: String, cardNumber: String, expiryMonth: String, expiryYear: String, cvvNumber: String, billingAddress: String, cardBrand: String, cardLevel: String, isPreferred: Boolean
}

input UpdatePatientCreditCardInput
{
  PatientCreditCardId: ID, cardType: String, nameOnCard: String, cardNumber: String, expiryMonth: String, expiryYear: String, cvvNumber: String, billingAddress: String, cardBrand: String, cardLevel: String, isPreferred: Boolean
}

input PoemCheckOutInput {
  PatientId: ID!, CreditCards: [PoemCheckOutCardsInput]
}

input PoemCheckOutCardsInput {
  PatientCreditCardId: ID!, paymentDate: String!, amount: Float!
}
`

export default schema
