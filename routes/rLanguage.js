const express = require('express');
const router = express.Router();
const controller = require('../controllers/cLanguage');
const { verifyJWT } = require('../middlewares/mdAuthentication');
const { isAuthorised } = require('../middlewares/mdAuthorisation');

// CRUD Router / Language
router.get('/', verifyJWT, isAuthorised, controller.getLanguages);

module.exports = router;