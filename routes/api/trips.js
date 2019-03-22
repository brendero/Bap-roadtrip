const express = require('express');
const router = express.Router();
const passport = require('passport');

const Trip = require('../../models/Trip');

// get all trips from current user
// Access: Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Trip.find({ collaborators: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'there are no trips yet for this user'
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// Creating new trip route
// Access: Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const newTrip = new Trip({
    name:  req.body.name,
    admin: req.user.id,
    collaborators: req.user.id,
    location: {
      addres: req.body.location.addres,
      lat: req.body.location.lattitude,
      lng: req.body.location.longitude 
    }
  })

  newTrip.save()
    .then(trip => res.json(trip))
    .catch(err => res.json(err))
})

// DESC: Delete an item
// Access: Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
  Trip.findById(req.params.id)
      .then(trip => trip.remove().then(() => res.json({succes: true})))
      .catch(err => res.status(404).json({succes: false}));
});

module.exports = router;