const axios = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");

exports.addBook = async (req, res) => {
  const { user, selfLink, title, authors, pageCount, image, categories} = req.body

  const apiUrl = "http://openlibrary.org/search.json?q="

  
 
  await axios.get(apiUrl + title + " " + authors[0]).then((response) => {
    const data =  response.data.docs[0]
   
    const allCategories = categories.concat(data.subject)
    
    const newBook = new Book({
      users: user,
      googleLink: selfLink,
      title: title,
      authors: authors,
      pageCount: pageCount,
      image: image,
      categories: allCategories,
      firstPublishYear: data.first_publish_year || "",
      SubjectPlace: data.place || "",
      SubjectTime: data.time || ""
    });
  
    newBook.save();

    User.findById(user, (err, user) => {
      if (err) throw err;
      user.books.push(newBook)
      user.save()
    })
  });



}