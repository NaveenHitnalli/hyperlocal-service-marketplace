

// // export default ProviderDashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ProviderDashboard = () => {
//   const [bookings, setBookings] = useState([]);
//   const [statusMap, setStatusMap] = useState({});
//   const [ratings, setRatings] = useState([]);

//   /** ================= Fetch bookings on mount ================= */
//   useEffect(() => {
//     (async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const authHeader = { headers: { Authorization: `Bearer ${token}` } };

//         const res = await axios.get(
//           "http://localhost:5000/api/dashboard/provider",
//           authHeader
//         );
//         setBookings(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, []); // no eslint warning

//   /** ================= Update status ================= */
//   const updateStatus = async (bookingId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const authHeader = { headers: { Authorization: `Bearer ${token}` } };

//       await axios.put(
//         "http://localhost:5000/api/bookings/status",
//         {
//           bookingId,
//           status: statusMap[bookingId],
//         },
//         authHeader
//       );

//       // refresh bookings
//       const res = await axios.get(
//         "http://localhost:5000/api/dashboard/provider",
//         authHeader
//       );
//       setBookings(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   /** ================= Fetch ratings ================= */
//   const fetchRatings = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const { id: providerId } = JSON.parse(atob(token.split(".")[1]));

//       const res = await axios.get(
//         `http://localhost:5000/api/ratings/${providerId}`
//       );
//       setRatings(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Couldn't load ratings");
//     }
//   };

//   /** ================= Badge color ================= */
//   const badgeStyle = {
//     Scheduled: "bg-sky-100 text-sky-700",
//     Completed: "bg-emerald-100 text-emerald-700",
//     Cancelled: "bg-rose-100 text-rose-700",
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-8">
//       <h2 className="text-3xl text-center font-extrabold text-indigo-600 mb-10">
//         Provider Dashboard
//       </h2>

//       {/* ===== Bookings ===== */}
//       <section className="max-w-6xl mx-auto">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//           My Bookings
//         </h3>

//         {bookings.length === 0 ? (
//           <p className="text-gray-600">No assigned bookings.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {bookings.map((b) => (
//               <div
//                 key={b._id}
//                 className="backdrop-blur-md bg-white/70 border border-indigo-100 rounded-xl p-6 shadow hover:shadow-md transition"
//               >
//                 <h4 className="font-medium text-lg text-indigo-700 mb-1">
//                   {b.service.title}
//                 </h4>
//                 <p className="text-sm text-gray-600 mb-4">
//                   <span className="font-semibold">Customer:</span>{" "}
//                   {b.user.name}
//                   <br />
//                   <span className="font-semibold">Date:</span>{" "}
//                   {new Date(b.date).toLocaleString("en-IN")}
//                 </p>

//                 <span
//                   className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${badgeStyle[b.status]}`}
//                 >
//                   {b.status}
//                 </span>

//                 <select
//                   value={statusMap[b._id] || b.status}
//                   onChange={(e) =>
//                     setStatusMap({ ...statusMap, [b._id]: e.target.value })
//                   }
//                   className="w-full mb-3 rounded-md border-gray-300 focus:ring-indigo-500"
//                 >
//                   <option value="Scheduled">Scheduled</option>
//                   <option value="Completed">Completed</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>

//                 <button
//                   onClick={() => updateStatus(b._id)}
//                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition active:scale-95"
//                 >
//                   Update Status
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ===== Ratings ===== */}
//       <section className="max-w-4xl mx-auto mt-16">
//         <h3 className="text-2xl font-semibold text-gray-800 mb-4">
//           My Ratings &amp; Reviews
//         </h3>

//         <button
//           onClick={fetchRatings}
//           className="mb-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition active:scale-95"
//         >
//           View My Ratings
//         </button>

//         {ratings.length === 0 ? (
//           <p className="text-gray-600">No ratings yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {ratings.map((r) => (
//               <div
//                 key={r._id}
//                 className="bg-white/70 backdrop-blur-md border border-purple-100 rounded-xl p-6 shadow"
//               >
//                 <p className="font-medium text-gray-800 mb-1">
//                   {r.user.name}
//                   <span className="ml-2 text-amber-500">
//                     {"★".repeat(r.rating)}
//                   </span>
//                 </p>
//                 <p className="text-gray-700 text-sm">{r.comment}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ProviderDashboard;
// Importing necessary libraries and hooks
import React, { useEffect, useState } from "react";
import axios from "axios";

