const express = require('express');
const router = express.Router();
const controller = require('../controllers/cColour');
const { verifyJWT } = require('../middlewares/mdAuthentication');
const { isAuthorised } = require('../middlewares/mdAuthorisation');

// CRUD Router / Colour
router.get('/', verifyJWT, isAuthorised, controller.getColours);

module.exports = router;