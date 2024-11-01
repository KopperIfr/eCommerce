const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Database!');
    } catch (error) {
        console.log('Database connection failed! ', error);
    }
}

module.exports = connectDB;