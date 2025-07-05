const mongoose = require('mongoose');
const Paint = require('../models/mPaint');

// Read - GET all - find():
exports.getPaints = async (req, res, next) => {
    Paint.find()
    .then(paints => {
        res.status(200).json({paints: paints});
    })
    .catch(err => console.log(err));
};

// Read - GET by id - findById(id):
exports.getPaintByIdNo = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Paint ID format' });
    }
    Paint.findById(id)
        .then(paint => {
            if (!paint) {
                res.status(404).json({ message: `Paint ${id} not found` });
            }
            return res.status(200).json({ paint: paint });
        })
        .catch(err => console.log(err));
};

// Read - GET id by key - find(location):
exports.getIdByKey = async (req, res, next) => {
    const sLocation = req.params.location;
    if (!sLocation) {
        return res.status(400).json({ error: 'Missing location parameter' });
    }

    try {
        const docs = await Paint.find({
            location: { $regex: sLocation, $options: 'i' }
        }).select('_id location');

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
exports.createPaint = (req, res, next) => {
    const Location = req.body.location;
    const Price = req.body.price;
    Paint.create({
        location: Location,
        price: Price
    })
        .then(result => {
            console.log(`New paint successfully created`);
            res.status(201).json({
                message: `Paint successfully created`,
                paint: result
            });
            }
        )
        .catch(err => console.log(err));
};

// Update - PUT: set() and save()
exports.updatePaint = (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    // Checking to make sure at least one field to update
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'Update request empty' });
    };
    // Clean up and remove properties with 'null' or 'undefined' values from update object
    for (const key in updates) {
        if (updates[key] === null || updates[key] === undefined) {
            delete updates[key];
        };
    };

    Paint.findById(id)
        .then(paint => {
            if (!paint) {
                return res.status(404).json({ message: `Paint ${id} not found!`});
            }
            paint.set(updates);
            return paint.save();
            })
            .then(result => {
                res.status(200).json({ message: `Paint ${id} updated!`, paint: result} );
            })
        .catch(err => console.log(err));
};

// Delete - DELETE: findByIdAndDelete()
exports.deletePaint = (req, res, next) => {
    const { id } = req.params;
    Paint.findById(id)
        .then(paint => {
            if (!paint) {
                return res.status(404).json({ message: `Paint ${id} not found!`});
            }
            return Paint.findByIdAndDelete(id);
            })
            .then(result => {
                res.status(200).json({ message: `Paint ${id} deleted!`} );
            })
        .catch(err => console.log(err));
};