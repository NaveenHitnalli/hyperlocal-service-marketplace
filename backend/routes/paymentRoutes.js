
// const express = require('express');
// const router  = express.Router();
// const auth    = require('../middlewares/authMiddleware');
// const { createOrder, getKey } = require('../controllers/paymentController');

// router.post('/create-order', auth, createOrder);
// router.get ('/key',           getKey);           // ← new line

// module.exports = router;

// Import the Express framework to create routes
const express = require('express');

// Create a new router object to define routes separately
const router = express.Router();

// Import the authentication middleware to protect certain routes
const auth = require('../middlewares/authMiddleware');

// Import specific controller functions for handling payments
const { createOrder, getKey } = require('../controllers/paymentController');

// POST route to create a Razorpay order
// This route is protected by the auth middleware (user must be logged in)
router.post('/create-order', auth, createOrder);

// GET route to send the Razorpay public key to the frontend
// This route does NOT require authentication
router.get('/key', getKey); // Useful for Razorpay checkout

// Export the router to be used in the main server.js file
module.exports = router;

