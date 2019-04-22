"use strict";
// This will parse the reviews_compressed.csv, preprocess each review, find topics in each review, compute a sentiment score to each and put to database.

const fastCsv = require('fast-csv')
const fs = require('fs')
const lda = require('lda')
const {
    SentimentAnalyzer
} = require('node-nlp')
const sentiment = new SentimentAnalyzer({
    language: 'en'
})
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const fullFile = '../../data/review_compressed.csv'
const fullFileOut = '../../data/reviews_to_db.csv'
const sampleFile = '../../data/reviews_sample.csv'
const superSample = '../../data/super_sample.csv'
const superSampleOut = '../../data/super_sample_out.csv'

const NUM_TOPICS = 1
const TERMS_PER_TOPIC = 1
let i = 0
let records = []

const istream = fs.createReadStream(fullFile)

const csvWriter = createCsvWriter({
    path: fullFileOut,
    header: [{
            id: 'user_id',
            title: 'user_id'
        },
        {
            id: 'business_id',
            title: 'business_id'
        },
        {
            id: 'review_id',
            title: 'review_id'
        },
        {
            id: 'review_text',
            title: 'review_text'
        },
        {
            id: 'topic',
            title: 'topic'
        },
        {
            id: 'score',
            title: 'score'
        },
        {
            id: 'date',
            title: 'date'
        }
    ]
})

let csvStream = fastCsv().on('data', data => {
    let review_text = data[9]
    let user_id = data[3]
    let business_id = data[4]
    let review_id = data[2]
    let date = data[10]

    if (review_text.length > 100 && business_id != undefined && date != undefined) {
        let docs = review_text.match(/[^\.!\?]+[\.!\?]+/g)

        let t = lda(docs, NUM_TOPICS, TERMS_PER_TOPIC)[0]
        if (t) {
            if (t[0]) {
                let topic = t[0].term

                // console.log(++i, ' topic', topic)
                if (++i % 1000 == 0) console.log(i, 'record created')

                let result = sentiment.getSentiment(review_text)
                // console.log('score: ', result.score, ' comparative: ', result.comparative)
                // console.log('---')
                let record = {
                    user_id: user_id,
                    business_id: business_id,
                    review_id: review_id,
                    review_text: review_text,
                    topic: topic,
                    score: result.score,
                    date: date
                }
                records.push(record)

                if (i % 1000 == 0) {
                    csvStream.pause()
                }
            }
        }
    }




}).on('end', () => {
    console.log('All the data in the file has been processed')
}).on('pause', () => {
    console.log(`paused to write ${i} record to file`)
    csvWriter.writeRecords(records).then(() => {
            console.log('The CSV file was written successfully')
            records = []
            csvStream.resume()
    })
})

istream.pipe(csvStream)