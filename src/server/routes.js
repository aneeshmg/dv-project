const router = require('express').Router()
const handlers = require('./routeHandlers')

router.get('/', handlers.index)
router.get('/getbusinessbyID/:BussID',handlers.getBusinessInfo)
router.get('/getBusinessesWithinLoc/:lat1/:long1/:lat2/:long2',handlers.getBusinessesbycoord)
router.get('/getbusinessbyname/:Bizname',handlers.getBusinessesbyName)
router.get('/getbusinesses/',handlers.getAllBusinesses)
router.get('/getbusinessesbynamecitystate/:Bizname/:Bizcity/:Bizstate',handlers.getBusinessesbyNameCityState)

router.get('/sentiment/:business_id/:year', handlers.getSentiments)

router.get('/positives/:business_id', handlers.getPositiveTerms)
router.get('/negatives/:business_id', handlers.getNegativeTerms)

router.get('/ratings/:business_id/:year', handlers.getRatings)

router.get('/topics/good/:business_id/:year', handlers.getGoodTopics)
router.get('/topics/bad/:business_id/:year', handlers.getBadTopics)

module.exports = router