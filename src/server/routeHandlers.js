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

    db.collection('reviews_to_db').find({
        business_id: req.params.business_id,
        date: parseInt(req.params.year)
    }).toArray((err, data) => {
        if (err) {
            log.error(err)
            throw err
        }
        if (data == null) res.json({})
        else {
            let score = data.reduce((ac, cu) => ac += parseFloat(cu.score), 0)
            res.json({
                business_id: req.params.business_id,
                year: req.params.year,
                sentiment_score: score
            })
        }
    })
}

const getKeyTerms = (req, res) => {
    const db = dbPool.getDb()


}


module.exports = {
    index,
    getBusinessInfo,
    getBusinessesbycoord,
    getBusinessesbyName,
    getAllBusinesses,
    getSentiments
}