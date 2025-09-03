import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold text-indigo-600" to="/">
            🛠️ HyperLocal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">Services</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-cover bg-center h-[80vh] flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?services,technology')" }}>
        <div className="text-center bg-black/60 p-8 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Find Trusted Services Near You
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Book professionals instantly for any local need — from electricians to beauticians.
          </p>
          <Link to="/services" className="btn btn-primary btn-lg shadow">
            Explore Services
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-10 text-indigo-700">Why Choose Us?</h2>
          <div className="row g-4">
            {[
              ["Verified Providers", "bi-person-check-fill"],
              ["Secure Payments", "bi-shield-lock-fill"],
              ["Instant Bookings", "bi-clock-fill"],
              ["24/7 Support", "bi-headset"]
            ].map(([title, icon], i) => (
              <div className="col-sm-6 col-lg-3" key={i}>
                <div className="bg-white rounded-xl shadow p-4 h-100 transition hover:scale-105">
                  <i className={`bi ${icon} fs-2 text-indigo-500 mb-3`} />
                  <h5 className="fw-semibold">{title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="bg-white py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold mb-10 text-emerald-600">What Our Users Say</h2>
          <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner text-center">
              {[
                ["Amazing experience! Got a plumber in 30 minutes.", "— Neha M."],
                ["Great service and professional support team.", "— Rajeev K."],
                ["Simple, clean, and fast. Love the booking flow.", "— Aisha S."]
              ].map(([quote, user], idx) => (
                <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                  <blockquote className="blockquote">
                    <p className="fs-5">{quote}</p>
                    <footer className="blockquote-footer">{user}</footer>
                  </blockquote>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" />
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-slate-100 py-16">
        <div className="container max-w-2xl">
          <h2 className="text-center text-3xl font-bold mb-8 text-indigo-700">Get In Touch</h2>
          <form className="space-y-4">
            <div className="form-floating">
              <input type="text" className="form-control" id="nameInput" placeholder="Your Name" />
              <label htmlFor="nameInput">Your Name</label>
            </div>
            <div className="form-floating">
              <input type="email" className="form-control" id="emailInput" placeholder="Email address" />
              <label htmlFor="emailInput">Email address</label>
            </div>
            <div className="form-floating">
              <textarea className="form-control" id="messageInput" placeholder="Message" style={{ height: "100px" }} />
              <label htmlFor="messageInput">Message</label>
            </div>
            <button type="submit" className="btn btn-success w-100">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6 mt-10">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} HyperLocal — All rights reserved.</p>
          <div className="d-flex gap-3">
            {["facebook", "twitter", "instagram", "linkedin"].map((platform, idx) => (
              <a
                key={idx}
                href="#"
                className="text-white text-decoration-none fs-5"
              >
                <i className={`bi bi-${platform}`}></i>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
