const mongoose = require('mongoose');
const Cart = require('../models/mCart');

// Read - GET all - find():
exports.getCarts = async (req, res, next) => {
    Cart.find()
        .then(carts => {
            res.status(200).json({ carts: carts });
        })
        .catch(err => console.log(err));
};

// Read - GET by id - findById(id):
exports.getCartByIdNo = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Cart ID format' });
    }
    Cart.findById(id)
        .then(cart => {
            if (!cart) {
                res.status(404).json({ message: `Cart ${id} not found` });
            }
            return res.status(200).json({ cart: cart });
        })
        .catch(err => console.log(err));
};

// Read - GET id by key - find(userID):
exports.getIdByKey = async (req, res, next) => {
    const sUserID = req.params.userID;
    if (!sUserID) {
        return res.status(400).json({ error: 'Missing User ID parameter' });
    }
    
    try {
        const docs = await Cart.find({ userID : sUserID }).select('_id userID');

        if (docs.length === 0) {
            return res.status(404).json({ error: 'No matches found' });
        }

        res.json(docs);
    } catch (err) {
        console.error("Error in getIdByKey:", err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

// Create - POST: create()
exports.createCart = (req, res, next) => {
    const { userID, products } = req.body;
    if (!Array.isArray(products) || products.length == 0) {
        return res.status(400).json({ error: "No product in cart" });
    }

    const totalPrice = products.reduce((sum, item) => {
        return sum + item.unitPrice * item.quantity;
    }, 0);

    Cart.create({
        userID,
        products,
        totalPrice
    })
        .then(result => {
            console.log(`New cart successfully created`);
            res.status(201).json({
                message: `Cart successfully created`,
                cart: result
            });
        }
        )
        .catch(err => console.log(err));
};

// Update - PUT: set() and save()
exports.updateCartAdd = (req, res, next) => {
    const { id } = req.params;
    const product = req.body;

    // Checking to make sure at least one field to products
    if (Object.keys(product).length === 0) {
        return res.status(400).json({ message: 'Update request empty' });
    };
    // Clean up and remove properties with 'null' or 'undefined' values from update object
    for (const key in product) {
        if (product[key] === null || product[key] === undefined) {
            delete product[key];
        };
    };

    Cart.findById(id)
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: `Cart ${id} not found!` });
            }
            cart.products.push(product);
            cart.totalPrice += product.unitPrice * product.quantity;
            return cart.save();
        })
        .then(result => {
            res.status(200).json({ message: `Cart ${id} updated!`, cart: result });
        })
        .catch(err => console.log(err));
};

// Update - PUT: set() and save()
exports.updateCartRemove = (req, res, next) => {
    const { id } = req.params;
    //const {index} = req.body;
    const { itemId } = req.body; // Remove by itemId

    /*
    if (index < 0 || index >= cart.products.length) {
        return res.status(400).json({ message: `Invalid index: ${index}` });
    };
    */

    Cart.findById(id)
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: `Cart ${id} not found!` });
            }

            /*
            // Get the item being removed
            const removed = cart.products.splice(index, 1)[0];

            if (!removed) {
                return res.status(400).json({ message: `Invalid index: ${index}` });
            }

            // Update the total price
            cart.totalPrice -= removed.unitPrice * removed.quantity;
            */

            const itemIndex = cart.products.findIndex(p => p._id.toString() === itemId);
            if (itemIndex === -1) {
                return res.status(404).json({ message: `Product ${itemId} not found in cart` });
            }

            const removed = cart.products.splice(itemIndex, 1)[0];
            cart.totalPrice -= removed.unitPrice * removed.quantity;

            return cart.save();

        })
        .then(result => {
            res.status(200).json({ message: `Cart ${id} updated!`, cart: result });
        })
        .catch(err => console.log(err));
};

// Delete - DELETE: findByIdAndDelete()
exports.deleteCart = (req, res, next) => {
    const { id } = req.params;
    Cart.findById(id)
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: `Cart ${id} not found!` });
            }
            return Cart.findByIdAndDelete(id);
        })
        .then(result => {
            res.status(200).json({ message: `Cart ${id} deleted!` });
        })
        .catch(err => console.log(err));
};