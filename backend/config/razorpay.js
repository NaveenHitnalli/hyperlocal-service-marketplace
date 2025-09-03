
// backend/config/razorpay.js
const Razorpay = require('razorpay');
require('dotenv').config();             // make sure .env is loaded

// Accept either KEY_ID / KEY or KEY_SECRET / SECRET,
// so the code works even if someone uses the old names.
const key_id     = process.env.RAZORPAY_KEY_ID     || process.env.RAZORPAY_KEY;
const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

if (!key_id || !key_secret) {
  throw new Error('Razorpay key_id or key_secret missing – check your .env file');
}

const razorpayInstance = new Razorpay({ key_id, key_secret });

module.exports = razorpayInstance;
