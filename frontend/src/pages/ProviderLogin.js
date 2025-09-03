

// ProviderLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProviderLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    if (res.data.user.role === 'provider') {
      localStorage.setItem('token', res.data.token);
      navigate('/create-service');
    } else {
      alert('Invalid Role');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 animate__animated animate__fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Provider Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="form-control" name="email" placeholder="Email" onChange={handleChange} required />
          <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="btn btn-warning w-full">Login as Provider</button>
        </form>
      </div>
    </div>
  );
}