/**
 * Dashboard Router
 */

const express = require('express');
const { Router } = express;

const controller = require('../../controllers/dashboard/controller.js');
const middleware = require('../../utils/middleware.js');

const router = Router();

router.use(middleware.mustBeLoggedIn);

router.get('/', controller.dashboard);


module.exports = router;