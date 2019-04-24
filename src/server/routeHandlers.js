const db = require('./db')
const Business = require('./models/Business.js');
const MongoClient = require('mongodb').MongoClient

const index = (req, res) => {
    res.send("it works")
}

const getBusinessInfo = (req, res) => {
    //console.log('HERE REACHED');
    const bussid = req.params.BussID;
    //console.log(bussid);
    Business.findById(bussid)
    // Product.findById(prodId)
    .then(busobj => {
      if (!busobj) {
        return res.redirect('/');
      }
      res.json(busobj);
    })
    .catch(err => console.log(err));
}

const getAllBusinesses = (req, res) => {
    //console.log('HERE REACHED');
    //const bussid = req.params.BussID;
    //console.log(bussid);
    Business.fetchAll()
    // Product.findById(prodId)
    .then(busobj => {
      if (!busobj) {
        return res.redirect('/');
      }
      res.json(busobj);
    })
    .catch(err => console.log(err));
}

const getBusinessesbycoord = (req, res) => {
    //console.log('LOCA CHECK REACHED');
    const lat1 = req.params.lat1;
    const long1 = req.params.long1;
    const lat2 = req.params.lat2;
    const long2 = req.params.long2;
    console.log(lat2);
    Business.findWithinLoc(lat1,long1,lat2,long2)
    // Product.findById(prodId)
    .then(busobj => {
      if (!busobj) {
        return res.redirect('/');
      }
      res.json(busobj);
    })
    .catch(err => console.log(err));
}

const getBusinessesbyName = (req, res) => {
    //console.log('LOCA CHECK REACHED');
    const Bizname = req.params.Bizname;
    Business.findByBuzName(Bizname)
    // Product.findById(prodId)
    .then(busobj => {
      if (!busobj) {
        return res.redirect('/');
      }
      res.json(busobj);
    })
    .catch(err => console.log(err));
}

const getSentiments = (req, res) => {
    MongoClient.connect('mongodb://localhost:27017', (err, _db) => {
        if (err) throw err
        db = _db.db('dv')

        db.collection('reviews_to_db').find({ 
            business_id: req.params.business_id, 
            date: parseInt(req.params.year) 
        }).toArray((err, data) => {
            if (data == null) res.json({})
            else {
                let score = data.reduce((ac, cu) => ac += parseFloat(cu.score), 0)
                res.json({
                    business_id : req.params.business_id,
                    year: req.params.year,
                    sentiment_score: score
                })
            }
        })
        _db.close()
    })
}

module.exports = {
    index,
    getBusinessNames,
    getBusinessesInArea,
    getBusinessInfo,
    getBusinessesbycoord,
    getBusinessesbyName,
    getAllBusinesses,
    getSentiments
}