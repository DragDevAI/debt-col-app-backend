const express = require('express');
const router = express.Router();
const controller = require('../controllers/cPaint');
const { verifyJWT } = require('../middlewares/mdAuthentication');
const { isAuthorised } = require('../middlewares/mdAuthorisation');

// CRUD Router / Paint
router.get('/', verifyJWT, isAuthorised, controller.getPaints);
router.post('/', verifyJWT, isAuthorised, controller.createPaint);

router.get('/getId/:location', verifyJWT, isAuthorised, controller.getIdByKey);

router.get('/getData/:id', verifyJWT, isAuthorised, controller.getPaintByIdNo);
router.put('/updateData/:id', verifyJWT, isAuthorised, controller.updatePaint)
router.delete('/deleteData/:id', verifyJWT, isAuthorised, controller.deletePaint)

module.exports = router;