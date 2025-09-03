


// Services.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container py-10 animate__animated animate__fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">Available Services</h2>
      <div className="row">
        {services.map(service => (
          <div key={service._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <p className="text-muted">₹{service.price}</p>
                <p><span className="badge bg-secondary">{service.category}</span></p>
                <Link to={`/book/${service._id}`} state={service} className="btn btn-sm btn-success mt-2">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}