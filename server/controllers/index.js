exports.testGet = (req, res) => {
  res.send("hello world")
}

exports.auth = (req, res) => {
  const user = {
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    books: req.user.books
  }
  res.send(user)
}