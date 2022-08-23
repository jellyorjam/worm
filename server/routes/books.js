const express = require('express');
const router = express.Router();
const controllers = require('../controllers/books');


router.post('/addBook', controllers.addBook);


module.exports = router;