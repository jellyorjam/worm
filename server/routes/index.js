const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index');
const passport = require('passport')

const ensureAuthenticated = passport.authenticate('jwt', {session: false})

router.get('/', controllers.testGet);

router.get('/home', ensureAuthenticated, controllers.homePage)
module.exports = router;