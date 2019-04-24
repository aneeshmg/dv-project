const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('e5098ceb-46b2-42c6-ac88-0e392bbcc74f');



async function start()
{
    var resp = await deepai.callStandardApi("text-tagging", {
        text: "Husband was craving Chicken Teriyaki & gyoza, so we found Musashi. I was very unimpressed. We started with gyoza and edamame. Neither were anything special. We then ordered a chicken teriyaki plate and a few sushi rolls. The chicken teriyaki was nothing more than some boiled chicken smothered in teriyaki sauce. Was not good at all. The sushi was mediocre at best. While they were friendly and the service was pretty good - I will not be back."
});
console.log(resp);
}

start();
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
