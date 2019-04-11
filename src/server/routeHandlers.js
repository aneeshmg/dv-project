const db = require('./db')

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

module.exports = {
    index,
    getBusinessNames,
    getBusinessesInArea
}