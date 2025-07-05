const mongoose = require('mongoose');

const aSchema = new mongoose.Schema({
    name : String,
    password : String,
    role : String,
}, { collection: 'account' });

const Account = mongoose.model('Account', aSchema);
module.exports = Account;