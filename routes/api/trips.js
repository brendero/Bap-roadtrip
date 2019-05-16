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

// DESC: create or update a trip
// Acces: Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  Trip.findById(req.body.id)
    .then(trip => {
      if(trip) {
        Trip.findByIdAndUpdate(trip.id, {$set: req.body}, { new: true})
          .then(trip => res.json(trip))
          .catch(err => res.status(404).json({succes: false}))
      }
      else {
        const newTrip = new Trip({
          name:  req.body.name,
          admin: req.user.id,
          collaborators: req.user.id,
          location: {
            addres: req.body.location.addres,
            lat: req.body.location.lattitude,
            lng: req.body.location.longitude 
          },
          messageRef: req.body.messageId
        })
      
        newTrip.save()
          .then(trip => res.json(trip))
          .catch(err => res.json(err))
      }
    })
    .catch(err => res.json(err));
})
// DESC: Get a trip By id
// Access: Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res ) => {
  Trip.findById(req.params.id)
    .then(tripData => {
      const trip = {
        name: tripData.name,
        adress: tripData.location.addres,
        collaborators: tripData.collaborators,
        createdAt: tripData.createdAt
      }
      res.json(trip);
    })
    .catch(err => res.status(404).json(err))
})

// DESC: Delete a trip
// Access: Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
  Trip.findById(req.params.id)
      .then(trip => trip.remove().then(() => res.json({succes: true})))
      .catch(err => res.status(404).json({succes: false}));
});

module.exports = router;