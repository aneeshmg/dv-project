const mongodb = require('mongodb');
const getDb = require('../db').getDb;

class Business {
  constructor(business_id, name, address, city, state, postal_code, latitude, longitude, stars, review_count,is_open, attributes, categories, hours) {

    this.business_id = business_id;
    this.name= name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.latitude = latitude;
    this.longitude = longitude;
    this.stars = stars;
    this.review_count = review_count;
    this.is_open = is_open;
    this.attributes = attributes;
    this.categories = categories;
    this.hours = hours
    this._id = id ? new mongodb.ObjectId(id) : null;
    
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection('businesses')
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection('businesses').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('businesses')
      .find()
      .toArray()
      .then(businesses => {
        console.log(businesses);
        return businesses;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(BussID) {
      //console.log("Inside the func");
    const db = getDb();
    return db
      .collection('businesses')
      .find({ business_id: BussID })
      .next()
      .then(business => {
        console.log(business);
        return business;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findByBuzName(Buzname) {
    //console.log("Inside the func");
  const db = getDb();
  return db
    .collection('businesses')
    .find({ name: Buzname })
    .toArray()
    .then(business => {
      console.log(business);
      return business;
    })
    .catch(err => {
      console.log(err);
    });
}


static findByBiznamecitystate(Bizname,Bizcity,Bizstate) {
  //console.log("Inside the func");
const db = getDb();
return db
  .collection('businesses')
  .find({ name: Bizname, city : Bizcity,  state: Bizstate }, { projection: { _id: 0, business_id : 1 } })
  .toArray()
  .then(business => {
    console.log(business);
    return business;
  })
  .catch(err => {
    console.log(err);
  });
}

  static findWithinLoc(lat1,long1,lat2,long2) {
    //console.log("Inside the func");
  const db = getDb();
  return db
    .collection('businesses')//.find({longitude: { $lt: -70 }})
    .find({$and:[{latitude : {$lte :parseFloat(lat2), $gte : parseFloat(lat1)}}, {longitude : {$lte :parseFloat(long2), $gte : parseFloat(long1)}}]})
    .toArray()
    .then(restaurants => {
      console.log(restaurants);
      return restaurants;
    })
    .catch(err => {
      console.log(err);
    });
}

  static deleteById(BussID) {
    const db = getDb();
    return db
      .collection('businesses')
      .deleteOne({ business_id: BussID })
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Business;
