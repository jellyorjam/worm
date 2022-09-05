module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated) {
      return next();
    }
    else {
      console.log("not logged in")
      res.send('Please login to view this page')
    }
  }
}