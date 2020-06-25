import {QueryTodosArgs, Todo} from '../../interfaces/types'
import {TodosService} from '../../services/todos/TodosService'
import {IAppContext} from '../../interfaces/IAppContext'

const resolveFunctions = {
  Query: {
    todos(_, args: QueryTodosArgs, context: IAppContext): Promise<Todo[]> {
      const todosModel: TodosService = context.todosService

      return todosModel.getTodos(args.title)
    }
  }
}

export default resolveFunctions
