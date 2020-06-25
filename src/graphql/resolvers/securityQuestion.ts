import {MutationAddNewSecurityQuestionArgs, SecurityQuestion} from '../../interfaces/types'
import {SecurityQuestionsService} from '../../services/securityQuestions/SecurityQuestionsService'
import {IAppContext} from '../../interfaces/IAppContext'

const resolveFunctions = {
  Query: {
    getSecurityQuestions(_, args, context: IAppContext): Promise<SecurityQuestion[]> {
      const securityQuestionsService: SecurityQuestionsService = context.securityQuestionsService

      return securityQuestionsService.getSecurityQuestions()
    }
  },
  Mutation: {
    addNewSecurityQuestion(
      _,
      args: MutationAddNewSecurityQuestionArgs,
      context: IAppContext
    ): Promise<SecurityQuestion> {
      const securityQuestionsService: SecurityQuestionsService = context.securityQuestionsService

      return securityQuestionsService.addRecord(args.question)
    }
  }
}

export default resolveFunctions
