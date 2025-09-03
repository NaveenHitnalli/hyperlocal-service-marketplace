

// Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-pink-300 to-purple-400 animate__animated animate__fadeIn">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login As</h2>
        <div className="space-y-4">
          <button onClick={() => navigate('/login/user')} className="btn btn-outline-success btn-lg w-full">User</button>
          <button onClick={() => navigate('/login/provider')} className="btn btn-outline-warning btn-lg w-full">Provider</button>
        </div>
      </div>
    </div>
  );
}

