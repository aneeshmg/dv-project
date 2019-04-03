const router = require('express').Router()
const handlers = require('./routeHandlers')

router.get('/', handlers.index)

module.exports = router