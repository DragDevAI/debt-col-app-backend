const mongoose = require('mongoose');

const pSchema = new mongoose.Schema({
    colour : {
        type: Array,
        default: ["red", "blue"]
        },
    location : String,
    price : Number,
}, { collection: 'paint' });

const Paint = mongoose.model('Paint', pSchema);
module.exports = Paint;