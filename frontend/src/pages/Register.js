
// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', form);
    alert('Registered successfully!');
    navigate('/login');
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-xl p-8 animate__animated animate__zoomIn">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="form-control" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" className="form-control" onChange={handleChange}>
          <option value="user">User</option>
          <option value="provider">Provider</option>
        </select>
        <button type="submit" className="btn btn-success w-full">Register</button>
      </form>
    </div>
  );
}
