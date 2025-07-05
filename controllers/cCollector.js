const mongoose = require('mongoose');
const Collector = require('../models/mCollector');

// Read - GET all - find():
exports.getCollectors = async (req, res, next) => {
    Collector.find()
        .then(collectors => {
            res.status(200).json({ collectors: collectors });
        })
        .catch(err => console.log(err));
};

// Read - GET by id - findById(id):
exports.getCollectorByIdNo = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Collector ID format' });
    }
    Collector.findById(id)
        .then(collector => {
            if (!collector) {
                res.status(404).json({ message: `Collector ${id} not found` });
            }
            return res.status(200).json({ collector: collector });
        })
        .catch(err => console.log(err));
};

// Read - GET id by name - find(name):
exports.getIdByKey = async (req, res, next) => {
    const sName = req.params.name;
    if (!sName) {
        return res.status(400).json({ error: 'Missing name parameter' });
    }

    try {
        const docs = await Collector.find({
            name: { $regex: sName, $options: 'i' }
        }).select('_id name');

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
exports.createCollector = (req, res, next) => {
    const Name = req.body.name;
    const Appearance = req.body.appearance;
    const Persuasiveness = req.body.persuasiveness;
    const Persistence = req.body.persistence;
    const Price = req.body.price;
    const Image = req.body.image;
    Collector.create({
        name: Name,
        appearance: Appearance,
        persuasiveness: Persuasiveness,
        persistence: Persistence,
        price: Price,
        image: Image
    })
        .then(result => {
            console.log(`New collector successfully created`);
            res.status(201).json({
                message: `Collector successfully created`,
                collector: result
            });
        }
        )
        .catch(err => console.log(err));
};

// Update - PUT: set() and save()
exports.updateCollector = (req, res, next) => {
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

    Collector.findById(id)
        .then(collector => {
            if (!collector) {
                return res.status(404).json({ message: `Collector ${id} not found!` });
            }
            collector.set(updates);
            return collector.save();
        })
        .then(result => {
            res.status(200).json({ message: `Collector ${id} updated!`, collector: result });
        })
        .catch(err => console.log(err));
};

// Delete - DELETE: findByIdAndDelete()
exports.deleteCollector = (req, res, next) => {
    const { id } = req.params;
    Collector.findById(id)
        .then(collector => {
            if (!collector) {
                return res.status(404).json({ message: `Collector ${id} not found!` });
            }
            return Collector.findByIdAndDelete(id);
        })
        .then(result => {
            res.status(200).json({ message: `Collector ${id} deleted!` });
        })
        .catch(err => console.log(err));
};