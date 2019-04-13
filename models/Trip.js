const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: {
    type: String,
    required: true
  },  
  collaborators: {
     type: [Schema.Types.ObjectId],
     ref: 'User'
  },
  admin: {
     type: Schema.Types.ObjectId,
     ref: 'User',
     required: true
  },
  location: {
      addres: {
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
    },
  stops: [
    {
        name: {
          type: String,
          required: true
        },
        thumbnail: {
          type: String,
          required: false
        },
        location: {
            addres: {
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
       photo: {
         type: String,
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
       location: {
          addres: {
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
     }
   ],
   createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  deletedAt: {
    type: Date
  },
  archived: {
    type: Boolean,
    default: false,
    required: true
  }
  // Add more data
   // Add messages
});

module.exports = Trip = mongoose.model('Trip', tripSchema);