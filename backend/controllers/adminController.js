// const User = require('../models/User');
// const Service = require('../models/Service');
// const Booking = require('../models/Booking');

// exports.getAllData = async (req, res) => {
//   const users = await User.find();
//   const services = await Service.find().populate('provider');
//   const bookings = await Booking.find().populate('user service provider');
//   res.json({ users, services, bookings });
// };

// Import the User model from models/User.js
const User = require('../models/User');

// Import the Service model from models/Service.js
const Service = require('../models/Service');

// Import the Booking model from models/Booking.js
const Booking = require('../models/Booking');

// Exporting a controller function called getAllData
// This will be used in the Admin dashboard to fetch all users, services, and bookings
exports.getAllData = async (req, res) => {
  try {
    // Fetch all users from the User collection
    const users = await User.find();

    // Fetch all services from the Service collection
    // Populate the 'provider' field to include the actual provider (User) data
    const services = await Service.find().populate('provider');

    // Fetch all bookings from the Booking collection
    // Populate user, service, and provider fields to show complete data for each booking
    const bookings = await Booking.find().populate('user service provider');

    // Send the fetched data as a JSON response to the frontend
    res.json({ users, services, bookings });
  } catch (error) {
    // If any error occurs during the fetch, send a 500 error response with error message
    res.status(500).json({ error: error.message });
  }
};
