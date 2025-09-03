

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [data, setData] = useState({ users: [], services: [], bookings: [] });

//   // fetch every time component mounts
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/api/admin/data", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setData(res.data));
//   }, []);

//   // color pill by booking status
//   const statusStyle = {
//     Completed: "bg-emerald-100 text-emerald-700",
//     Cancelled: "bg-rose-100 text-rose-700",
//     Scheduled: "bg-sky-100 text-sky-700",
//   };

//   return (
//     <main className="mx-auto max-w-screen-xl px-4 py-8">
//       {/* Title */}
//       <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-10">
//         Admin Dashboard
//       </h1>

//       {/* ===== USERS ===== */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users And Providers</h2>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {data.users.map((u) => (
//             <div
//               className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm hover:shadow-md transition"
//               key={u._id}
//             >
//               <h3 className="font-medium text-lg text-gray-900">{u.name}</h3>
//               <p className="mt-2 text-sm text-gray-600">
//                 <span className="font-semibold">Role:</span> {u.role}
//                 <br />
//                 <span className="font-semibold">Email:</span> {u.email}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== SERVICES ===== */}
//       <section className="mb-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services</h2>

//         <div className="grid gap-6 sm:grid-cols-2">
//           {data.services.map((s) => (
//             <div
//               className="flex flex-col justify-between rounded-xl border border-teal-100 bg-white p-5 shadow-sm hover:shadow-md transition"
//               key={s._id}
//             >
//               <div>
//                 <h3 className="font-medium text-lg text-teal-700">
//                   {s.title}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-600">
//                   {s.description?.slice(0, 80)}…
//                 </p>
//               </div>

//               <div className="mt-4 text-sm text-gray-700 space-y-1">
//                 <p>
//                   <span className="font-semibold">Provider:</span>{" "}
//                   {s.provider?.name || "N/A"}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Location:</span>{" "}
//                   {s.location || "-"}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Price:</span> ₹{s.price}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== BOOKINGS ===== */}
//       <section>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bookings</h2>

//         <div className="space-y-6">
//           {data.bookings.map((b) => (
//             <div
//               className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm hover:shadow-md transition"
//               key={b._id}
//             >
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 {/* Left info */}
//                 <div>
//                   <h3 className="font-medium text-lg text-amber-700">
//                     {b.service?.title}
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-600">
//                     <span className="font-semibold">User:</span>{" "}
//                     {b.user?.name || "N/A"}
//                     <br />
//                     <span className="font-semibold">Provider:</span>{" "}
//                     {b.provider?.name || "N/A"}
//                   </p>
//                 </div>

//                 {/* Right info */}
//                 <div className="text-sm text-gray-700">
//                   <p className="mb-2">
//                     <span
//                       className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusStyle[b.status]}`}
//                     >
//                       {b.status}
//                     </span>
//                   </p>
//                   <p>
//                     <span className="font-semibold">Date: </span>
//                     {new Date(b.date).toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// };

// export default AdminDashboard;

// Import React hooks and axios for HTTP requests
import React, { useEffect, useState } from "react";
import axios from "axios";

// AdminDashboard component
const AdminDashboard = () => {
  // Initialize state to hold users, services, and bookings data
  const [data, setData] = useState({ users: [], services: [], bookings: [] });

  // Fetch admin data (users, services, bookings) on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get auth token from localStorage
    axios
      .get("http://localhost:5000/api/admin/data", {
        headers: { Authorization: `Bearer ${token}` }, // Send token in header
      })
      .then((res) => setData(res.data)); // Set the fetched data into state
  }, []);

  // Define styling classes based on booking status
  const statusStyle = {
    Completed: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-rose-100 text-rose-700",
    Scheduled: "bg-sky-100 text-sky-700",
  };

  return (
    // Main container with padding and width
    <main className="mx-auto max-w-screen-xl px-4 py-8">

      {/* Title Header */}
      <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-10">
        Admin Dashboard
      </h1>

      {/* ==== USERS & PROVIDERS ==== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users And Providers</h2>

        {/* Grid layout for user cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.users.map((u) => (
            <div
              className="rounded-xl border border-indigo-100 bg-white p-5 shadow-sm hover:shadow-md transition"
              key={u._id} // Unique key for each user
            >
              <h3 className="font-medium text-lg text-gray-900">{u.name}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {/* Show user role and email */}
                <span className="font-semibold">Role:</span> {u.role}
                <br />
                <span className="font-semibold">Email:</span> {u.email}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==== SERVICES ==== */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Services</h2>

        {/* Grid layout for service cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {data.services.map((s) => (
            <div
              className="flex flex-col justify-between rounded-xl border border-teal-100 bg-white p-5 shadow-sm hover:shadow-md transition"
              key={s._id} // Unique key for each service
            >
              <div>
                {/* Service title */}
                <h3 className="font-medium text-lg text-teal-700">
                  {s.title}
                </h3>
                {/* Truncated description */}
                <p className="mt-1 text-sm text-gray-600">
                  {s.description?.slice(0, 80)}…
                </p>
              </div>

              {/* Service metadata: provider, location, price */}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-semibold">Provider:</span>{" "}
                  {s.provider?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {s.location || "-"}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ₹{s.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==== BOOKINGS ==== */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bookings</h2>

        {/* List of all bookings */}
        <div className="space-y-6">
          {data.bookings.map((b) => (
            <div
              className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm hover:shadow-md transition"
              key={b._id} // Unique key for each booking
            >
              {/* Flex container for responsive layout */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                {/* Left section: service, user, provider info */}
                <div>
                  <h3 className="font-medium text-lg text-amber-700">
                    {b.service?.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    <span className="font-semibold">User:</span>{" "}
                    {b.user?.name || "N/A"}
                    <br />
                    <span className="font-semibold">Provider:</span>{" "}
                    {b.provider?.name || "N/A"}
                  </p>
                </div>

                {/* Right section: status & booking date */}
                <div className="text-sm text-gray-700">
                  {/* Booking status with dynamic color */}
                  <p className="mb-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusStyle[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </p>

                  {/* Booking date/time formatted */}
                  <p>
                    <span className="font-semibold">Date: </span>
                    {new Date(b.date).toLocaleString()}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard; // Export component to use in app
