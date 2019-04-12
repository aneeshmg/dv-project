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
      console.log("Inside the func");
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
