import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {

  async function getdata() {
    const data = await axios.get("http://localhost:8080/users")
    console.log(data)

  }

  useEffect(() => {
    getdata()
  }, [])


  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-section d-flex align-items-center justify-content-center"
        style={{
          backgroundImage:
            "url('/public/images/hunger.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          color: '#fff',
          width: '99vw',
          objectFit: 'contain',
        }}
      >
        <div
          className="text-center p-5"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '12px',
            maxWidth: '800px',
          }}
        >
          <h1 className="display-3 fw-bold mb-4">Join the Hunger's Need</h1>
          <p className="lead mb-4">
            Together, we can make a difference in the fight against hunger. Take action today—whether as an admin, donor, or NGO.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/register" className="btn btn-outline-light btn-lg">Get Started</Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center text-info mb-5">What We Offer</h2>
        <div className="row">
          {[
            {
              title: "Admin Dashboard",
              desc: "If you can't feed a hundred people, then feed just one. ",
              img: "https://img.freepik.com/free-vector/admin-concept-illustration_114360-5032.jpg?w=740",
            },
            {
              title: "User Panel",
              desc: "Hunger is not an issue of charity. It is an issue of justice. ",
              img: "https://img.freepik.com/free-vector/donation-concept-illustration_114360-1806.jpg?t=st=1713548785~exp=1713552385~hmac=b0544a28dc3bd219cdb79cce92e4f457bfbf117155b3b7c3a5ad8395a7b6b0e5&w=740",
            },
            {
              title: "NGO Panel",
              desc: "Request donations, collaborate with others, and report on your mission’s success.",
              img: "https://media.istockphoto.com/id/1144580882/photo/food-for-the-poor-society-of-sharing-sharing-each-other-in-society.jpg?s=1024x1024&w=is&k=20&c=7oE80BMu7VTIGicvH2whzujX9x4-BNbzTOZeWKqKB_g=",
            },
          ].map((feature, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-lg border-0">
                <img src={feature.img} className="card-img-top" alt={feature.title} style={{ height: '220px', objectFit: 'cover' }} />
                <div className="card-body">
                  {/* <h5 className="card-title">{feature.title}</h5> */}
                  <p className="card-text">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center text-info mb-5">What People Say</h2>
          <div className="row">
            {[
              {
                quote: "This platform has made it easier to deliver food to families in need. It's a great tool for making a real difference!",
                author: "John Doer",
              },
              {
                quote: "I donated in just a few clicks, and it felt amazing to know my contribution is directly fighting hunger.",
                author: "Jane Smith",
              },
              {
                quote: "Managing donations and tracking progress in real-time has been incredible. It's rewarding to see the impact!",
                author: "Alice Brown",
              },
            ].map((t, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <div className="card h-100 shadow-sm border-0 p-4">
                  <blockquote className="blockquote mb-0">
                    <p>❝ {t.quote} ❞</p>
                    <footer className="blockquote-footer mt-2">{t.author}</footer>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p className="mb-1">&copy; 2025 Hunger Project. All rights reserved.</p>
          <p className="mb-0">
            <a href="https://facebook.com" className="text-white text-decoration-none mx-2">Facebook</a> |
            <a href="https://twitter.com" className="text-white text-decoration-none mx-2">Twitter</a> |
            <a href="https://linkedin.com" className="text-white text-decoration-none mx-2">LinkedIn</a>
          </p>
        </div>
      </footer>
    </div >
  );
};

export default HomePage;
