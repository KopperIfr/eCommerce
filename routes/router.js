/**
 * Main Router
 */

const express = require('express');
const { Router } = express;

const userRouter = require('./users/router.js');
const productRouter = require('./products/router.js');
const dashboardRouter = require('./dashboard/router.js');
const cartRouter = require('./cart/router.js');
const controller = require('../controllers/controller.js');
const middleware = require('../utils/middleware.js');

const router = Router();

router.use(middleware.isAuth);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/dashboard', dashboardRouter);
router.use('/cart', cartRouter);

router.get('/homepage', controller.homepage);


module.exports = router;