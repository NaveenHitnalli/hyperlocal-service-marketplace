
// // Import required hooks and libraries
// import React, { useState } from 'react'; // useState is used for form state management
// import axios from 'axios'; // axios is used for making HTTP requests
// import { useNavigate } from 'react-router-dom'; // useNavigate is used to redirect user after submission

// // Define the component
// export default function CreateService() {
//   // Define a state object to hold form data (title, description, category, price, location)
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     category: '',
//     price: '',
//     location: ''
//   });

//   // Initialize useNavigate to programmatically navigate to another route after form submission
//   const navigate = useNavigate();

//   // Handle input changes and update the form state
//   const handle = e =>
//     setForm({ ...form, [e.target.name]: e.target.value }); // Dynamically update the field by name

//   // Handle form submission
//   const submit = async e => {
//     e.preventDefault(); // Prevent default form reload
//     const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage for authorization

//     // Send POST request to backend to create new service
//     await axios.post('http://localhost:5000/api/services', form, {
//       headers: { Authorization: `Bearer ${token}` } // Set Authorization header
//     });

//     alert('Service created!'); // Show success alert
//      navigate('/dashboard/provider');
//     navigate('/dashboard/provider'); // Redirect to provider dashboard
//   };

//   // Return JSX with the service creation form
//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg animate__animated animate__fadeIn">
//       {/* Heading */}
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
//         Create a New Service
//       </h2>

//       {/* Form */}
//       <form onSubmit={submit} className="space-y-4">
//         {/* Input for title */}
//         <input
//           className="form-control"
//           name="title"
//           placeholder="Title"
//           onChange={handle}
//           required
//         />

//         {/* Textarea for description */}
//         <textarea
//           className="form-control"
//           name="description"
//           placeholder="Description"
//           onChange={handle}
//           rows={3}
//         />

//         {/* Input for category */}
//         <input
//           className="form-control"
//           name="category"
//           placeholder="Category"
//           onChange={handle}
//         />

//         {/* Input for price */}
//         <input
//           className="form-control"
//           name="price"
//           type="number"
//           placeholder="Price (₹)"
//           onChange={handle}
//         />

//         {/* Input for location */}
//         <input
//           className="form-control"
//           name="location"
//           placeholder="Location"
//           onChange={handle}
//         />

//         {/* Submit button */}
//         <button className="btn btn-success w-full">
//           Save & Go to Dashboard
//         </button>
//       </form>
//     </div>
//   );
// }
// CreateService.js
import React, { useState } from 'react';              // React + state hook
import axios from 'axios';                            // HTTP client for the API call
import { useNavigate } from 'react-router-dom';       // For programmatic navigation

export default function CreateService() {
  // Controlled form state for the new service
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: ''
  });

  const navigate = useNavigate();                     // Initialize navigation helper

  /* --- Handle every input change ------------------------------------------------ */
  // Spread previous form state, then overwrite only the changed field
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  /* --- Submit form ---------------------------------------------------------------- */
  const submit = async e => {
    e.preventDefault();                               // Stop default page reload
    const token = localStorage.getItem('token');      // Grab JWT for auth header

    // Make POST request to create the service
    await axios.post('http://localhost:5000/api/services', form, {
      headers: { Authorization: `Bearer ${token}` }
    });

    /* -------- FIRST NAVIGATE ----------
       Go to /services so the provider can instantly see the new listing */
    navigate('/services');

    /* -------- OPTIONAL SECOND NAVIGATE ----------
       After 3 seconds, send them to their provider dashboard
       (change 3000 → any delay in ms, or delete this block if not needed)   */
    setTimeout(() => {
      navigate('/dashboard/provider');
    }, 10000);
  };

  /* --- UI ------------------------------------------------------------------------ */
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg animate__animated animate__fadeIn">
      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Create a New Service
      </h2>

      {/* Service‑creation form */}
      <form onSubmit={submit} className="space-y-4">
        {/* Service title */}
        <input
          className="form-control"
          name="title"
          placeholder="Title"
          onChange={handle}
          required
        />

        {/* Description */}
        <textarea
          className="form-control"
          name="description"
          placeholder="Description"
          rows={3}
          onChange={handle}
        />

        {/* Category */}
        <input
          className="form-control"
          name="category"
          placeholder="Category"
          onChange={handle}
        />

        {/* Price */}
        <input
          className="form-control"
          name="price"
          type="number"
          placeholder="Price (₹)"
          onChange={handle}
        />

        {/* Location */}
        <input
          className="form-control"
          name="location"
          placeholder="Location"
          onChange={handle}
        />

        {/* Submit */}
        <button className="btn btn-success w-full">
          Save &amp; View Service
        </button>
      </form>
    </div>
  );
}
