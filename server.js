const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Get routes
const users = require('./routes/api/users');
const trips = require('./routes/api/trips');
const requests = require('./routes/api/requests');
const messages = require('./routes/api/messages');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// DB config 
const db = require('./config/keys').mongoURI;

// connect to Mongo
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware 
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/trips', trips);
app.use('/api/requests', requests);
app.use('/api/messages', messages);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));