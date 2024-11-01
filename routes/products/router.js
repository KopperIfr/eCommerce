const express = require('express');
const controller = require('../../controllers/product/controller.js');
const middleware = require('../../utils/middleware.js');
const { Router } = express;

const router = Router();

// Get products..
router.get('/products', controller.getProducts);

// Get product by id..
router.get('/:id', controller.getProduct);

// Using middleware..
router.use(middleware.mustBeLoggedIn);

// Add product..
router.post('/add', controller.addProduct);

// Update product..
router.put('/update/:id', controller.updateProduct);

// Delete product..
router.delete('/delete/:id', controller.deleteProduct);

// Buy product..
router.put('/buy', controller.buyProducts);

module.exports = router;