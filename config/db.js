const mongoose = require("mongoose");
const dotenv = require('dotenv');
const config = require("config");
dotenv.config();
const db = config.get("mongoURI");


const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('Database has been connected');
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;