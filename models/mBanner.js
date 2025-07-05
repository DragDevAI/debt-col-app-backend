const mongoose = require('mongoose');

const bSchema = new mongoose.Schema({
    size : String,
    language : {
        type: Object,
        default: {
            "professional": "We would appreciate very much if you can make immediate payment of your debt.",
            "strong": "Pay or bear all consequences",
            "special": "$##*&$#$#)$(*#$()#*$)#*$)#($*#()$*#"
        }
    },
    price : Number,
}, { collection: 'banner' });

const Banner = mongoose.model('Banner', bSchema);
module.exports = Banner;