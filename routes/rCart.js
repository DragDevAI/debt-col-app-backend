const express = require('express');
const router = express.Router();
const controller = require('../controllers/cCart');
const { verifyJWT } = require('../middlewares/mdAuthentication');
const { isAuthorised } = require('../middlewares/mdAuthorisation');

// CRUD Router / Cart
router.get('/', verifyJWT, isAuthorised, controller.getCarts);
router.post('/', verifyJWT, isAuthorised, controller.createCart);

router.get('/getId/:userID', verifyJWT, isAuthorised, controller.getIdByKey);

router.get('/:id', verifyJWT, isAuthorised, controller.getCartByIdNo);
router.put('/:id/add', verifyJWT, isAuthorised, controller.updateCartAdd);
router.put('/:id/remove', verifyJWT, isAuthorised, controller.updateCartRemove);
router.delete('/:id', verifyJWT, isAuthorised, controller.deleteCart);

module.exports = router;