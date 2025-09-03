// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controllers/authController');

// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;
// Importing the Express framework
const express = require('express');

// Creating a new router object to define route paths
const router = express.Router();

// Importing the register and login functions from the auth controller
const { register, login } = require('../controllers/authController');

// Define a POST route for user registration
// When a POST request is made to /api/auth/register, the register function will handle it
router.post('/register', register);

// Define a POST route for user login
// When a POST request is made to /api/auth/login, the login function will handle it
router.post('/login', login);

// Exporting the router so it can be used in other parts of the application (like server.js)
module.exports = router;
