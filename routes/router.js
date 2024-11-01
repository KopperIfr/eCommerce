/**
 * Main Router
 */

const express = require('express');
const { Router } = express;
const userRouter = require('./users/router.js');
const productsRouter = require('./products/router.js');

const router = Router();

router.use('/user', userRouter);          // /api/user/some-route
router.use('/product', productsRouter);  //  /api/product/some-route

router.get('/homepage');  // /api/homepage
router.get('/dashboard'); // /api/dashboard

module.exports = router;