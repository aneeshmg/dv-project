const db = require('./db')
const Business = require('./models/Business.js');

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
module.exports = {
    index,
    getBusinessNames,
    getBusinessesInArea,
    getBusinessInfo,
    getBusinessesbycoord,
    getBusinessesbyName,
    getAllBusinesses
}