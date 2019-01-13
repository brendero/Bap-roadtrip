const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// get routes

const app = express();

// BodyParser Middleware
app.use(bodyParser.json);

// DB config
const db = require('./config/keys').mongoURI;

// connect to MONGO
mongoose.connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use Routes


const port = process.env.port || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));