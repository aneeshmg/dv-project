const db = require('./db')

const index = (req, res) => {
    res.send("it works")
}

module.exports = {
    index
}