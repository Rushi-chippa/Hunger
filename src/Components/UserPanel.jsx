import React from 'react';
import { Link } from 'react-router-dom';

const UserPanel = () => {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 text-success fw-bold">Welcome to the Donor Panel</h1>
          <p className="lead text-muted">
            Thank you for joining the fight against hunger. Here you can make donations,
            view your impact, and stay updated with the latest initiatives.
          </p>
        </div>

        {/* Action Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body text-center">
                <i className="bi bi-currency-dollar text-primary" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title mt-3">Make a Donation</h5>
                <p className="card-text">Contribute directly to feeding programs and make a real impact with your support.</p>
                <Link to="/donate" className="btn btn-outline-primary">Donate Now</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body text-center">
                <i className="bi bi-bar-chart-line text-success" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title mt-3">Your Impact</h5>
                <p className="card-text">Track your donations, view statistics, and see how you're making a difference.</p>
                <Link to="/impact" className="btn btn-outline-success">View Stats</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100">
              <div className="card-body text-center">
                <i className="bi bi-newspaper text-info" style={{ fontSize: '3rem' }}></i>
                <h5 className="card-title mt-3">Latest Updates</h5>
                <p className="card-text">Read the latest news from NGOs, see recent success stories, and find events near you.</p>
                <Link to="/updates" className="btn btn-outline-info">Read More</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Section */}
        <div className="text-center mt-5">
          <h2 className="text-warning fw-bold">“Even the smallest act of caring has the potential to turn a life around.”</h2>
          <p className="text-muted mt-2">Together, we can create a hunger-free future.</p>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
