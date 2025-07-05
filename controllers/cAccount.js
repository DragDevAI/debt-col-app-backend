const mongoose = require('mongoose');
const Account = require('../models/mAccount');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Read - GET all - find():
exports.getAccounts = async (req, res, next) => {
    Account.find()
    .then(accounts => {
        res.status(200).json({accounts: accounts});
    })
    .catch(err => console.log(err));
};

// Read - GET by id - findById(id):
exports.getAccountByIdNo = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Account ID format' });
    }
    Account.findById(id)
        .then(accounnt => {
            if (!accounnt) {
                res.status(404).json({ message: `Accounnt ${id} not found` });
            }
            return res.status(200).json({ accounnt: accounnt });
        })
        .catch(err => console.log(err));
};

// Create - POST: create()
exports.createAccount = (req, res, next) => {
    const Name = req.body.name;
    const Password = req.body.password;
    const Role = req.body.role;
    Account.create({
        name: Name,
        password: bcrypt.hashSync(Password, 10), // Hashing the password
        role: Role
    })
        .then(result => {
            console.log(`New account successfully created`);
            res.status(201).json({
                message: `Account successfully created`,
                account: result
            });
            }
        )
        .catch(err => console.log(err));
};

// Update - PUT: set() and save()
exports.updateAccount = (req, res, next) => {
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

    Account.findById(id)
        .then(account => {
            if (!account) {
                return res.status(404).json({ message: `Account ${id} not found!`});
            }
            account.set(updates);
            return account.save();
            })
            .then(result => {
                res.status(200).json({ message: `Account ${id} updated!`, account: result} );
            })
        .catch(err => console.log(err));
};

// Delete - DELETE: findByIdAndDelete()
exports.deleteAccount = (req, res, next) => {
    const { id } = req.params;
    Account.findById(id)
        .then(account => {
            if (!account) {
                return res.status(404).json({ message: `Account ${id} not found!`});
            }
            return Account.findByIdAndDelete(id);
            })
            .then(result => {
                res.status(200).json({ message: `Account ${id} deleted!`} );
            })
        .catch(err => console.log(err));
};

// Login - POST: login()
exports.login = async (req, res, next) => {
    const { name, password } = req.body;

    try {
        // Find the account by name
        const account = await Account.findOne({ name: name });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            id: account._id,
            role: account.role,
        };

        // Generate a JWT token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });

        res.status(200).json({
            message: 'Login successful',
            token: token,
            account: {
                id: account._id,
                name: account.name,
                role: account.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}