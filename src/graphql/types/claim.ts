const schema = `



type Claim {
    id: ID
    PatientId: ID
    ProviderId: ID
    ActivityId:String
    payToTaxID:String
    providerEntityId:String
    billingEntityId:String
    claimType: String
    coPay:Float
    estimatedCoPay: Float
    diffCoPay: Float
    deductible: Float
    estimatedDeductible: Float
    diffDeductible: Float
    coInsurance: Float
    estimatedCoInsurance: Float
    diffCoInsurance: Float
    selfPay: Float
    estimatedSelfPay: Float
    diffSelfPay: Float
    adjustments: Float
    estimatedAdjustments: Float
    diffAdjustments: Float
    total: Float
    isOutOfNetwork: Boolean
    isApprovedByPatient: Boolean
    approvedByPatientTime: String
    parentClaimId: Int
    status: String
    isActive: Boolean
    isPaidByPatient:Boolean
    isSeenByPatient: Boolean
    isCompleted: Boolean
    isPoemDiscount:Boolean
    isHeartFlag: Boolean
    isInGiftProcess: Boolean
    isGiftReceived: Boolean
    patientPaidAmount: Float
    patientBalanceAmount: Float
    providerPaidAmount: Float
    providerBalanceAmount: Float
    claimDetails: ClaimDetail
  }
  type ClaimDetail {
      ClaimId: String
      serviceLocationAddress: String
      providerGenratedId: String
      insuranceGenratedId: String
      dateOfAppointment: String
      dateOfServiceFrom: String
      dateOfServiceTo: String
      outOfNetwork: Float
      notCovered: Float
      noPriorAuthorization: Float
      denied: Float
      charity: Float
      writeOff: Float
      rebate: Float
      coupon: Float
      other: Float
      unbundlling: String
      duplicate: String
      billed: String
      approved: String
      contractAssignment:String
      claimDescription:String
      selfNote: String
      payerNote: String
      providerBillingNote: String
      attachments: [Attachment]
  }
type Query {
    getClaim(ClaimId: ID): Claim
    claimsForApp(PatientId: ID, lastUpdate: String): [Claim]
  }
type Mutation {
    createEstimatedClaim(input:CreateEstimatedClaimInput!): CustomResponse
    updateEstimatedClaim(input:UpdateEstimatedClaimInput!): CustomResponse
    createFinalClaim(input:CreateFinalClaimInput!): CustomResponse
    updateFinalClaim(input:UpdateFinalClaimInput!): CustomResponse
}

input CreateEstimatedClaimInput{
    PatientId: String
    ProviderId: String
    dateOfAppointment: String
    dateOfServiceFrom: String
    dateOfServiceTo: String
    providerEntityId: String
    billingEntityId: String
    coPay: Float
    deductible: Float
    coInsurance: Float
    selfPay: Float
    total: Float
    isOutOfNetwork: Boolean
}
input UpdateEstimatedClaimInput{
    ClaimId: String
    dateOfAppointment: String
    dateOfServiceFrom: String,
    dateOfServiceTo: String,
    coPay: Float,
    deductible: Float,
    coInsurance: Float,
    selfPay: Float,
    total: Float,
    isOutOfNetwork: Boolean
}
input CreateFinalClaimInput{
    PatientId: String
    ProviderId: String
    dateOfAppointment: String
    dateOfServiceFrom: String
    dateOfServiceTo: String
    providerEntityId: String
    billingEntityId: String
    coPay: Float,
    deductible: Float,
    coInsurance: Float,
    selfPay: Float,
    total: Float,
    isOutOfNetwork: Boolean
}

input UpdateFinalClaimInput{
    ClaimId: String
    coPay: Float,
    deductible: Float,
    coInsurance: Float,
    outOfNetwork: Float,
    notCovered: Float,
    noPriorAuthorization: Float,
    denied: Float,
    total: Float,
    charity: Float,
    writeOff: Float,
    rebate: Float,
    coupon: Float,
    other: Float,
    isHeartFlag: Boolean,
    selfNote: String
}

`

export default schema
