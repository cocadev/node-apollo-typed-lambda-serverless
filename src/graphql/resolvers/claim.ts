import {
  MutationCreateEstimatedClaimArgs,
  CustomResponse,
  MutationUpdateEstimatedClaimArgs,
  MutationCreateFinalClaimArgs,
  MutationUpdateFinalClaimArgs,
  QueryGetClaimArgs,
  QueryClaimsForAppArgs,
  Claim,
  ClaimDetail
} from '../../interfaces/types'
import {ClaimService} from '../../services/claim/ClaimService'
import {IAppContext} from '../../interfaces/IAppContext'
const resolveFunctions = {
  Claim: {
    claimDetails(claim: Claim, args, context: IAppContext): Promise<ClaimDetail> {
      const claimService: ClaimService = context.claimService

      return claimService.getClaimDetail(claim.id)
    }
  },
  Query: {
    getClaim(_, args: QueryGetClaimArgs, context: IAppContext): Promise<Claim> {
      const claimService: ClaimService = context.claimService

      return claimService.getClaim(args.ClaimId)
    },
    claimsForApp(_, args: QueryClaimsForAppArgs, context: IAppContext): Promise<Claim[]> {
      const claimService: ClaimService = context.claimService

      return claimService.claimsForApp(args.PatientId, args.lastUpdate)
    }
  },
  Mutation: {
    createEstimatedClaim(
      _,
      args: MutationCreateEstimatedClaimArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const claimService: ClaimService = context.claimService

      return claimService.createEstimatedClaim(args.input)
    },
    updateEstimatedClaim(
      _,
      args: MutationUpdateEstimatedClaimArgs,
      context: IAppContext
    ): Promise<CustomResponse> {
      const claimService: ClaimService = context.claimService

      return claimService.updateEstimatedClaim(args.input)
    },
    createFinalClaim(_, args: MutationCreateFinalClaimArgs, context: IAppContext): Promise<CustomResponse> {
      const claimService: ClaimService = context.claimService

      return claimService.createFinalClaim(args.input)
    },
    updateFinalClaim(_, args: MutationUpdateFinalClaimArgs, context: IAppContext): Promise<CustomResponse> {
      const claimService: ClaimService = context.claimService

      return claimService.updateFinalClaim(args.input)
    }
  }
}

export default resolveFunctions
