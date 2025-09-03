
// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-300 to-purple-300 text-white animate__animated animate__fadeIn">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg">Welcome to Hyperlocal Services</h1>
      <div className="space-x-4">
        <button onClick={() => navigate('/register')} className="btn btn-lg btn-success shadow-lg">Register</button>
        <button onClick={() => navigate('/login')} className="btn btn-lg btn-outline-light shadow-lg">Login</button>
      </div>
    </div>
  );
}