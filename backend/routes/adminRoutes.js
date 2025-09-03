// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/authMiddleware');
// const { getAllData } = require('../controllers/adminController');

// router.get('/data', auth, getAllData);

// module.exports = router;
// Importing the Express module
const express = require('express');

// Creating a new router object using express
const router = express.Router();

// Importing the authentication middleware to protect admin routes
const auth = require('../middlewares/authMiddleware');

// Importing the controller function that handles getting all admin data
const { getAllData } = require('../controllers/adminController');

// Defining a GET route '/data' which is protected by auth middleware
// This route will return users, services, and bookings data for the admin
router.get('/data', auth, getAllData);

// Exporting the router to be used in server.js
module.exports = router;
