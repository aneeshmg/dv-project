const Baray = require('baray')
const config = require('./config')

module.exports = new Baray({
    appName: config.appName,
    console: true,
    json: false,
    color: true,
    path: `${__dirname}/logs`
})