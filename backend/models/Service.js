// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   category: String,
//   provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   price: Number,
//   location: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Service', serviceSchema);
// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for a Service using mongoose.Schema
const serviceSchema = new mongoose.Schema({
  
  // Title of the service (e.g., "Plumbing", "Haircut")
  title: String,

  // Description of the service
  description: String,

  // Category for filtering (e.g., "Home Services", "Beauty")
  category: String,

  // Reference to the provider (user) who offers this service
  // This stores the ObjectId of the user in the User collection
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // This tells Mongoose to link it to the User model
  },

  // Price of the service in INR or chosen currency
  price: Number,

  // Location where the service is available (e.g., "Bangalore", "Delhi")
  location: String

// Automatically adds `createdAt` and `updatedAt` fields to the schema
}, { timestamps: true });

// Export the model so it can be used in other files like controllers and routes
module.exports = mongoose.model('Service', serviceSchema);
