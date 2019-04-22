const fastCsv = require('fast-csv')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const fullFile = '../../data/processed.csv'
const fullFileOut = '../../data/SentimentOverTime.csv'

let business_ids = new Set()
let years = new Set()
let i = 0

const istream = fs.createReadStream(fullFile)

let csvStream = fastCsv().on('data', data => {
    // console.log(i)
    let year = data[6].split('-')[0]
    business_ids.add(data[1])
    if (parseInt(year) > 2010) years.add(year)
    // if (++i > 100) csvStream.pause()
    // console.log('-------')


}).on('end', () => {
    business_ids = getRandomSubarray([...business_ids], 100)
    years = [...years]
    console.log(business_ids.length)
    console.log(years)

    let numberOfBusinesses = business_ids.length
    let numberOfYears = years.length

    for (let i = 0; i < numberOfBusinesses; i++) {

        for (let j = 0; j < numberOfYears; j++) {

            let sentimentScore = 0
            let review = getFromDb()
        }

    }


    console.log('END')
})

istream.pipe(csvStream)


const getRandomSubarray = (arr, size) => {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}