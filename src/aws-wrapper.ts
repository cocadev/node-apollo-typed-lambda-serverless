/* tslint:disable-next-line */
require('module-alias/register')
import injector from './core/injector'
import {Server} from './server'
// import * as mongoose from 'mongoose'
//
// mongoose.connect('mongodb://172.31.11.148/poemDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

let server: Server
server = injector.get(Server)
server.initServer(injector)
const apolloServer = server.getApolloInstance()
export = apolloServer
