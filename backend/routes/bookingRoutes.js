



// const express = require('express');
// const router  = express.Router();
// const auth    = require('../middlewares/authMiddleware');

// const {
//   bookService,
//   getUserBookings,
//   updateBookingStatus
// } = require('../controllers/bookingController');

// router.post('/',      auth, bookService);          // create booking
// router.get('/my',     auth, getUserBookings);      // consumer history
// router.put('/status', auth, updateBookingStatus);  // provider/admin status change

// module.exports = router;


// Import the Express framework
const express = require('express');

// Create a new router object to define route handlers
const router = express.Router();

// Import the authentication middleware to protect routes
const auth = require('../middlewares/authMiddleware');

// Import booking controller functions
const {
  bookService,         // Handles booking creation
  getUserBookings,     // Retrieves user's booking history
  updateBookingStatus  // Allows provider/admin to update booking status
} = require('../controllers/bookingController');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Protected (User must be authenticated)
router.post('/', auth, bookService);

// @route   GET /api/bookings/my
// @desc    Get bookings made by the currently logged-in user
// @access  Protected (User must be authenticated)
router.get('/my', auth, getUserBookings);

// @route   PUT /api/bookings/status
// @desc    Update booking status (e.g., Scheduled → Completed/Cancelled)
// @access  Protected (Provider/Admin only)
router.put('/status', auth, updateBookingStatus);

// Export the router so it can be used in server.js
module.exports = router;
