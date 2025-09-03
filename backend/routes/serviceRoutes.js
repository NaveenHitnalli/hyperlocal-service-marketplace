


// module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

// Import controller functions
const {
  getAllServices,
  createService,
  getServiceById
} = require('../controllers/serviceController');

// 🔹 Public Route: Get all services
router.get('/', getAllServices);

// 🔹 Public Route: Get a single service by ID (with populated provider)
router.get('/:id', getServiceById);

// 🔐 Protected Route: Create a service (only provider)
router.post('/', auth, createService);

module.exports = router;
