const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

// Initializing the express application
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.json());

app.use(cors());

/*
app.use(cors({
  origin: '*', // or set to your frontend domain (recommended for security)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors()); // allow preflight for all routes
*/

// Creating routes for the endpoints
app.use('/account', require('./routes/rAccount'));
app.use('/banner', require('./routes/rBanner'));
app.use('/collector', require('./routes/rCollector'));
app.use('/paint', require('./routes/rPaint'));
app.use('/cart', require('./routes/rCart'));
app.use('/language', require('./routes/rLanguage'));
app.use('/colour', require('./routes/rColour'));

// Starting the Lerver
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

// Connecting to the database
const database = require('./util/db');