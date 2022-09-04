const express = require('express');
const router = express.Router();
const controllers = require('../controllers/books');


router.post('/addBook', controllers.addBook);
router.get('/:bookId', controllers.getBook);
router.put('/:bookId', controllers.editBook)
router.delete('/:bookId', controllers.deleteBook)


module.exports = router;