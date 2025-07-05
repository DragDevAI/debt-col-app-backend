const mongoose = require('mongoose');
const Banner = require('../models/mBanner');

// Read - GET all - find():
exports.getBanners = async (req, res, next) => {
    Banner.find()
    .then(banners => {
        res.status(200).json({banners: banners});
    })
    .catch(err => console.log(err));
};

// Read - GET by id - findById(id):
exports.getBannerByIdNo = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Banner ID format' });
    }
    Banner.findById(id)
        .then(banner => {
            if (!banner) {
                res.status(404).json({ message: `Banner ${id} not found` });
            }
            return res.status(200).json({ banner: banner });
        })
        .catch(err => console.log(err));
};

// Read - GET id by key - find(size):
exports.getIdByKey = async (req, res, next) => {
    const sSize = req.params.size;
    if (!sSize) {
        return res.status(400).json({ error: 'Missing size parameter' });
    }

    try {
        const docs = await Banner.find({
            size: { $regex: sSize, $options: 'i' }
        }).select('_id size');

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
exports.createBanner = (req, res, next) => {
    const Size = req.body.size;
    const Price = req.body.price;
    Banner.create({
        size: Size,
        price: Price
    })
        .then(result => {
            console.log(`New banner successfully created`);
            res.status(201).json({
                message: `Banner successfully created`,
                banner: result
            });
            }
        )
        .catch(err => console.log(err));
};

// Update - PUT: set() and save()
exports.updateBanner = (req, res, next) => {
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

    Banner.findById(id)
        .then(banner => {
            if (!banner) {
                return res.status(404).json({ message: `Banner ${id} not found!`});
            }
            banner.set(updates);
            return banner.save();
            })
            .then(result => {
                res.status(200).json({ message: `Banner ${id} updated!`, banner: result} );
            })
        .catch(err => console.log(err));
};

// Delete - DELETE: findByIdAndDelete()
exports.deleteBanner = (req, res, next) => {
    const { id } = req.params;
    Banner.findById(id)
        .then(banner => {
            if (!banner) {
                return res.status(404).json({ message: `Banner ${id} not found!`});
            }
            return Banner.findByIdAndDelete(id);
            })
            .then(result => {
                res.status(200).json({ message: `Banner ${id} deleted!`} );
            })
        .catch(err => console.log(err));
};