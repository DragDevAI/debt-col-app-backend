const express = require('express');
const router = express.Router();
const controller = require('../controllers/cCollector');
const { verifyJWT } = require('../middlewares/mdAuthentication');
const { isAuthorised } = require('../middlewares/mdAuthorisation');

// CRUD Router / Collector
router.get('/', verifyJWT, isAuthorised, controller.getCollectors);
router.post('/', verifyJWT, isAuthorised, controller.createCollector);

router.get('/getId/:name', verifyJWT, isAuthorised, controller.getIdByKey);

router.get('/getData/:id', verifyJWT, isAuthorised, controller.getCollectorByIdNo);
router.put('/updateData/:id', verifyJWT, isAuthorised, controller.updateCollector);
router.delete('/deleteData/:id', verifyJWT, isAuthorised, controller.deleteCollector);

module.exports = router;