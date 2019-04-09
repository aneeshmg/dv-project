const db = require('./db')

const index = (req, res) => {
    res.sendFile(__dir_name+"/public/index.html")
}

module.exports = {
    index
}