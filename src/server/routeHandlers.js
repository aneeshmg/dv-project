const db = require('./db')

const index = (req, res) => {
    res.send("it works")
}

const getBusinesses = (req, res) => {
    let businesses = [{
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
    res.json(businesses)
}

module.exports = {
    index,
    getBusinesses
}