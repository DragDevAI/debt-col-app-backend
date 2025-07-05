const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    type: {
        type: String, 
        enum: ["banner", "paint", "collector"], 
        required: true
    },
    quantity: { 
        type: Number, 
        required: true
    },
    config: { 
        type: Object, 
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    products: [productSchema],
    totalPrice: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: Boolean,
        defaul: false
    }
}, { collection: 'cart' });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;