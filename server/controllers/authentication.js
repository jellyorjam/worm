const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

  const {firstName, lastName, email, password, passwordConfirmation} = req.body;

  if (!firstName || !lastName || !email || !password || !passwordConfirmation) {
    res.status(400).send("All fields are required")
  }

  if (password !== passwordConfirmation) {
    res.status(400).send("Passwords must match")
  }

  User.findOne({ email: email }).then((user, err) => {
    if (user) {
      res.send("This email already exists")
    }
    else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser.save();
      }))
    }
  })
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email}).then(user => {
    //No user found
    if (!user) {
        return res.status(401).send({
            success: false,
            message: "Could not find the user."
        })
    }

    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const payload = {
            email: user.email,
            id: user._id
          }
          const token = jwt.sign(payload, "Random String", {expiresIn: "1d"});
          res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              books: user.books
            }
          })    
        } else {
         res.status(401).send("Incorrect Password")
        }
    } )

  })
}