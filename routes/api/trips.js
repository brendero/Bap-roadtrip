const express = require('express');
const router = express.Router();
const passport = require('passport');

const Trip = require('../../models/Trip');
const User = require('../../models/User');

// get all trips from current user
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Trip.find({ colaborators: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'there are no trips yet for this user'
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

module.exports = router;