module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated) {
      console.log("test")
      return next();
    }
    else {
      console.log("not logged in")
      res.send('Please login to view this page')
    }
  }
}