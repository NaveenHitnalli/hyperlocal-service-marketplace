
// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// const { addRating, getProviderRatings } = require('../controllers/ratingController');

// router.post('/', auth, addRating);             // user submits
// router.get('/:id', getProviderRatings);        // provider view

// module.exports = router;
// Importing Express framework
const express = require('express');

// Creating a new router object using Express
const router = express.Router();

// Importing the authentication middleware
// This protects certain routes so only logged-in users can access them
const auth = require('../middlewares/authMiddleware');

// Importing controller functions for ratings
const { addRating, getProviderRatings } = require('../controllers/ratingController');

// -------------------------------------------
// Route to allow a logged-in user to submit a rating and review
// Method: POST
// Path: /api/ratings/
// Middleware: auth (only authenticated users can rate)
// Controller: addRating handles storing the rating and comment
router.post('/', auth, addRating);  // e.g., user rates a provider after service

// -------------------------------------------
// Route to fetch all ratings for a specific provider
// Method: GET
// Path: /api/ratings/:id
// No auth required — public access to view ratings of any provider
// Controller: getProviderRatings handles fetching reviews
router.get('/:id', getProviderRatings);  // e.g., show reviews of provider with given ID

// -------------------------------------------
// Exporting the router so it can be used in the main app (server.js)
module.exports = router;
