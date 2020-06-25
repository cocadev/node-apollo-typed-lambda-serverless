import {Todo} from '../../interfaces/types'
import {AbstractLogger} from '../../core/logger/AbstractLogger'
import {Injectable} from 'injection-js'
import * as db from '../../sequelize/models/index'

@Injectable()
export class TodosService {
  constructor(private logger: AbstractLogger) {}
  public getTodos(name?: string): Promise<Todo[]> {
    this.logger.info('Returning all todos...')

    return new Promise((resolve) => {
      db['Todo'].findAll({}).then((todos) => {
        resolve(todos)
      })
    })
  }
}
