const express = require('express');
const controller = require('../../controllers/user/controller');
const middleware = require('../../utils/middleware.js');
const { Router } = express;


const router = Router();

router.get('/sign-out', middleware.mustBeLoggedIn, controller.signOut);
router.post('/sign-up', middleware.alreadyLoggedIn, controller.signUp)
router.post('/sign-in', middleware.alreadyLoggedIn, controller.signIn);

module.exports = router;