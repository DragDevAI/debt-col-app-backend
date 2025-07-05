const mongoose = require('mongoose');

const lSchema = new mongoose.Schema({
    professional : String,
    strong : String,
    special : String,
}, { collection: 'language' });

const Language = mongoose.model('Language', lSchema);
module.exports = Language;