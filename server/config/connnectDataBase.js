const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URL).then((con) => {
        console.log('MongoDB connected to Host mmbu ' + con.connection.host)
    }).catch(e => console.log('e', e))
}

module.exports = connectDataBase