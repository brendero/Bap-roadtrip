const express = require('express');
const router = express.Router();
const passport = require('passport');

const Request = require('../../models/Request');

// Access: Private
// DESC: Get all requests from logged in user
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};

  Request.find({ invitedUserId: req.user.id })
    .then(requests => {
      if(!requests) {
        errors.norequests = 'no trip requests for this user yet';
        return res.status(404).json(errors);
      }
      // filter response to only show requests with false status
      res.json(requests);
    })
    .catch(err => res.status(404).json(err));
})

// Access: Private
// DESC: Create a new request for another user or update own request
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Request.findById(req.body.id)
    .then(request => {
      if(request) {
        Request.findOneAndUpdate(request.id, {$set: req.body}, { new: true})
        .then(request => res.json(request))
        .catch(err => res.status(404).json({success: false}))
      } else {
        const newRequest = new Request({
          requestingUserId: req.user.id,
          invitedUserId: req.body.invitedUser,
          tripId: req.body.trip.id
        })
        
        newRequest.save()
          .then(request => res.json(request))
          .catch(err => res.json(err))
      }
    })
    .catch(err => res.json(err));
})

// Access: Private 
// DESC: Delete a request
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
  Request.findById(req.params.id)
      .then(request => {
        if(req.user.id == request.invitedUserId) {
          request.remove().then(() => res.json({succes: true}))
        } else {
          res.status(401).json('unauthorized')
        }
      })
      .catch(err => res.status(404).json({succes: false}));
});


module.exports = router;