//const MongoClient = require('mongodb').MongoClient
const config = require('./config')
const logger = require('./logger')

// let _db

// module.exports = {
//     // TODO: verify this properly - promise, error handling, singleton, logging *?
//     connectToDatabase: () => {
//         return new Promise((res, rej) => {
//             MongoClient.connect(`mongodb://localhost/${config.dbName}`).then(db => {
//                 logger.info('Connected to db.')
//                 _db = db
//                 res();
//             }).catch(err =>{
//                 logger.error('Failed to connect to database: ', err)
//             })
//         })
//       },
//     getDb: () => {
//         console.log('here came !!!!!!!!' +_db);
//         return _db;
//     }

// }

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    `mongodb://localhost/${config.dbName}`
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
