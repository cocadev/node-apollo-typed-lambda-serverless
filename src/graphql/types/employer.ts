const schema = `
type Employer {
    id: ID
    PatientId: ID
    institutionName: String
    address: String
    taxID: Boolean
    phoneNumber: String
    employerContact:EmployerContact
    employerBankAccount:EmployerBankAccount
    employerCreditCard:EmployerCreditCard
    employeeImportLog:EmployeeImportLog
    employeeImportLogDetail:EmployeeImportLogDetail
    employerEmployeePool:EmployerEmployeePool


}
type EmployerContact {
  _id: ID
  EmployerId: ID
  name: String
  position: String
  phoneNumber: String
  email:String
  primaryParentId: Int
  secondaryParentId: Int
  type:String
}

type EmployerBankAccount {
  _id: ID
  EmployerId: ID
  nameOfAccount: String
  routingNumber: String
  accountNumber: String
  accountType:String
  address: String
  stripeToken: String
  stripeSource: String
}

type EmployerCreditCard {
  _id: ID
  EmployerId: ID
  cardType: String
  nameOnCard: String
  cardNumber: String
  expiryMonth: String
  expiryYear: String
  cvvNumber: String
  billingAddress: String
  cardBrand:String
  cardLevel:String
  stripeToken: String
  stripeSource: String
}

type EmployeeImportLog {
  _id: ID
  EmployerId: ID
  dateOfImport: String
  totalRecords: Int
  totalPrePay: Float
  totalPpi: Float
  totalSelfPay: Float
  totalAmount: Float
  paymentStatus:String
  s3File: String
  error_name: String
  error_position:String
  error_email:String
  error_phone:String
}

type EmployeeImportLogDetail {
  _id: ID
  EmployerId: ID
  EmployerImportLogId: ID
  title:String
  firstName:String
  middleName:String
  lastName:String
  suffix:String
  dateOfBirth: String
  ssn:String
  prePay: Float
  ppi: Float
  selfPay: Float
  stopDate: String
}


type EmployerEmployeePool {
  _id: ID
  EmployerId: ID
  EmployerImportLogId: ID
  title:String
  middleName:String
  lastName:String
  suffix:String
  dateOfBirth: String
  ssn:String
  prePay: Float
  ppi: Float
  selfPay: Float
  stopDate: String
}

type Query {
  getEmployer(id: ID): Employer
  getEmployerContact(EmployerId: ID) : [EmployerContact]
  getEmployerBankAccount(EmployerId: ID) : [EmployerBankAccount]
  getEmployerCreditCard(EmployerId: ID): [EmployerCreditCard]
  getEmployeeImportLog(EmployerId: ID): [EmployeeImportLog]
  getEmployeeImportLogDetail(EmployerId: ID): [EmployeeImportLogDetail]
  getEmployerEmployeePool(EmployerId: ID): [EmployerEmployeePool]
}


type Mutation {
  updateEmployer(input:UpdateEmployerInput!):CustomResponse
  addEmployer(input:AddEmployerInput!):CustomResponse
  addEmployerBankAccount(input: AddEmployerBankAccountInput!) : CustomResponse
  deleteEmployerBankAccount(input: DeleteEmployerBankAccountInput!) : CustomResponse
  updateEmployerBankAccount(input: UpdateEmployerBankAccountInput!) : CustomResponse

  addEmployerContact(input: AddEmployerContactInput!) : CustomResponse
  deleteEmployerContact(input: DeleteEmployerContactInput!) : CustomResponse
  updateEmployerContact(input: UpdateEmployerContactInput!) : CustomResponse

  addEmployerCreditCard(input: AddEmployerCreditCardInput!) : CustomResponse
  deleteEmployerCreditCard(input: DeleteEmployerCreditCardInput!) : CustomResponse
  updateEmployerCreditCard(input: UpdateEmployerCreditCardInput!) : CustomResponse

  addEmployeeImportLog(input: AddEmployeeImportLogInput!) : CustomResponse
  deleteEmployeeImportLog(input: DeleteEmployeeImportLogInput!) : CustomResponse
  updateEmployeeImportLog(input: UpdateEmployeeImportLogInput!) : CustomResponse

  addEmployeeImportLogDetail(input: AddEmployeeImportLogDetailInput!) : CustomResponse
  deleteEmployeeImportLogDetail(input: DeleteEmployeeImportLogDetailInput!) : CustomResponse
  updateEmployeeImportLogDetail(input: UpdateEmployeeImportLogDetailInput!) : CustomResponse

  addEmployerEmployeePool(input: AddEmployerEmployeePoolInput!) : CustomResponse
  deleteEmployerEmployeePool(input: DeleteEmployerEmployeePoolInput!) : CustomResponse
  updateEmployerEmployeePool(input: UpdateEmployerEmployeePoolInput!) : CustomResponse
}


input AddEmployerInput{
  PatientId: ID
  institutionName: String
  address: String
  taxID: Boolean
  phoneNumber: String
}
input UpdateEmployerInput{
  id:ID
  PatientId: ID
  institutionName: String
  address: String
  taxID: Boolean
  phoneNumber: String
}
input AddEmployerBankAccountInput{
  EmployerId: ID
  nameOfAccount: String
  routingNumber: String
  accountNumber: String
  accountType:String
  address: String
  stripeKey: String
}


input DeleteEmployerBankAccountInput{
  EmployerId: ID,
  _id: ID
}

input UpdateEmployerBankAccountInput{
  _id:ID
  EmployerId: ID
  nameOfAccount: String
  routingNumber: String
  accountNumber: String
  accountType:String
  address: String
  stripeKey: String
  type:String
}

input AddEmployerContactInput{
  EmployerId: ID
  name: String
  position: String
  phoneNumber: String
  email:String
  primaryParentId: Int
  secondaryParentId: Int
  type:String
}


input DeleteEmployerContactInput{
  EmployerId: ID,
  _id: ID
}

input UpdateEmployerContactInput{
  _id: ID
  EmployerId: ID
  name: String
  position: String
  phoneNumber: String
  email:String
  primaryParentId: Int
  secondaryParentId: Int
  type:String
}

input AddEmployerCreditCardInput{
  EmployerId: ID
  cardType: String
  nameOnCard: String
  cardNumber: String
  expiryMonth: String
  expiryYear: String
  cvvNumber: String
  billingAddress: String
  cardBrand:String
  cardLevel:String
  stripeKey:String
}

input DeleteEmployerCreditCardInput{
  EmployerId: ID,
  _id: ID
}

input UpdateEmployerCreditCardInput{
  _id: ID
  EmployerId: ID
  cardType: String
  nameOnCard: String
  cardNumber: String
  expiryMonth: String
  expiryYear: String
  cvvNumber: String
  billingAddress: String
  cardBrand:String
  cardLevel:String
  stripeKey:String
}

input AddEmployeeImportLogInput{
  EmployerId: ID
  dateOfImport: String
  totalRecords: Int
  totalPrePay: Float
  totalPpi: Float
  totalSelfPay: Float
  totalAmount: Float
  paymentStatus:String
  s3File: String
  error_name: String
  error_position:String
  error_email:String
  error_phone:String
}

input DeleteEmployeeImportLogInput{
  EmployerId: ID,
  _id: ID
}

input UpdateEmployeeImportLogInput{
  _id: ID
  EmployerId: ID
  dateOfImport: String
  totalRecords: Int
  totalPrePay: Float
  totalPpi: Float
  totalSelfPay: Float
  totalAmount: Float
  paymentStatus:String
  s3File: String
  error_name: String
  error_position:String
  error_email:String
  error_phone:String
}

input AddEmployeeImportLogDetailInput{
  EmployerId: ID
  EmployeeImportLogId: ID
  title:String
  firstName:String
  middleName:String
  lastName:String
  suffix:String
  dateOfBirth: String
  ssn:String
  prePay: Float
  ppi: Float
  selfPay: Float
  stopDate: String
}

input DeleteEmployeeImportLogDetailInput{
  EmployerId: ID,
  _id: ID
}

input UpdateEmployeeImportLogDetailInput{
  _id: ID
  EmployerId: ID
  EmployeeImportLogId: ID
  title:String
  firstName:String
  middleName:String
  lastName:String
  suffix:String
  dateOfBirth: String
  ssn:String
  prePay: Float
  ppi: Float
  selfPay: Float
  stopDate: String
}

input AddEmployerEmployeePoolInput{
  EmployerId: ID
  EmployeeImportLogId: ID
  title:String
  firstName:String
  middleName:String
  lastName:String
  suffix:String
  dateOfBirth: String
  ssn:String
  prePay: Float
  ppi: Float
  selfPay: Float
  stopDate: String
}

input DeleteEmployerEmployeePoolInput{
  EmployerId: ID,
  _id: ID
}

input UpdateEmployerEmployeePoolInput{
  _id: ID
  EmployerId: ID
  EmployeeImportLogId: ID
  title:String
  firstName:String
  middleName:String
  lastName:String
  suffix:String
  dateOfBirth: String
  ssn:String
  prePay: Float
  ppi: Float
  selfPay: Float
  stopDate: String
}
`

export default schema
