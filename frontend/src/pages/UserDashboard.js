


// import React, { useEffect, useState } from 'react';




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [ratingMap, setRatingMap] = useState({}); // { bookingId: { rating, comment } }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/bookings/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  const submitRating = async (bookingId) => {
    const ratingObj = ratingMap[bookingId] || {};

    if (!ratingObj.rating) {
      return alert('Please enter a rating between 1 and 5');
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/ratings',
        {
          bookingId,
          rating: Number(ratingObj.rating),
          comment: ratingObj.comment || ''
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('✅ Review submitted!');
      setRatingMap((prev) => ({ ...prev, [bookingId]: {} }));
    } catch (err) {
      console.error(err);
      alert('❌ Failed to submit review');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">User Dashboard</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-5 space-y-3 transition hover:shadow-xl"
            >
              <h4 className="text-xl font-semibold text-indigo-600">{booking.service.title}</h4>

              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.date).toLocaleString('en-IN')}</p>
                <p><strong>Provider:</strong> {booking.provider.name}</p>
              </div>

              <div className="text-sm text-slate-700 mt-3">
                <h5 className="text-md font-semibold">Payment Details</h5>
                <p><strong>Status:</strong> {booking.payment.status}</p>
                <p><strong>Method:</strong> {booking.payment.method}</p>
                <p><strong>Amount Paid:</strong> ₹{booking.payment.amount}</p>
                <p><strong>Payment ID:</strong> {booking.payment.razorpay_payment_id}</p>
                <p><strong>Order ID:</strong> {booking.payment.razorpay_order_id}</p>
              </div>

              {/* === Review Form === */}
              {booking.status === 'Completed' && (
                <div className="pt-3 border-t border-gray-200">
                  <h5 className="text-md font-semibold text-emerald-600 mb-2">Leave a Review</h5>

                  <div className="form-floating mb-2">
                    <input
                      type="number"
                      className="form-control"
                      id={`rating-${booking._id}`}
                      placeholder="Rating"
                      min="1"
                      max="5"
                      value={ratingMap[booking._id]?.rating || ''}
                      onChange={(e) =>
                        setRatingMap((prev) => ({
                          ...prev,
                          [booking._id]: {
                            ...prev[booking._id],
                            rating: e.target.value
                          }
                        }))
                      }
                    />
                    <label htmlFor={`rating-${booking._id}`}>Rating (1–5)</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id={`comment-${booking._id}`}
                      placeholder="Comment"
                      value={ratingMap[booking._id]?.comment || ''}
                      onChange={(e) =>
                        setRatingMap((prev) => ({
                          ...prev,
                          [booking._id]: {
                            ...prev[booking._id],
                            comment: e.target.value
                          }
                        }))
                      }
                    />
                    <label htmlFor={`comment-${booking._id}`}>Comment</label>
                  </div>

                  <button
                    className="btn btn-success w-100 transition hover:scale-105"
                    onClick={() => submitRating(booking._id)}
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
