const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../../models/Message');

// Access: Private
// DESC: Get the messages from Id
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Message.findById(req.params.id)
    .then(message => {
      res.json(message);
    })
    .catch(err => res.status(404).json(err))
})

// Access: Private
// DESC: Create new messages or update existing message
router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
  Message.findById(req.body.id)
    .then(request => {
      if(request) {
        Message.findOneAndUpdate({_id: request.id}, {$set: {"messages": req.body.messages}}, {new: true})
        .then(req => res.json(req))
        .catch(err => res.status(404).json({success: false}))
      } else {
        const newMessages = new Message({})

        newMessages.save()
          .then(req => res.json(req))
          .catch(err => res.json(err))
      }
    })
    .catch(err => res.json(err));
})

module.exports = router;