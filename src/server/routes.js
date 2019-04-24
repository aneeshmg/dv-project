const router = require('express').Router()
const handlers = require('./routeHandlers')

router.get('/', handlers.index)
router.get('/getbusinessbyID/:BussID',handlers.getBusinessInfo)
router.get('/getBusinessesWithinLoc/:lat1/:long1/:lat2/:long2',handlers.getBusinessesbycoord)
router.get('/getbusinessbyname/:Bizname',handlers.getBusinessesbyName)
router.get('/getbusinesses/',handlers.getAllBusinesses)

router.get('/sentiment/:business_id/:year', handlers.getSentiments)

module.exports = router