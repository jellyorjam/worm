const express = require('express');
const router = express.Router();
const controllers = require('../controllers/books');


router.post('/addBook', controllers.addBook);
router.get('/getBook/:bookId', controllers.getBook)


module.exports = router;