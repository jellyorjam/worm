const express = require('express');
const router = express.Router();
const controllers = require('../controllers/authentication');


router.post('/signup', controllers.signup);
router.post('/login',  controllers.login);

module.exports = router;