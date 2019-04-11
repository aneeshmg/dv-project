const db = require('./db')

const index = (req, res) => {
    res.sendFile("it works")
}

module.exports = {
    index
}