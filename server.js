const express = require('express');
const app = express();
const connectDB = require('./config/db');
const api = require('./api');


     


// Connecting Database
connectDB();

//MiddleWare
app.use(express.json({ extended: false }));

// Using api folder
app.use('/api',api);

const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => console.log('this server started on port ' + PORT));