// ProviderDashboard Component
const ProviderDashboard = () => {
  // Bookings assigned to the provider
  const [bookings, setBookings] = useState([]);

  // Track the updated status of each booking before submitting
  const [statusMap, setStatusMap] = useState({});

  // Store the ratings given to the provider
  const [ratings, setRatings] = useState([]);

  /** ================= Fetch bookings on component mount ================= */
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const authHeader = { headers: { Authorization: `Bearer ${token}` } }; // Set Authorization header

        // Fetch all bookings assigned to this provider
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/provider",
          authHeader
        );
        setBookings(res.data); // Save bookings in state
      } catch (err) {
        console.error(err);
      }
    })(); // Immediately-invoked async function
  }, []); // Run only once on mount

  /** ================= Update booking status ================= */
  const updateStatus = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = { headers: { Authorization: `Bearer ${token}` } };

      // Send status update to backend
      await axios.put(
        "http://localhost:5000/api/bookings/status",
        {
          bookingId,
          status: statusMap[bookingId], // Use updated status from statusMap
        },
        authHeader
      );

      // Refresh the bookings after update
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/provider",
        authHeader
      );
      setBookings(res.data); // Update bookings state
    } catch (err) {
      console.error(err);
      alert("Update failed"); // Show alert on failure
    }
  };

  /** ================= Fetch ratings for this provider ================= */
  const fetchRatings = async () => {
    try {
      const token = localStorage.getItem("token");

      // Decode JWT to extract provider ID
      const { id: providerId } = JSON.parse(atob(token.split(".")[1]));

      // Get ratings for the current provider
      const res = await axios.get(
        `http://localhost:5000/api/ratings/${providerId}`
      );
      setRatings(res.data); // Save ratings to state
    } catch (err) {
      console.error(err);
      alert("Couldn't load ratings");
    }
  };

  /** ================= Badge styles for different statuses ================= */
  const badgeStyle = {
    Scheduled: "bg-sky-100 text-sky-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-rose-100 text-rose-700",
  };

  // UI rendering starts here
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-8">
      {/* Dashboard heading */}
      <h2 className="text-3xl text-center font-extrabold text-indigo-600 mb-10">
        Provider Dashboard
      </h2>

      {/* ========== BOOKINGS SECTION ========== */}
      <section className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          My Bookings
        </h3>

        {/* No bookings message */}
        {bookings.length === 0 ? (
          <p className="text-gray-600">No assigned bookings.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Loop through bookings */}
            {bookings.map((b) => (
              <div
                key={b._id}
                className="backdrop-blur-md bg-white/70 border border-indigo-100 rounded-xl p-6 shadow hover:shadow-md transition"
              >
                {/* Service title */}
                <h4 className="font-medium text-lg text-indigo-700 mb-1">
                  {b.service.title}
                </h4>

                {/* Customer name and booking date */}
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Customer:</span> {b.user.name}
                  <br />
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(b.date).toLocaleString("en-IN")}
                </p>

                {/* Booking status badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${badgeStyle[b.status]}`}
                >
                  {b.status}
                </span>

                {/* Dropdown to change status */}
                <select
                  value={statusMap[b._id] || b.status}
                  onChange={(e) =>
                    setStatusMap({ ...statusMap, [b._id]: e.target.value })
                  }
                  className="w-full mb-3 rounded-md border-gray-300 focus:ring-indigo-500"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Submit status update */}
                <button
                  onClick={() => updateStatus(b._id)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition active:scale-95"
                >
                  Update Status
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== RATINGS SECTION ========== */}
      <section className="max-w-4xl mx-auto mt-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          My Ratings &amp; Reviews
        </h3>

        {/* Button to load ratings */}
        <button
          onClick={fetchRatings}
          className="mb-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition active:scale-95"
        >
          View My Ratings
        </button>

        {/* Display ratings or message if none */}
        {ratings.length === 0 ? (
          <p className="text-gray-600">No ratings yet.</p>
        ) : (
          <div className="space-y-6">
            {ratings.map((r) => (
              <div
                key={r._id}
                className="bg-white/70 backdrop-blur-md border border-purple-100 rounded-xl p-6 shadow"
              >
                {/* Reviewer name and star rating */}
                <p className="font-medium text-gray-800 mb-1">
                  {r.user.name}
                  <span className="ml-2 text-amber-500">
                    {"★".repeat(r.rating)}
                  </span>
                </p>
                {/* Review comment */}
                <p className="text-gray-700 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Export the ProviderDashboard component
export default ProviderDashboard;
