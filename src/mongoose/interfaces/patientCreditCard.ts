export interface IPatientCreditCard {
  PatientId?: string
  cardType?: string
  nameOnCard?: string
  cardNumber?: string
  expiryDateMonYrs?: string
  cvvNumber?: string
  billingAddress?: string
  cardBrand?: string
  cardLevel?: string
  stripeKey?: string
  isPreferred?: boolean
}
