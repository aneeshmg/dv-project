const Business = require('./models/Business.js')
const dbPool = require('./db')
const log = require('./logger')

const index = (req, res) => {
    res.send("it works")
}

const getBusinessInfo = (req, res) => {
    const bussid = req.params.BussID;
    Business.findById(bussid)
        .then(busobj => {
            if (!busobj) {
                return res.redirect('/');
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
}

const getAllBusinesses = (req, res) => {
    Business.fetchAll()
        .then(busobj => {
            if (!busobj) {
                return res.redirect('/');
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
}

const getBusinessesbycoord = (req, res) => {
    const lat1 = req.params.lat1;
    const long1 = req.params.long1;
    const lat2 = req.params.lat2;
    const long2 = req.params.long2;
    log.info(lat2);
    Business.findWithinLoc(lat1, long1, lat2, long2)
        .then(busobj => {
            if (!busobj) {
                return res.redirect('/');
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
}

const getBusinessesbyName = (req, res) => {
    const Bizname = req.params.Bizname;
    Business.findByBuzName(Bizname)
        .then(busobj => {
            if (!busobj) {
                return res.redirect('/');
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
}

const getSentiments = (req, res) => {
    const db = dbPool.getDb()

    db.collection('main').find({
        business_id: req.params.business_id,
        date: req.params.year
    }, {
        business_name : 1,
        sentiment_score: 1
    }).toArray((err, data) => {
        if (err) {
            log.error(err)
            throw err
        }
        if (data == null || data.length == 0) res.json({})
        else {
            let score = data.reduce((ac, cu) => ac += parseFloat(cu.sentiment_score), 0)
            res.json({
                business_id: req.params.business_id,
                year: req.params.year,
                business_name: data[0].business_name,
                sentiment_score: score
            })
        }
    })
}

const getKeyTerms = (req, res) => {
    const db = dbPool.getDb()

    db.collection('business_with_positives').find({
        business_id : req.params.business_id
    }, {
        positives : 1,
        name : 1,
        negatives : 1
    }).toArray((err, data) => {
        if (err) {
            log.error(err)
            throw err
        }
        if (data == null || data.length == 0) res.json({})
        else {
            let positives = data[0].positives.split(' ')
            let negatives = data[0].negatives.split(' ')
            res.json({
                business_id : req.params.business_id,
                business_name : data[0].name,
                positives : positives,
                negatives : negatives
            })
        }
    })

}

const getRatings = (req, res) => {
    const db = dbPool.getDb()

    // TODO: fix rating once db is ready
    db.collection('main').find({
        business_id: req.params.business_id,
        date: req.params.year
    }).toArray((err, data) => {
        if (err) {
            log.error(err)
            throw err
        }
        if (data == null || data.length == 0) res.json({})
        else {
            let o = data.map(e => {
                return {
                    business_id : req.params.business_id,
                    reviewer_id : e.user_id,
                    business_name : e.business_name,
                    impact_score : e.impact_score,
                    year: e.date,
                    rating: Math.floor(Math.random() * 5) + 1 
                }
            })
            console.log(o)
            res.send(o)
        }
    })
}


module.exports = {
    index,
    getBusinessInfo,
    getBusinessesbycoord,
    getBusinessesbyName,
    getAllBusinesses,
    getSentiments,
    getKeyTerms,
    getRatings
}