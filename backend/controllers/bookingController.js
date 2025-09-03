// // backend/controllers/bookingController.js

// const Booking = require('../models/Booking');
// const User    = require('../models/User');
// const Service = require('../models/Service');

// /* ------------------------ 1. Book a Service ------------------------ */
// exports.bookService = async (req, res) => {
//   try {
//     const { serviceId, providerId, date, paymentDetails } = req.body;

//     const [user, provider, service] = await Promise.all([
//       User.findById(req.user.id),
//       User.findById(providerId),
//       Service.findById(serviceId)
//     ]);

//     const booking = await Booking.create({
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email
//       },
//       provider: {
//         _id: provider._id,
//         name: provider.name,
//         email: provider.email
//       },
//       service: {
//         _id: service._id,
//         title: service.title,
//         category: service.category,
//         price: service.price
//       },
//       date,
//       status: 'Scheduled',
//       payment: {
//         razorpay_payment_id: paymentDetails.razorpay_payment_id,
//         razorpay_order_id:   paymentDetails.razorpay_order_id,
//         razorpay_signature:  paymentDetails.razorpay_signature,
//         amount:   paymentDetails.amount,
//         method:   paymentDetails.method,
//         currency: paymentDetails.currency,
//         status:   paymentDetails.status
//       }
//     });

//     res.status(201).json({ message: 'Booking created', booking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Booking failed' });
//   }
// };

// /* ------------------------ 2. Get My Bookings ------------------------ */
// exports.getUserBookings = async (req, res) => {
//   try {
//     const bookings = await Booking
//       .find({ 'user._id': req.user.id }) // FIXED: nested field match
//       .sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to load bookings' });
//   }
// };

// /* ------------------------ 3. Provider Updates Status ------------------------ */
// exports.updateBookingStatus = async (req, res) => {
//   try {
//     const { bookingId, status } = req.body;
//     const allowed = ['Scheduled', 'Completed', 'Cancelled'];
//     if (!allowed.includes(status)) {
//       return res.status(400).json({ error: 'Invalid status value' });
//     }

//     const booking = await Booking.findById(bookingId);
//     if (!booking)
//       return res.status(404).json({ error: 'Booking not found' });

//     const isProvider = booking.provider._id.toString() === req.user.id;
//     if (!isProvider && req.user.role !== 'admin')
//       return res.status(403).json({ error: 'Unauthorized' });

//     booking.status = status;
//     await booking.save();

//     res.json({ message: 'Booking updated', booking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Update failed' });
//   }
// };
// Import necessary Mongoose models
const Booking = require('../models/Booking'); // Booking model
const User    = require('../models/User');    // User model (for user and provider)
const Service = require('../models/Service'); // Service model

/* ------------------------ 1. Book a Service ------------------------ */
exports.bookService = async (req, res) => {
  try {
    // Destructure data sent from frontend (includes Razorpay payment info)
    const { serviceId, providerId, date, paymentDetails } = req.body;

    // Fetch user, provider, and service data concurrently using Promise.all
    const [user, provider, service] = await Promise.all([
      User.findById(req.user.id),      // logged-in user (from JWT token)
      User.findById(providerId),       // service provider selected during booking
      Service.findById(serviceId)      // service being booked
    ]);

    // Create a new booking document in the database
    const booking = await Booking.create({
      user: {
        _id: user._id,                 // Store user ID
        name: user.name,              // Store user name
        email: user.email             // Store user email
      },
      provider: {
        _id: provider._id,            // Store provider ID
        name: provider.name,          // Store provider name
        email: provider.email         // Store provider email
      },
      service: {
        _id: service._id,             // Store service ID
        title: service.title,         // Service title
        category: service.category,   // Service category
        price: service.price          // Service price
      },
      date,                           // Selected booking date
      status: 'Scheduled',            // Initial status of booking
      payment: {                      // Store payment details from Razorpay
        razorpay_payment_id: paymentDetails.razorpay_payment_id,
        razorpay_order_id:   paymentDetails.razorpay_order_id,
        razorpay_signature:  paymentDetails.razorpay_signature,
        amount:   paymentDetails.amount,
        method:   paymentDetails.method,
        currency: paymentDetails.currency,
        status:   paymentDetails.status
      }
    });

    // Send success response with created booking
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: 'Booking failed' }); // Send error response
  }
};

/* ------------------------ 2. Get My Bookings ------------------------ */
exports.getUserBookings = async (req, res) => {
  try {
    // Find bookings where the user ID matches the logged-in user (deep object access)
    const bookings = await Booking
      .find({ 'user._id': req.user.id }) // Match nested field `user._id`
      .sort({ createdAt: -1 }); // Sort by newest first

    res.json(bookings); // Send list of bookings
  } catch (err) {
    console.error(err); // Log error
    res.status(500).json({ error: 'Failed to load bookings' }); // Error response
  }
};

/* ------------------------ 3. Provider Updates Status ------------------------ */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body; // Extract booking ID and new status

    const allowed = ['Scheduled', 'Completed', 'Cancelled']; // Allowed statuses
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' }); // Reject if status is invalid
    }

    const booking = await Booking.findById(bookingId); // Find booking by ID
    if (!booking)
      return res.status(404).json({ error: 'Booking not found' }); // Return 404 if not found

    // Check if the user updating is the provider or an admin
    const isProvider = booking.provider._id.toString() === req.user.id;
    if (!isProvider && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Unauthorized' }); // Reject if not authorized

    booking.status = status; // Update the status
    await booking.save();    // Save updated booking

    res.json({ message: 'Booking updated', booking }); // Return updated booking
  } catch (err) {
    console.error(err); // Log error
    res.status(500).json({ error: 'Update failed' }); // Return error
  }
};
