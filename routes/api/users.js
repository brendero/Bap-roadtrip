const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// User Model
const User = require('../../models/User');

// Register new User
// Access: Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        errors.email = 'email already exists'
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) console.log(err);
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// Login user
// Access: public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find User By mail
  User.findOne({email})
    .then(user => {
      if(!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      // check the password with Bcrypt
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // Create payload
            const payload = { id: user.id, name: user.name, avatar: user.avatar }
            // Sign Token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 },(err, token) => {
              res.json({
                succes: true,
                token: `Bearer ${token}`
              })
            });
          } else {
            errors.password = 'Password incorrect';
            return res.status(400).json(errors);
          }
        })
    })
})

// Get User by id
// Access: Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res ) => {
  User.findById(req.params.id)
    .then(user => {
      const User = {
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
      res.json(User);
    })
    .catch(err => res.status(404).json(err))
});

// Update user
// Access: Private
router.post('/update', passport.authenticate('jwt', {session: false }), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      if(user) {
        User.findByIdAndUpdate(user.id, {$set: req.body}, {new: true})
          .then(user => res.json(user))
          .catch(err => res.status(404).json({success:false}))
      }
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router;