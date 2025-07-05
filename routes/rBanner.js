const express = require('express');
const router = express.Router();
const controller = require('../controllers/cBanner');
const { verifyJWT } = require('../middlewares/mdAuthentication');
const { isAuthorised } = require('../middlewares/mdAuthorisation');

// CRUD Router / Banner
router.get('/', verifyJWT, isAuthorised, controller.getBanners);
router.post('/', verifyJWT, isAuthorised, controller.createBanner);

router.get('/getId/:size', verifyJWT, isAuthorised, controller.getIdByKey);

router.get('/getData/:id', verifyJWT, isAuthorised, controller.getBannerByIdNo);
router.put('/updateData/:id', verifyJWT, isAuthorised, controller.updateBanner)
router.delete('/deleteData/:id', verifyJWT, isAuthorised, controller.deleteBanner)

module.exports = router;