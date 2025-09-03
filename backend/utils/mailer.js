const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendBookingConfirmationToUser = async (to, userName, serviceTitle, date) => {
  const mailOptions = {
    from: `"Hyperlocal Services" <${process.env.MAIL_USER}>`,
    to,
    subject: 'Your Booking is Confirmed',
    html: `
      <p>Hi ${userName},</p>
      <p>You've booked <strong>${serviceTitle}</strong> for <strong>${new Date(date).toLocaleString()}</strong>.</p>
      <p>Thank you!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to user: ${to}`);
  } catch (err) {
    console.error('❌ Email sending failed:', err);
  }
};

module.exports = sendBookingConfirmationToUser;
