const fastCsv = require('fast-csv')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const MongoClient = require('mongodb').MongoClient

const fullFile = '../../data/reviews_to_db.csv'
const fullFileOut = '../../data/SentimentOverTime.csv'

let business_ids = new Set()
let years = new Set()
let i = 0
let rows = []

const csvWriter = createCsvWriter({
    path: fullFileOut,
    header: [{
        business_id: 'business_id',
        year : 'year',
        score : 'score'
    }]
})


const istream = fs.createReadStream(fullFile)

let csvStream = fastCsv().on('data', data => {
    // console.log(i)
    let year = data[6].split('-')[0]
    business_ids.add(data[1])
    if (parseInt(year) > 2010) years.add(year)
    // if (++i > 100) csvStream.pause()
    // console.log('-------')


}).on('end', () => {
    business_ids = getRandomSubarray([...business_ids], 10)
    years = [...years]
    // console.log(business_ids.length)
    // console.log(years)
    let db

    MongoClient.connect('mongodb://localhost:27017', (err, _db) => {
        if (err) throw err
        db = _db.db('dv')

        console.log('Connected to db..')

        let numberOfBusinesses = business_ids.length
        let numberOfYears = years.length

        for (let i = 0; i < numberOfBusinesses; i++) {

            for (let j = 0; j < numberOfYears; j++) {

                db.collection('reviews_to_db').find({
                    business_id: business_ids[i],
                    "$expr": {
                        "$eq": [{
                            "$year": "$date"
                        }, parseInt(years[j])]
                    }
                }).toArray((err, data) => {

                    let n = data.length
                    let score = 0
                    for (let k = 0; k < n; k++) {
                        score += parseFloat(data[k].score)
                    }
                    
                    rows.push({
                        business_id : business_ids[i],
                        year : years[j],
                        score : score
                    })

                })
            }
            console.log(rows.length)

        }
        console.log('Finally rowcount', rows.length)

        csvWriter.writeRecords(rows).then(() => {
            console.log(`Wrote to file..${++i}`)
        })

        _db.close()
    })


    console.log('END')
})

istream.pipe(csvStream)


const getRandomSubarray = (arr, size) => {
    var shuffled = arr.slice(0),
        i = arr.length,
        temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}