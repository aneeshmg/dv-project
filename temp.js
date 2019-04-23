// const db = require('./src/server/db')

// db.connectToDatabase().then(() => {
//     const dbCon = db.getDb()
// })
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017', (err, _db) => {
    if (err) throw err
    db = _db.db('dv')
    console.log("Connected successfully to db...")


    // db.collection('reviews_to_db').find({date: '/.*/'}).toArray((er, data) => {
    //     console.log(data)
    //     _db.close()
    // })

    // Requires official MongoShell 3.6+

    db.collection('reviews_to_db').find({ 
        business_id: "zvO-PJCpNk4fgAVUnExYAA", 
        "$expr": { "$eq": [{ "$year": "$date" }, 2010] } 
    }).toArray((err, data) => {
        console.log(data.reduce((ac, cu) => ac += parseFloat(cu.score), 0))
    })

    _db.close()

})