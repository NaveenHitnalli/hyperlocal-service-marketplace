
// const razorpay = require('../config/razorpay');

// /* GET /api/payments/key  →  { key: 'rzp_test_…' } */
// exports.getKey = (_, res) =>
//   res.json({ key: process.env.RAZORPAY_KEY_ID });

// /* POST /api/payments/create-order  { amount }  */
// exports.createOrder = async (req, res) => {
//   try {
//     const amountRupees = Number(req.body.amount);
//     if (amountRupees < 1)
//       return res.status(400).json({ error: 'Amount must be ≥ ₹1' });

//     const options = {
//       amount:   amountRupees * 100,                // rupees → paise
//       currency: process.env.CURRENCY || 'INR',
//       receipt:  `rcpt_${Date.now()}`
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);                               // { id, amount, … }
//   } catch (err) {
//     console.error('[Razorpay] createOrder', err);
//     res.status(500).json({ error: 'Unable to create Razorpay order' });
//   }
// };

// Import the Razorpay instance (configured with your key/secret)
const razorpay = require('../config/razorpay');

/**
 * GET /api/payments/key
 * Returns the public Razorpay key to the frontend
 * Used by Razorpay checkout form
 */
exports.getKey = (_, res) =>
  res.json({ key: process.env.RAZORPAY_KEY_ID }); // send Razorpay key as JSON

/**
 * POST /api/payments/create-order
 * Creates a Razorpay order with the specified amount
 * Request Body: { amount }
 */
exports.createOrder = async (req, res) => {
  try {
    // Convert the amount from request body to a number
    const amountRupees = Number(req.body.amount);

    // Validate that the amount is at least ₹1
    if (amountRupees < 1)
      return res.status(400).json({ error: 'Amount must be ≥ ₹1' });

    // Setup Razorpay order options
    const options = {
      amount: amountRupees * 100,                     // Convert ₹ to paise (multiply by 100)
      currency: process.env.CURRENCY || 'INR',        // Currency (default to INR)
      receipt: `rcpt_${Date.now()}`                   // Generate unique receipt ID using timestamp
    };

    // Create order using Razorpay SDK
    const order = await razorpay.orders.create(options);

    // Return the Razorpay order object to the frontend
    res.json(order);  // Example: { id, amount, currency, receipt, status, ... }
  } catch (err) {
    // Log the error to server console
    console.error('[Razorpay] createOrder', err);

    // Return error response to frontend
    res.status(500).json({ error: 'Unable to create Razorpay order' });
  }
};
