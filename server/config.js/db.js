const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Mongodb...');
    } catch (e) {
        console.error('Error connecting to Mongodb', e);
        process.exit(1);
    }
};

module.exports = connectDB;