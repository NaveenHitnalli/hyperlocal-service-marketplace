
// const Booking = require('../models/Booking');

// // ======================
// // GET Bookings for User
// // ======================
// exports.getUserBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user.id })
//       .populate({
//         path: 'service',
//         populate: { path: 'provider', select: 'name email' } // also include provider name in service
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json(bookings);
//   } catch (err) {
//     console.error('Error fetching user bookings:', err);
//     res.status(500).json({ error: 'Failed to fetch bookings' });
//   }
// };

// // =========================
// // GET Bookings for Provider
// // =========================
// exports.getProviderBookings = async (req, res) => {
//   try {
//     const bookings = await Booking
//       .find({ 'provider._id': req.user.id })  // ✅ FIXED
//       .sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to load provider bookings' });
//   }
// };
// // 
// Import the Booking model to interact with the bookings collection
const Booking = require('../models/Booking');

// ==============================
// GET Bookings for Logged-in User
// ==============================
exports.getUserBookings = async (req, res) => {
  try {
    // Fetch bookings from the database where the user matches the logged-in user
    const bookings = await Booking.find({ user: req.user.id })

      // Populate the 'service' field (which is a reference) with actual service details
      .populate({
        path: 'service',
        populate: {
          path: 'provider',       // Also populate the 'provider' of that service
          select: 'name email'    // Only include name and email of the provider
        }
      })

      // Sort the bookings so the latest one appears first
      .sort({ createdAt: -1 });

    // Send the bookings in the response with 200 OK
    res.status(200).json(bookings);
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching user bookings:', err);

    // Send a 500 Internal Server Error with a message
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// ==============================
// GET Bookings for Logged-in Provider
// ==============================
exports.getProviderBookings = async (req, res) => {
  try {
    // Fetch bookings where the provider field matches the logged-in user's ID
    const bookings = await Booking.find({ provider: req.user.id })

      // Sort the bookings so the latest one appears first
      .sort({ createdAt: -1 });

    // Return the provider's bookings as a JSON response
    res.json(bookings);
  } catch (err) {
    // Log any error encountered while fetching
    console.error(err);

    // Send a 500 Internal Server Error with a descriptive message
    res.status(500).json({ error: 'Failed to load provider bookings' });
  }
};


