const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const logger = require('./logger')
const routes = require('./routes')
const handler1 = require('./routeHandlers');
const db = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/', routes)
// app.use(handler1);

// db.connectToDatabase()
//     .then(message => logger.info(message))
//     .catch(err => logger.error(err))

module.exports = app