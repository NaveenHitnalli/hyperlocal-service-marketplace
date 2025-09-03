
// const mongoose = require('mongoose');

// const ratingSchema = new mongoose.Schema({
//   user: {
//     _id: mongoose.Schema.Types.ObjectId,
//     name: String
//   },
//   provider: {
//     _id: mongoose.Schema.Types.ObjectId,
//     name: String
//   },
//   booking: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Booking'
//   },
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5
//   },
//   comment: String
// }, { timestamps: true });

// module.exports = mongoose.model('Rating', ratingSchema);
// Import mongoose to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for storing ratings and reviews
const ratingSchema = new mongoose.Schema({

  // Reference to the user who gave the rating
  user: {
    _id: mongoose.Schema.Types.ObjectId, // Store user's ID
    name: String                         // Store user's name for display
  },

  // Reference to the provider who is being rated
  provider: {
    _id: mongoose.Schema.Types.ObjectId, // Store provider's ID
    name: String                         // Store provider's name for display
  },

  // Reference to the specific booking this rating is related to
  booking: {
    type: mongoose.Schema.Types.ObjectId, // Reference booking document by ID
    ref: 'Booking'                        // Link to the Booking model for population
  },

  // Actual rating value (between 1 and 5)
  rating: {
    type: Number, // Number value for rating
    min: 1,       // Minimum allowed rating
    max: 5        // Maximum allowed rating
  },

  // Optional text comment for feedback
  comment: String

}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Export the model so it can be used in other files
module.exports = mongoose.model('Rating', ratingSchema);
