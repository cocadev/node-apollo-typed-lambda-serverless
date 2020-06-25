const schema = `
type ProviderBankAccount {
    _id: ID
    ProviderId: ID
    nameOnAccount: String
    routingNumber: String
    accountType: String
    address: [String]
    stripeKey: String
    depositAmount1: Float
    depositAmount2: Float
    accountVerified: Boolean
    accountVerifyDate: String
}

type ProviderContact {
    _id: ID
    ProviderId: ID
    name: String
    position: String
    phoneNumber: String
    email: String
    primaryParentId: Int
    secondaryParentId: Int
    type:String
}

type ProviderCreditCard{
    _id: ID
    ProviderId: ID
    cardType: String
    nameOnCard: String
    cardNumber: String
    expiryMonth: String
    expiryYear: String
    cvvNumber: String
    billingAddress: String
    cardBrand: String
    cardLevel: String
    stripeKey: String
}

type ProviderEntity{
    _id: ID
    ProviderId: ID
    npi: String
    name: String
    type: String
    entityType: String
}

type Provider {
    id: ID
    PatientId: ID
    institutionName: String
    businessAddressForNotices: String
    taxId: Boolean
    npi: Boolean
    institutionType: String
    ownerShip: String
    phoneNumber: String
    paymentFrom: String
    providerBankAccount: ProviderBankAccount
    providerContact: ProviderContact
    providerCreditCard: ProviderCreditCard
    providerEntity: ProviderEntity
}

# the schema allows the following query:
type Query {
    getProvider(id: ID): Provider
    getProviderBankAccount(ProviderId: ID) : [ProviderBankAccount]
    getProviderContacts(ProviderId: ID) : [ProviderContact]
    getProviderCreditCard(ProviderId: ID): [ProviderCreditCard]
    getProviderEntity(ProviderId: ID): [ProviderEntity]
}

type Mutation {
    updateProvider(input:UpdateProviderInput!):CustomResponse
    addProvider(input:AddProviderInput!):CustomResponse
    addProviderBankAccount(input: AddProviderBankAccountInput!) : CustomResponse
    deleteProviderBankAccount(input: DeleteProviderBankAccountInput!) : CustomResponse
    updateProviderBankAccount(input: UpdateProviderBankAccountInput!) : CustomResponse

    addProviderContact(input: AddProviderContactInput!) : CustomResponse
    deleteProviderContact(input: DeleteProviderContactInput!) : CustomResponse
    updateProviderContact(input: UpdateProviderContactInput!) : CustomResponse

    addProviderCreditCard(input: AddProviderCreditCardInput!) : CustomResponse
    deleteProviderCreditCard(input: DeleteProviderCreditCardInput!) : CustomResponse
    updateProviderCreditCard(input: UpdateProviderCreditCardInput!) : CustomResponse

    addProviderEntity(input: AddProviderEntityInput!) : CustomResponse
    deleteProviderEntity(input: DeleteProviderEntityInput!) : CustomResponse
    updateProviderEntity(input: UpdateProviderEntityInput!) : CustomResponse
}

input AddProviderBankAccountInput{
    ProviderId: ID!,
    nameOnAccount: String!,
    routingNumber: String,
    accountNumber: String,
    accountType: String,
    address: [String],
    stripeKey: String,
    depositAmount1: Float,
    depositAmount2: Float,
    accountVerified: Boolean,
    accountVerifyDate: String,
}

input DeleteProviderBankAccountInput{
    ProviderId: ID,
    ProviderBankAccountId: ID
}

input UpdateProviderBankAccountInput{
    ProviderId: ID!,
    nameOnAccount: String!,
    routingNumber: String,
    accountNumber: String,
    accountType: String,
    address: [String],
    stripeKey: String,
    depositAmount1: Float,
    depositAmount2: Float,
    accountVerified: Boolean,
    accountVerifyDate: String
}

input AddProviderContactInput{
    ProviderId: ID!,
    name: String!,
    position: String,
    phoneNumber: String,
    email: String,
    primaryParentId: Int,
    secondaryParentId: Int,
    type: String
}

input DeleteProviderContactInput{
    ProviderId: ID,
    ProviderContactId: ID
}

input UpdateProviderContactInput{
    ProviderId: ID!,
    name: String!,
    position: String,
    phoneNumber: String,
    email: String,
    primaryParentId: Int,
    secondaryParentId: Int,
    type: String
}
input AddProviderCreditCardInput{
    ProviderId: ID!,
    cardType: String!,
    nameOnCard: String,
    cardNumber: String,
    expiryMonth: String,
    expiryYear: String,
    cvvNumber: String,
    billingAddress: String,
    cardBrand: String,
    cardLevel: String,
    stripeKey: String
}

input DeleteProviderCreditCardInput{
    ProviderId: ID,
    ProviderCreditCardId: ID
}

input UpdateProviderCreditCardInput{
    ProviderId: ID!,
    cardType: String!,
    nameOnCard: String,
    cardNumber: String,
    expiryMonth: String,
    expiryYear: String,
    cvvNumber: String,
    billingAddress: String,
    cardBrand: String,
    cardLevel: String,
    stripeKey: String
}
input AddProviderEntityInput{
    ProviderId: ID!,
    npi: String!,
    name: String,
    type: String,
    entityType: String
}
input AddProviderInput{
    PatientId: ID,
    institutionName: String,
    businessAddressForNotices: String,
    taxId: Boolean,
    npi: Boolean,
    institutionType: String,
    ownerShip: String,
    phoneNumber: String,
    paymentFrom: String,

}
input UpdateProviderInput{
    id:ID
    PatientId: ID,
    institutionName: String,
    businessAddressForNotices: String,
    taxId: Boolean,
    npi: Boolean,
    institutionType: String,
    ownerShip: String,
    phoneNumber: String,
    paymentFrom: String,
}

input DeleteProviderEntityInput{
    ProviderId: ID,
    ProviderEntityId: ID
}

input UpdateProviderEntityInput{
    ProviderId: ID!,
    npi: String!,
    name: String,
    type: String,
    entityType: String
}
`

export default schema
