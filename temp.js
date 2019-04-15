const db = require('./src/server/db')

db.connectToDatabase().then(() => {
    const dbCon = db.getDb()
})