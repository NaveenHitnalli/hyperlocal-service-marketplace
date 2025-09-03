
// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// const {
//   getUserBookings,
//   getProviderBookings
// } = require('../controllers/dashboardController');

// router.get('/user', auth, getUserBookings);
// router.get('/provider', auth, getProviderBookings);

// module.exports = router;
// Import the Express framework
const express = require('express');

// Create a new router instance to define routes
const router = express.Router();

// Import authentication middleware to protect routes
const auth = require('../middlewares/authMiddleware');

// Import controller functions to handle dashboard logic
const {
  getUserBookings,        // Controller to get bookings for a logged-in user
  getProviderBookings     // Controller to get bookings for a logged-in provider
} = require('../controllers/dashboardController');

// Define a GET route for "/user" dashboard
// This route requires JWT authentication and returns user's bookings
router.get('/user', auth, getUserBookings);

// Define a GET route for "/provider" dashboard
// This route also requires authentication and returns provider's bookings
router.get('/provider', auth, getProviderBookings);

// Export the router to be used in the main server file (server.js)
module.exports = router;
