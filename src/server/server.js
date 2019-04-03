const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const logger = require('./logger')
const routes = require('./routes')
const db = require('./db')

const app = express()

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/', routes)

db.connectToDatabase()
    .then(message => logger.info(message))
    .catch(err => logger.error(err))

module.exports = app