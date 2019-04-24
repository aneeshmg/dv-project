const MongoClient = require('mongodb').MongoClient
const config = require('./config')
const log = require('./logger')

let _db

const mongoConnect = callback => {
  MongoClient.connect(
      `mongodb://localhost/${config.dbName}`
    )
    .then(client => {
      log.info('Connected!')
      _db = client.db()
      callback()
    })
    .catch(err => {
      log.error(err)
      throw err
    })
};

const getDb = () => {
  if (_db) {
    return _db
  }
  throw 'No database found!'
}


module.exports = {
  mongoConnect,
  getDb
}