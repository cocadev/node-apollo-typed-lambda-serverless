'use strict'

import * as fs from 'fs'
import * as path from 'path'
var _Sequelize = require('sequelize')
// import * as _Sequelize from 'sequelize-cockroachdb'

const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || 'development'
import * as _config from '../config.json'
const config = _config[env]

const db: any = {}

// if (config.use_env_variable) {
//   const sequelize = new _Sequelize(process.env[config.use_env_variable]);
// } else {
const sequelize = new _Sequelize(config.database, config.username, config.password, config)
// }

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename
  })
  .forEach((file) => {
    console.log('==> file: ' + file)
    if (file.slice(-3) !== '.js') {
      return
    }
    const model = sequelize.import(path.join(__dirname, file))
    // db[model.name] = model;
    Object.defineProperty(db, model.name, {
      value: model,
      writable: true
    })
  })

// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize
db.Sequelize = _Sequelize

module.exports = db
