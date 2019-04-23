const MongoClient = require('mongodb').MongoClient

const index = (req, res) => {
    res.send("it works")
}

const getBusinessNames = (req, res) => {
    let data = [{
        'name' : "Name A",
        'business_id': "ID1"
    },
    {
        'name' : "Name B",
        'business_id': "ID2"
    },
    {
        'name' : "Name C",
        'business_id': "ID3"
    },
    {
        'name' : "Name D",
        'business_id': "ID4"
    },
    {
        'name' : "Name E",
        'business_id': "ID5"
    }]
    res.json(data)
}

const getBusinessesInArea = (req, res) => {
    let data = [{
        'name' : "Name A",
        'business_id': "ID1",
        'lat': req.params.minLat,
        'long': req.params.minLong
    },
    {
        'name' : "Name B",
        'business_id': "ID2",
        'lat': req.params.minLat,
        'long': req.params.minLong
    },
    {
        'name' : "Name C",
        'business_id': "ID3",
        'lat': req.params.minLat,
        'long': req.params.minLong
    },
    {
        'name' : "Name D",
        'business_id': "ID4",
        'lat': req.params.minLat,
        'long': req.params.minLong
    },
    {
        'name' : "Name E",
        'business_id': "ID5",
        'lat': req.params.minLat,
        'long': req.params.minLong
    }]
    res.json(data)
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
    getSentiments
}