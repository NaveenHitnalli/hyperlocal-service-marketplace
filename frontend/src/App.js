

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserLogin from './pages/UserLogin';
import ProviderLogin from './pages/ProviderLogin';
import Services from './pages/Services';
import BookService from './pages/BookService';

import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import CreateService from './pages/CreateService';
import AdminDashboard from './pages/AdminDashboard';   // ✅ correct import

function App() {
  return (
    <Router>
      <div className="bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen p-4 animate__animated animate__fadeIn">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/login/provider" element={<ProviderLogin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book/:id" element={<BookService />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/dashboard/provider" element={<ProviderDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/create-service" element={<CreateService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
