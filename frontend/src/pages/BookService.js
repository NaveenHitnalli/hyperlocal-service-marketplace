




// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";

// const BookService = () => {
//   // service object comes from <Link state={service}> on the previous page
//   const { state: service } = useLocation();
//   const navigate = useNavigate();

//   const [date, setDate] = useState("");
//   const token = localStorage.getItem("token"); // JWT

//   /* --------------------------- Main flow --------------------------- */
//   const openCheckout = async () => {
//     try {
//       if (!date) return alert("Choose a date & time first");

//       // 0. Get public Razorpay key
//       const {
//         data: { key },
//       } = await axios.get("http://localhost:5000/api/payments/key");

//       // 1. Create order (protected)
//       const { data: order } = await axios.post(
//         "http://localhost:5000/api/payments/create-order",
//         { amount: service.price }, // rupees
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // 2. Configure Razorpay checkout
//       const options = {
//         key,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.id,
//         name: "Hyperlocal Service Marketplace",
//         description: service.title,
//         prefill: { name: service.provider.name },
//         theme: { color: "#6366f1" }, // indigo-500
//         handler: async (response) => {
//           // 3. On success → create booking
//           const paymentDetails = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//             amount: order.amount / 100,
//             currency: order.currency,
//             method: "upi",
//             status: "Paid",
//           };

//           await axios.post(
//             "http://localhost:5000/api/bookings",
//             {
//               serviceId: service._id,
//               providerId: service.provider._id,
//               date,
//               paymentDetails,
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//           );

//           alert("✅ Booking & payment successful!");
//           navigate("/dashboard/user");
//         },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       const msg =
//         err.response?.data?.error ||
//         (err.message.includes("ECONNREFUSED")
//           ? "Backend not reachable"
//           : err.message);
//       alert(`Payment failed: ${msg}`);
//       console.error(err);
//     }
//   };

//   /* ------------------------------ UI ------------------------------ */
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-sky-100 px-4 py-10">
//       <div className="w-full max-w-lg bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8">
//         {/* Header */}
//         <h2 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-700 mb-6">
//           Book&nbsp;{service.title}
//         </h2>

//         {/* Provider & price info */}
//         <div className="text-center mb-6">
//           <p className="text-gray-700">
//             <span className="font-semibold">Provider:</span>{" "}
//             {service.provider.name}
//           </p>
//           <p className="text-emerald-600 font-semibold text-lg">
//             Price: ₹{service.price}
//           </p>
//         </div>

//         {/* Date-time input */}
//         <div className="form-floating mb-6">
//           <input
//             type="datetime-local"
//             id="datetimeInput"
//             className="form-control focus:ring-2 focus:ring-indigo-400"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//           />
//           <label htmlFor="datetimeInput">Choose Date &amp; Time</label>
//         </div>

//         {/* Pay button */}
//         <button
//           onClick={openCheckout}
//           disabled={!date}
//           className={`w-full py-2.5 rounded-md text-white font-semibold transition 
//             ${
//               date
//                 ? "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
//                 : "bg-indigo-300 cursor-not-allowed"
//             }`}
//         >
//           Pay&nbsp;₹{service.price}&nbsp;&amp; Confirm
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookService;
// Import required dependencies from React and Axios for state and API requests
import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Component to handle service booking and payment
const BookService = () => {
  // Access service object passed via React Router's <Link state={service}> from the previous page
  const { state: service } = useLocation();
  const navigate = useNavigate(); // For redirecting after booking

  // Store the selected date/time from user input
  const [date, setDate] = useState("");

  // Get JWT token from local storage for authentication
  const token = localStorage.getItem("token");

  /* --------------------------- Main Checkout Flow --------------------------- */
  const openCheckout = async () => {
    try {
      // If no date is selected, prompt the user
      if (!date) return alert("Choose a date & time first");

      // Step 0: Get Razorpay public key from backend
      const {
        data: { key },
      } = await axios.get("http://localhost:5000/api/payments/key");

      // Step 1: Create a payment order (backend generates this securely)
      const { data: order } = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        { amount: service.price }, // Send price in ₹
        { headers: { Authorization: `Bearer ${token}` } } // Auth header
      );

      // Step 2: Configure Razorpay checkout options
      const options = {
        key,                    // Razorpay public key
        amount: order.amount,   // Amount in paisa
        currency: order.currency,
        order_id: order.id,     // Unique Razorpay order ID
        name: "Hyperlocal Service Marketplace", // Company name
        description: service.title,             // Service being booked
        prefill: { name: service.provider.name }, // Prefill provider's name
        theme: { color: "#6366f1" },               // Indigo color for branding

        // Step 3: Payment success handler
        handler: async (response) => {
          // Build payment details from Razorpay response
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: order.amount / 100, // Convert back to ₹
            currency: order.currency,
            method: "upi",             // Hardcoded here; in production fetch from response
            status: "Paid"
          };

          // Step 4: Finalize booking by sending payment and booking info to backend
          await axios.post(
            "http://localhost:5000/api/bookings",
            {
              serviceId: service._id,
              providerId: service.provider._id,
              date,
              paymentDetails,
            },
            { headers: { Authorization: `Bearer ${token}` } } // Auth header
          );

          // Show success alert and navigate to user dashboard
          alert("✅ Booking & payment successful!");
          navigate("/dashboard/user");
        },
      };

      // Step 5: Open the Razorpay checkout popup
      new window.Razorpay(options).open();
    } catch (err) {
      // Catch and show error message
      const msg =
        err.response?.data?.error ||
        (err.message.includes("ECONNREFUSED")
          ? "Backend not reachable"
          : err.message);
      alert(`Payment failed: ${msg}`);
      console.error(err);
    }
  };

  /* ------------------------------ UI Rendering ------------------------------ */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-sky-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-8">
        {/* Title of the booking page */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Book&nbsp;{service.title}
        </h2>

        {/* Provider and price information */}
        <div className="text-center mb-6">
          <p className="text-gray-700">
            <span className="font-semibold">Provider:</span>{" "}
            {service.provider.name}
          </p>
          <p className="text-emerald-600 font-semibold text-lg">
            Price: ₹{service.price}
          </p>
        </div>

        {/* Date and Time Picker Input */}
        <div className="form-floating mb-6">
          <input
            type="datetime-local"
            id="datetimeInput"
            className="form-control focus:ring-2 focus:ring-indigo-400"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Store selected date/time
            required
          />
          <label htmlFor="datetimeInput">Choose Date &amp; Time</label>
        </div>

        {/* Button to trigger Razorpay checkout */}
        <button
          onClick={openCheckout}
          disabled={!date} // Disable button until a date is selected
          className={`w-full py-2.5 rounded-md text-white font-semibold transition 
            ${
              date
                ? "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
        >
          Pay&nbsp;₹{service.price}&nbsp;&amp; Confirm
        </button>
      </div>
    </div>
  );
};

// Export the component for use in routes
export default BookService;
