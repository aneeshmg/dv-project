const router = require("express").Router();
const handlers = require("./routeHandlers");

<<<<<<< Updated upstream
router.get('/', handlers.index)
router.get('/getbusinessbyID/:BussID',handlers.getBusinessInfo)
router.get('/getBusinessesWithinLoc/:lat1/:long1/:lat2/:long2',handlers.getBusinessesbycoord)
router.get('/getbusinessbyname/:Bizname',handlers.getBusinessesbyName)
router.get('/getbusinesses/',handlers.getAllBusinesses)
router.get('/getbusinessesbynamecitystate/:Bizname/:Bizcity/:Bizstate',handlers.getBusinessesbyNameCityState)
=======
router.get("/", handlers.index);
router.get("/getbusinessbyID/:BussID", handlers.getBusinessInfo);
router.get(
  "/getBusinessesWithinLoc/:lat1/:long1/:lat2/:long2",
  handlers.getBusinessesbycoord
);
router.get("/getbusinessbyname/:Bizname", handlers.getBusinessesbyName);
router.get("/getbusinesses/", handlers.getAllBusinesses);
router.get(
  "/getbusinessesbynamecitystate/:Bizname/:Bizcity/:Bizstate",
  handlers.getBusinessesbyNameCityState
);
>>>>>>> Stashed changes

router.get("/sentiment/:business_id/:year", handlers.getSentiments);

<<<<<<< Updated upstream
router.get('/positives/:business_id', handlers.getPositiveTerms)
router.get('/negatives/:business_id', handlers.getNegativeTerms)
=======
router.get("/positivesNegatives/:business_id", handlers.getKeyTerms);
>>>>>>> Stashed changes

router.get("/ratings/:business_id/:year", handlers.getRatings);

<<<<<<< Updated upstream
router.get('/topics/:business_id/:year', handlers.getTopics)

module.exports = router
=======
module.exports = router;
>>>>>>> Stashed changes
