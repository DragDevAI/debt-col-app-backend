const mongoose = require('mongoose');
const Colour = require('../models/mColour');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Read - GET all - find():
exports.getColours = async (req, res, next) => {
    Colour.find()
    .then(colours => {
        res.status(200).json({colours: colours});
    })
    .catch(err => console.log(err));
};