const mongoose = require('mongoose');

const colSchema = new mongoose.Schema({
    red : String,
    orange : String,
    amber : String,
    yellow : String,
    lime : String,
    green : String,
    emerald : String,
    teal : String,
    cyan : String,
    sky : String,
    blue : String,
    indigo : String,
}, { collection: 'colour' });

const Colour = mongoose.model('Colour', colSchema);
module.exports = Colour;