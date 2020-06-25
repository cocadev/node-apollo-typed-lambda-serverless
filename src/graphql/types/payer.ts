const schema = `
type Payer {
    id: ID
    PatientId: ID
    institutionName: String
    address: String
    taxID: Boolean
    institutionType: String
    licenseNumber: String
    ownership: String
    phoneNumber: String
    payerContact:PayerContact
    payerBankAccount:PayerBankAccount
}

type PayerContact {
    _id: ID
    PayerId: ID
    name: String
    position: String
    phoneNumber: String
    email:String
    isPrimary: Boolean
    isSecondary: Boolean
    type:String
}

type PayerBankAccount {
    _id: ID
    PayerId: ID
    nameOfAccount: String
    routingNumber: String
    accountNumber: String
    accountType:String
    address: String
    stripeToken: String
    stripeSource: String
}

type Query {
    getPayer(id: ID): Employer
    getPayerContact(PayerId: ID) : [PayerContact]
    getPayerBankAccount(PayerId: ID) : [PayerBankAccount]
}


type Mutation {
    updatePayer(input:UpdatePayerInput!):CustomResponse
    addPayer(input:AddPayerInput!):CustomResponse
    addPayerBankAccount(input: AddPayerBankAccountInput!) : CustomResponse
    deletePayerBankAccount(input: DeletePayerBankAccountInput!) : CustomResponse
    updatePayerBankAccount(input: UpdatePayerBankAccountInput!) : CustomResponse

    addPayerContact(input: AddPayerContactInput!) : CustomResponse
    deletePayerContact(input: DeletePayerContactInput!) : CustomResponse
    updatePayerContact(input: UpdatePayerContactInput!) : CustomResponse

}
input AddPayerInput{
    PatientId: ID
    institutionName: String
    address: String
    taxID: Boolean
    institutionType: String
    licenseNumber: String
    ownership: String
    phoneNumber: String

}
input UpdatePayerInput{
    id:ID
    PatientId: ID
    institutionName: String
    address: String
    taxID: Boolean
    institutionType: String
    licenseNumber: String
    ownership: String
    phoneNumber: String
}
input AddPayerBankAccountInput{
    PayerId: ID
    nameOfAccount: String
    routingNumber: String
    accountNumber: String
    accountType:String
    address: String
    stripeKey: String
}


input DeletePayerBankAccountInput{
    PayerId: ID,
    _id: ID
}

input UpdatePayerBankAccountInput{
    _id: ID
    PayerId: ID
    nameOfAccount: String
    routingNumber: String
    accountNumber: String
    accountType:String
    address: String
    stripeKey: String
}

input AddPayerContactInput{
    PayerId: ID
    name: String
    position: String
    phoneNumber: String
    email:String
    isPrimary: Boolean
    isSecondary: Boolean
    type:String
}


input DeletePayerContactInput{
  PayerId: ID,
  _id: ID
}

input UpdatePayerContactInput{
    _id: ID
    PayerId: ID
    name: String
    position: String
    phoneNumber: String
    email:String
    isPrimary: Boolean
    isSecondary: Boolean
    type:String
}
`

export default schema
