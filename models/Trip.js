const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
   collaborators: {
     type: [Schema.Types.ObjectId],
     ref: 'User'
   },
   admin: {
     type: Schema.Types.ObjectId,
     ref: 'User',
     required: true
   },
   stops: [
     {
        name :{
          type: String,
          required: true
        },
        location: [
          {
            adress: {
              type: String,
              required: true
            },
            lat: {
              type: String,
              required: true
            },
            lng: {
              type: String,
              required: true
            }
          }
        ] 
     },
   ],
   bookings: [
     {
       name: {
         type: String,
         required: true
       },
       price: { 
         type: Number,
         required: true
       },
       from: {
         type: Date,
         required: true
       },
       to: {
         type: Date,
         required: true
       },
       location: [
        {
          adress: {
            type: String,
            required: true
          },
          lat: {
            type: String,
            required: true
          },
          lng: {
            type: String,
            required: true
          }
        }
      ] 
     }
   ]
  // Add more data
   // Add messages
});

module.exports = Trip = mongoose.model('Trip', tripSchema);