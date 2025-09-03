// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('http://localhost:5000/api/auth/register', form);
//     alert('Registered!');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" onChange={handleChange} />
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" placeholder="Password" type="password" onChange={handleChange} />
//       <select name="role" onChange={handleChange}>
//         <option value="user">User</option>
//         <option value="provider">Provider</option>
//       </select>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;
// Importing necessary modules from React and Axios
import React, { useState } from 'react';  // useState is used to manage component state
import axios from 'axios';               // Axios is used for making HTTP requests

// Functional component for user registration
const Register = () => {

  // useState hook to manage form data
  const [form, setForm] = useState({
    name: '',          // User's name
    email: '',         // User's email
    password: '',      // User's password
    role: 'user'       // Default role is "user", can also be "provider"
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    // Updates the state dynamically based on input field name
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior (page reload)

    // Send POST request to backend API to register the user
    await axios.post('http://localhost:5000/api/auth/register', form);

    // Alert the user after successful registration
    alert('Registered!');
  };

  // JSX returned by the component - the actual UI of the form
  return (
    <form onSubmit={handleSubmit}> {/* When submitted, run handleSubmit */}
      <input 
        name="name"                    // Binds to "name" in form state
        placeholder="Name"            // Placeholder text in input
        onChange={handleChange}       // Calls handleChange on user input
      />
      <input 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} 
      />
      <input 
        name="password" 
        placeholder="Password" 
        type="password"               // Hides password input
        onChange={handleChange} 
      />
      <select 
        name="role"                   // Allows user to choose role: user or provider
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="provider">Provider</option>
      </select>
      <button type="submit">Register</button> {/* Submits the form */}
    </form>
  );
};

// Exporting the Register component for use in the app
export default Register;
