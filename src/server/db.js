const MongoClient = require('mongodb').MongoClient
const config = require('./config')
const logger = require('./logger')

let _db

module.exports = {
    // TODO: verify this properly - promise, error handling, singleton, logging *?
    connectToDatabase: () => {
        return new Promise((res, rej) => {
            MongoClient.connect(`mongodb://localhost/${config.dbName}`).then(db => {
                logger.info('Connected to db.')
                _db = db
                res();
            }).catch(err => {
                logger.error('Failed to connect to database: ', err)
            })
        })
      },
    getDb: () => {
        return _db;
    }

}