/**
 * Products Router
 */

const express = require('express');
const { Router } = express;

const router = Router();

router.get('/products',);      // /api/product/products
router.get('/:id');           // /api/product/:id

// Add a product
router.post('/add-product', ) // /api/product/add-product

// Update a product
router.put('/update-product/:id',); // /api/product/update-product/:id

// Delete a product
router.delete('/delete-product/:id')  // /api/product/delete-product/:id

// Buy a product
router.put('/buy/:id');  //  /api/product/buy/:id

module.exports = router;