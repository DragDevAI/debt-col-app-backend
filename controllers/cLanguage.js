const mongoose = require('mongoose');
const Language = require('../models/mLanguage');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Read - GET all - find():
exports.getLanguages = async (req, res, next) => {
    Language.find()
    .then(languages => {
        res.status(200).json({languages: languages});
    })
    .catch(err => console.log(err));
};