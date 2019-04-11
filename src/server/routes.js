const router = require('express').Router()
const handlers = require('./routeHandlers')

router.get('/', handlers.index)
router.get('/businesses/', handlers.getBusinessNames)
router.get('/businesses/:minLat/:maxLat/:minLong/:maxLong', handlers.getBusinessesInArea)

module.exports = router