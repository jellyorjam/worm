const axios = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");

exports.addBook =  (req, res) => {
  const { user, type, selfLink, title, authors, pageCount, image, categories} = req.body

  const apiUrl = "http://openlibrary.org/search.json?"

  if (type === "library") {
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
            res.send("Book added to library")
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
  
        res.status(200).send("Book added to library")
      }
    })
  }
  
  else if (type === "wishlist") {
    Book.findOne({googleLink: selfLink}, async (err, book) => {
      if (book) {
        if (book.wishlistUsers.includes(user)) {
          res.status(200).send("This book is already on your wishlist")
        }
        else {
          User.findById(user, (err, user) => {
            if (err) throw err;
            user.wishlist.push(book);
            book.wishlistUsers.push(user);
            user.save();
            book.save();
            res.send("Book added to wishlist")
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
              wishlistUsers: user,
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
              user.wishlist.push(newBook)
              user.save()
            })
          }
          
          else {
            const newBook = new Book({
              wishlistUsers: user,
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
              user.wishlist.push(newBook)
              user.save()
            })
          }
        });
  
        res.status(200).send("Book added to wishlist")
      }
    })
  }
  
}

exports.getBook = (req, res) => {
  const { bookId } = req.params;
  
  Book.findById(bookId, (err, book) => {
    res.status(200).send(book)
  })
}

exports.editBook = (req, res) => {
  const { bookId } = req.params;

  Book.findByIdAndUpdate(bookId, req.body, {new: true}, (err, book) => {
    if (err) throw err;
    return res.send(book)
  })
}

exports.deleteBook = (req, res) => {
  const { bookId } = req.params;
  const { user } = req.body
  
  Book.findById(bookId, (err, book) => {
    if (err) throw err;
    const index = book.users.indexOf(user);
    if (index > -1) {
      book.users.splice(index, 1)
    }
    book.save();
  })

  User.findById(user, (err, user) => {
    if (err) throw err;
    const index = user.books.indexOf(bookId);
    if (index > -1) {
      user.books.splice(index, 1)
    }
    user.save();
  })
  // you don't want to delete the book but the user associated with it
  res.send("delete")
}