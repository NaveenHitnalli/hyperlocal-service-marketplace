// const Rating = require('../models/Rating');
// const Booking = require('../models/Booking');

// exports.addRating = async (req, res) => {
//   try {
//     const { bookingId, rating, comment } = req.body;

//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     const newRating = await Rating.create({
//       user: {
//         _id: req.user.id,
//         name: req.user.name
//       },
//       provider: {
//         _id: booking.provider._id,
//         name: booking.provider.name
//       },
//       booking: bookingId,
//       rating,
//       comment
//     });

//     res.status(201).json(newRating);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to submit rating' });
//   }
// };

// exports.getProviderRatings = async (req, res) => {
//   try {
//     const providerId = req.params.id;
//     const ratings = await Rating.find({ 'provider._id': providerId }).sort({ createdAt: -1 });
//     res.json(ratings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch ratings' });
//   }
// };
// Import the Rating and Booking models from the models folder
const Rating = require('../models/Rating');
const Booking = require('../models/Booking');

// Controller to handle adding a new rating
exports.addRating = async (req, res) => {
  try {
    // Extract required fields from request body
    const { bookingId, rating, comment } = req.body;

    // Find the booking by ID to validate and get provider details
    const booking = await Booking.findById(bookingId);

    // If booking is not found, return a 404 error
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Create a new Rating document in the database
    const newRating = await Rating.create({
      // Attach the currently logged-in user's ID and name (from JWT middleware)
      user: {
        _id: req.user.id,
        name: req.user.name
      },
      // Attach the provider's ID and name from the booking document
      provider: {
        _id: booking.provider._id,
        name: booking.provider.name
      },
      // Reference the booking ID
      booking: bookingId,
      // Include the rating value (1-5)
      rating,
      // Include the user’s review comment
      comment
    });

    // Return the newly created rating with status 201 (Created)
    res.status(201).json(newRating);

  } catch (err) {
    // Log the error and return 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: 'Failed to submit rating' });
  }
};

// Controller to fetch all ratings for a specific provider
exports.getProviderRatings = async (req, res) => {
  try {
    // Extract provider ID from request URL parameter
    const providerId = req.params.id;

    // Find all ratings where the provider._id matches, and sort them by newest first
    const ratings = await Rating.find({ 'provider._id': providerId }).sort({ createdAt: -1 });

    // Return all ratings as JSON
    res.json(ratings);

  } catch (err) {
    // Log the error and return a 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};
