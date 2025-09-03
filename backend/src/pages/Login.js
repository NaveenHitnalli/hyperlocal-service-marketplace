// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post('http://localhost:5000/api/auth/login', form);
//     alert(`Welcome ${res.data.user.name}`);
//     localStorage.setItem('token', res.data.token);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" placeholder="Password" type="password" onChange={handleChange} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
// Import React and useState hook for managing component state
import React, { useState } from 'react';
// Import Axios for making HTTP requests
import axios from 'axios';

// Define the Login functional component
const Login = () => {
  // Declare state for form inputs: email and password
  const [form, setForm] = useState({ email: '', password: '' });

  // Handle input changes and update the form state accordingly
  const handleChange = (e) => 
    // Use the input's "name" attribute to dynamically set either email or password in state
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit (which reloads the page)

    try {
      // Make a POST request to the login API with the form data (email & password)
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      // Show a welcome alert with the logged-in user's name from the API response
      alert(`Welcome ${res.data.user.name}`);

      // Store the JWT token received from the backend in localStorage for future authenticated requests
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      // Handle errors (e.g., invalid credentials, server issues)
      alert('Login failed. Please check your credentials.');
    }
  };

  // Render the login form
  return (
    // Call handleSubmit when the form is submitted
    <form onSubmit={handleSubmit}>
      {/* Email input field */}
      <input
        name="email"                  // Name must match the state key
        placeholder="Email"           // Placeholder text
        onChange={handleChange}       // Update state on input change
      />

      {/* Password input field */}
      <input
        name="password"               // Name must match the state key
        placeholder="Password"        // Placeholder text
        type="password"               // Hide the input text
        onChange={handleChange}       // Update state on input change
      />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

// Export the Login component to be used in other parts of the app
export default Login;
