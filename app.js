const server = require('./src/server/server')
const logger = require('./src/server/logger')
const config = require('./src/server/config')
const mongoConnect = require('./src/server/db').mongoConnect



mongoConnect(() => {
    server.listen(config.port, () => { logger.info(`Application running on ${config.port}`)})
  })