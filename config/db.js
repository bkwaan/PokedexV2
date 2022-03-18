const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const db2 = process.env.mongoURI;
console.log(db2 + "in here");

console.log(process.env.db);
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