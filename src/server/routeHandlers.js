const Business = require("./models/Business.js");
const dbPool = require("./db");
const log = require("./logger");

const index = (req, res) => {
    res.send("it works");
};

const getBusinessInfo = (req, res) => {
    const bussid = req.params.BussID;
    Business.findById(bussid)
        .then(busobj => {
            if (!busobj) {
                return res.redirect("/");
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
};

const getAllBusinesses = (req, res) => {
    Business.fetchAll()
        .then(busobj => {
            if (!busobj) {
                return res.redirect("/");
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
};

const getBusinessesbyNameCityState = (req, res) => {
    const Bizname = req.params.Bizname;
    const Bizcity = req.params.Bizcity;
    const Bizstate = req.params.Bizstate;
    Business.findByBiznamecitystate(Bizname, Bizcity, Bizstate)
        .then(busobj => {
            if (!busobj) {
                return res.redirect("/");
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
};

const getBusinessesbycoord = (req, res) => {
    const lat1 = req.params.lat1;
    const long1 = req.params.long1;
    const lat2 = req.params.lat2;
    const long2 = req.params.long2;
    log.info(lat2);
    Business.findWithinLoc(lat1, long1, lat2, long2)
        .then(busobj => {
            if (!busobj) {
                return res.redirect("/");
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
};

const getBusinessesbyName = (req, res) => {
    const Bizname = req.params.Bizname;
    Business.findByBuzName(Bizname)
        .then(busobj => {
            if (!busobj) {
                return res.redirect("/");
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
};

const getBusinessesbyNameCityState = (req, res) => {
    const Bizname = req.params.Bizname;
    const Bizcity = req.params.Bizcity;
    const Bizstate = req.params.Bizstate;
    Business.findByBiznamecitystate(Bizname, Bizcity, Bizstate)
        .then(busobj => {
            if (!busobj) {
                return res.redirect('/');
            }
            res.json(busobj);
        })
        .catch(err => log.error(err));
}

const getSentiments = (req, res) => {
    const db = dbPool.getDb();

    db.collection("main")
        .find({
            business_id: req.params.business_id,
            date: req.params.year
        }, {
            business_name: 1,
            sentiment_score: 1
        })
        .toArray((err, data) => {
            if (err) {
                log.error(err);
                throw err;
            }
            if (data == null || data.length == 0) res.json({});
            else {
                let score = data.reduce(
                    (ac, cu) => (ac += parseFloat(cu.sentiment_score)),
                    0
                );
                res.json({
                    business_id: req.params.business_id,
                    year: req.params.year,
                    business_name: data[0].business_name,
                    sentiment_score: score
                });
            }
        });
};

const getPositiveTerms = (req, res) => {
    const db = dbPool.getDb()

    db.collection('business_with_positives').find({
        business_id: req.params.business_id
    }, {
        name: 1,
        negatives: 1
    }).toArray((err, data) => {
        if (err) {
            log.error(err)
            throw err
        }
        if (data == null || data.length == 0) res.json({})
        else {
            let negatives = data[0].positives.split(' ').map(e => {
                let term = e.split(':')[0]
                let frequency = parseInt(e.split(':')[1]) == NaN ? 0 : parseInt(e.split(':')[1])
                return {
                    name: term,
                    weight: frequency
                }
            }).filter(e => e.name != "" && e.weight != null)
            res.json(negatives)
        }
    })
}

const getNegativeTerms = (req, res) => {
    const db = dbPool.getDb()

    db.collection('business_with_positives').find({
        business_id: req.params.business_id
    }, {
        name: 1,
        negatives: 1
    }).toArray((err, data) => {
        if (err) {
            log.error(err)
            throw err
        }
        if (data == null || data.length == 0) res.json({})
        else {
            let negatives = data[0].negatives.split(' ').map(e => {
                let term = e.split(':')[0]
                let frequency = parseInt(e.split(':')[1]) == NaN ? 0 : parseInt(e.split(':')[1])
                return {
                    name: term,
                    weight: frequency
                }
            }).filter(e => e.name != "" && e.weight != null && e.name != "nan")
            res.json(negatives)
        }
    })
}

const getRatings = (req, res) => {
    const db = dbPool.getDb();

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
                    business_id: req.params.business_id,
                    reviewer_id: e.user_id,
                    business_name: e.business_name,
                    impact_score: e.impact_score,
                    year: e.date,
                    rating: Math.floor(Math.random() * 5) + 1
                }
            })
            console.log(o)
            res.send(o)
        }
    })
}

const getTopics = (req, res) => {
    const db = dbPool.getDb()
    console.log(req.params)

    db.collection('main').find({
        business_id: req.params.business_id,
        date: parseInt(req.params.year)
    }, {
        _id: 0,
        user_id: 0,
        topic: 1,
        sentiment_score: 1,
        impact_score: 1,
        business_name: 0,
        review_text: 0
    }).toArray((err, data) => {
        if (err) {
            log.error(err)
            throw err
        }
        if (data == null || data.length == 0) res.json({})
        else {
            let goodTopics = data.filter(e => e.topic != '' && e.topic != null && e.sentiment_score != '' && e.sentiment_score != 'nan' && e.sentiment_score >= 0)
                .map(e => {
                    return {
                        text: e.review_text,
                        rating: e.stars,
                        name: e.topic,
                        value: parseInt(e.impact_score) * 30
                    }
                })
            let badTopics = data.filter(e => e.topic != '' && e.topic != null && e.sentiment_score != '' && e.sentiment_score != 'nan' && e.sentiment_score < 0)
                .map(e => {
                    return {
                        text: e.review_text,
                        rating: e.stars,
                        name: e.topic,
                        value: parseInt(e.impact_score) * 30
                    }
                })
            res.json([{
                name: 'Bad',
                data: badTopics
            }, {
                name: 'Good',
                data: goodTopics
            }])
        }
    })
}

module.exports = {
    index,
    getBusinessInfo,
    getBusinessesbycoord,
    getBusinessesbyName,
    getBusinessesbyNameCityState,
    getAllBusinesses,
    getSentiments,
    getPositiveTerms,
    getNegativeTerms,
    getRatings,
    getTopics
}