const axios = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");

exports.addBook =  (req, res) => {
  const { user, selfLink, title, authors, pageCount, image, categories} = req.body

  const apiUrl = "http://openlibrary.org/search.json?"

  Book.findOne({googleLink: selfLink}, async (err, book) => {
    if (book) {
      if (book.users.includes(user)) {
        res.status(200).send("You have already read this book")
      }
      else {
        User.findById(user, (err, user) => {
          if (err) throw err;
          user.books.push(book);
          book.users.push(user);
          user.save();
          book.save();
          res.send("Book added")
        })
      }
    }
    else {
      const author = authors.length ? authors[0] : ""
      await axios.get(apiUrl + "q=" + title + " " + author + "&limit=1").then((response) => {
        const docs = response.data.docs;
        const data =  response.data.docs[0]
     
        if (docs.length) {
          const newBook = new Book({
            users: user,
            googleLink: selfLink,
            title: title,
            authors: authors,
            pageCount: pageCount,
            image: image,
            googleCategories: categories,
            openLibraryCategories: data.subject,
            firstPublishYear: data.first_publish_year,
            SubjectPlace: data.place,
            SubjectTime: data.time 
          });

          newBook.save();
    
          User.findById(user, (err, user) => {
            if (err) throw err;
            user.books.push(newBook)
            user.save()
          })
        }
        
        else {
          const newBook = new Book({
            users: user,
            googleLink: selfLink,
            title: title,
            authors: authors,
            pageCount: pageCount,
            image: image,
            googleCategories: categories,
            openLibraryCategories: [],
            firstPublishYear: "",
            SubjectPlace: [],
            SubjectTime: [] 
          });

          newBook.save();
    
          User.findById(user, (err, user) => {
            if (err) throw err;
            user.books.push(newBook)
            user.save()
          })
        }
      });

      res.status(200).send("book added")
    }
  })
}

exports.getBook = (req, res) => {
  const { bookId } = req.params;
  
  Book.findById(bookId, (err, book) => {
    res.status(200).send(book)
  })
}

exports.editBook = (req, res) => {
  const { bookId } = req.params;
  console.log(req.body)

  Book.findByIdAndUpdate(bookId, req.body, {new: true}, (err, book) => {
    if (err) throw err;
    return res.send(book)
  })
}