const mongoose = require('mongoose');

const cSchema = new mongoose.Schema({
    name : String,
    appearance : Number,
    persuasiveness : Number,
    persistence : Number,
    price : Number,
    image : String
}, { collection: 'collector' });

const Collector = mongoose.model('Collector', cSchema);
module.exports = Collector;