const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aaliyah-houidef:ENRSkQ7yjrTELsvy@runtrackcluster.fhxnupg.mongodb.net/BookBudy');
        console.log('MongoDB connecté!');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;