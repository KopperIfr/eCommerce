/**
 * Cart Router
 */

const express = require('express');
const middleware = require('../../utils/middleware.js');
const controller = require('../../controllers/cart/controller.js');
const { Router } = express;


const router = Router();

router.get('/get', controller.getCart);
router.post('/add', controller.addProduct);
router.put('/remove/:id', controller.removeProduct);
router.delete('/empty', controller.emptyCart);

module.exports = router;