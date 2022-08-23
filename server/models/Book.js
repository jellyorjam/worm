const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
  users: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
  googleLink: String,
  title: String,
  authors: Array,
  pageCount: String,
  image: String,
  categories: Array,
  firstPublishYear: String,
  SubjectPlace: Array,
  SubjectTime: Array
})

const Book = mongoose.model('book', BookSchema);
module.exports = Book