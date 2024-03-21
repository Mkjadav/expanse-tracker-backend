const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URL)
        console.log('Mongo connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToMongo;