const router = require('express').Router()
const handlers = require('./routeHandlers')

router.get('/', handlers.index)
router.get('/businesses/', handlers.getBusinesses)

module.exports = router