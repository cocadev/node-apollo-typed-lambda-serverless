export interface IPatientInsurance {
  PatientId?: string
  planName?: string
  planIssuer?: string
  planEffectiveDate?: string
  nameOnCard?: string
  memberId?: string
  groupPlanId?: string
  planAddress?: string
  csNo?: string
  providerSupportPhoneNumber?: string
  patientSupportPhoneNumber?: string
  areYouPrimary?: boolean
  // emailPrimary?: {type?:string;validator?: EmailValidator},
  emailPrimary?: string
  isVerifiedByPrimary?: boolean
  isFinancialResponsible?: boolean
  financialResponsibleName?: string
  financialResponsibleRelation?: string
  financialResponsibleAddress?: string
  cardFrontImage?: string
  cardBackImage?: string
  insuranceType?: string //ENUM('Medical’, ‘Dental’, ‘Vision’), default?: 'Default'
  isOutOfPocketMaxInNetWorkBenefits?: boolean
  individualDedPktMaxInNetBenefits?: number
  individualOutOfPktMaxInNetBenefits?: number
  familyDedPktMaxInNetBenefits?: number
  familyOutOfPktMax?: number
  isOutOfNetworkBenefits?: boolean
  individualDedOutOfNetBenefits?: number
  individualOutOfPktMaxOfNetBenefits?: number
  familyDedOutOfNetBenefits?: number
  familyOutOfPocketMax?: number
  finalDedutible?: number
  prePay?: number
  ppi?: number
  buffer?: number
  totalToPay?: number
}
