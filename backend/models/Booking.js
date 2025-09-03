
// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   user: {
//     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     name: String,
//     email: String
//   },
//   provider: {
//     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     name: String,
//     email: String
//   },
//   service: {
//     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
//     title: String,
//     category: String,
//     price: Number
//   },
//   date: Date,
//   status: {
//     type: String,
//     enum: ['Scheduled', 'Completed', 'Cancelled'],
//     default: 'Scheduled'
//   },
//   payment: {
//     razorpay_payment_id: String,
//     razorpay_order_id: String,
//     razorpay_signature: String,
//     amount: Number,
//     method: String,
//     currency: String,
//     status: String
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Booking', bookingSchema);
// Import mongoose library to define schema and model
const mongoose = require('mongoose');

// Define the schema for Booking
const bookingSchema = new mongoose.Schema({

  // The user who is booking the service
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User document
    name: String,   // Store user name (for quick access)
    email: String   // Store user email (for quick access)
  },

  // The service provider being booked
  provider: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the Provider (also a User)
    name: String,   // Store provider name
    email: String   // Store provider email
  },

  // The service being booked
  service: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }, // Reference to the Service
    title: String,     // Title of the service (e.g., Plumbing)
    category: String,  // Category of the service (e.g., Home Repair)
    price: Number      // Price of the service
  },

  // Date and time for the scheduled booking
  date: Date,

  // Status of the booking (default is "Scheduled")
  status: {
    type: String, 
    enum: ['Scheduled', 'Completed', 'Cancelled'], // Allowed values for booking status
    default: 'Scheduled' // Initial default value
  },

  // Payment details from Razorpay (captured after successful payment)
  payment: {
    razorpay_payment_id: String,     // Unique Razorpay payment ID
    razorpay_order_id: String,       // Razorpay order ID generated during payment creation
    razorpay_signature: String,      // Signature for verifying payment authenticity
    amount: Number,                  // Amount paid
    method: String,                  // Payment method (e.g., card, UPI)
    currency: String,                // Currency used (usually INR)
    status: String                   // Status of the payment (e.g., success, failed)
  }

}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Export the Booking model to use it in other parts of the app
module.exports = mongoose.model('Booking', bookingSchema);
