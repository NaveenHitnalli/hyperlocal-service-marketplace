
// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch((err) => {
//   console.error('MongoDB connection failed:', err.message);
// });

// // Routes
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// // Start Server
// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server running on port ${process.env.PORT || 5000}`);
// });
// const serviceRoutes = require('./routes/serviceRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
// const ratingRoutes = require('./routes/ratingRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// app.use('/api/payments', paymentRoutes);
// app.use('/api/admin', adminRoutes);


// app.use('/api/ratings', ratingRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// app.use('/api/services', serviceRoutes);
// app.use('/api/bookings', bookingRoutes);

// Importing necessary modules
const express = require('express');          // Express framework to create the server and routes
const dotenv = require('dotenv');            // To load environment variables from .env file
const mongoose = require('mongoose');        // Mongoose for MongoDB connection
const cors = require('cors');                // To allow cross-origin requests (frontend ↔ backend)

// Load environment variables from .env
dotenv.config();

// Initialize express app
const app = express();

// Enable CORS to allow requests from different domains (e.g., React frontend)
app.use(cors());

// Enable parsing of JSON bodies in requests
app.use(express.json());

// -----------------------
// Connect to MongoDB
// -----------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,          // Use new URL parser
  useUnifiedTopology: true        // Use new server discovery and monitoring engine
}).then(() => {
  console.log('MongoDB connected');  // Log on successful connection
}).catch((err) => {
  console.error('MongoDB connection failed:', err.message); // Log error if connection fails
});

// -----------------------
// Importing Route Files
// -----------------------
const authRoutes = require('./routes/authRoutes');             // Authentication routes
const serviceRoutes = require('./routes/serviceRoutes');       // Service listing routes
const bookingRoutes = require('./routes/bookingRoutes');       // Booking management routes
const ratingRoutes = require('./routes/ratingRoutes');         // Ratings & reviews routes
const dashboardRoutes = require('./routes/dashboardRoutes');   // Dashboards (user & provider)
const paymentRoutes = require('./routes/paymentRoutes');       // Razorpay payment routes
const adminRoutes = require('./routes/adminRoutes');           // Admin panel routes

// -----------------------
// Registering Routes
// -----------------------
app.use('/api/auth', authRoutes);            // Base route for login/register
app.use('/api/services', serviceRoutes);     // Base route for services
app.use('/api/bookings', bookingRoutes);     // Base route for bookings
app.use('/api/ratings', ratingRoutes);       // Base route for reviews
app.use('/api/dashboard', dashboardRoutes);  // Base route for dashboards
app.use('/api/payments', paymentRoutes);     // Base route for Razorpay payments
app.use('/api/admin', adminRoutes);          // Base route for admin operations

// -----------------------
// Start the Server
// -----------------------
app.listen(process.env.PORT || 5000, () => {
  // Run server on PORT from .env or default 5000
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

