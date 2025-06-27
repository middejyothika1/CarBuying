import React, { useState } from "react";
import './Home.css';
import carparking from '../assets/carparking.jpg';
import Profile from '../assets/Profile.png'; 
import car1 from '../assets/car1.jpg'; 
import car2 from '../assets/car2.jpg'; 
import car3 from '../assets/car3.jpg'; 
import car4 from '../assets/car4.jpg'; 
import car5 from '../assets/car5.jpg'; 
import car6 from '../assets/car6.jpg'; 
import FeatureListing from "./FeatureListing";
import Loadcar1 from "../assets/Loadcar1.jpg";
import Loadcar2 from "../assets/Loadcar2.jpg";
import GetTouch from "./GetTouch";
import CarspaceClarity from "./CarspaceClarity";
import CommunityStories from "./CommunityStories";
import Footer from "./Footer";
import { signOut } from '../supabaseClient';




const Home = () => {
  const [tab, setTab] = useState("new");
  const [price, setPrice] = useState(1000);

  const handleSignOut = async () => {
    try {
      await signOut();
      // The auth state change will be handled by the App component
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <div className="home-hero-bg" style={{ backgroundImage: `url(${carparking})` }}>
      <nav className="home-navbar">
        <div className="home-logo">Car<span>space</span></div>
        <div className="home-nav-links">
          <a href="#">Home</a>
          <a href="#">About us</a>
          <a href="#">Certified Pre-Owned</a>
          <button className="compare-btn">Compare cars</button>
          <img src={Profile} alt="Profile" className="profile-img" />
          <button 
            onClick={handleSignOut}
            style={{
              background: '#d11212',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="home-overlay">
        <div className="home-content">
          <div className="home-left">
            <h1 className="home-heading">
              Find Quality-Assured<br />
              Cars Tailored to Your<br />
              Budget and<br />
              Preferences
            </h1>
            <div className="home-subtitle">
              Browse a Wide Range of Certified Used Cars from Trusted Dealers and Private Sellers
            </div>
            <button className="home-book-btn">Book My Car</button>
            <div className="home-rating">
              <span className="stars">★★★★★</span>
              <span className="rating-text">Working with 50+ Happy members</span>
            </div>
          </div>
          <div className="home-right">
            <div className="filter-card">
              <div className="filter-tabs">
                <button
                  className={tab === "new" ? "active" : ""}
                  onClick={() => setTab("new")}
                >
                  New cars
                </button>
                <button
                  className={tab === "used" ? "active" : ""}
                  onClick={() => setTab("used")}
                >
                  Used cars
                </button>
              </div>
              <div className="filter-fields">
                <label>Make</label>
                <input type="text" className="plain-input" />
                <label>Models</label>
                <input type="text" className="plain-input" />
                <div className="slider-row">
                  <input
                    type="range"
                    min={1000}
                    max={5000}
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="slider"
                  />
                </div>
                <label>Body</label>
                <input type="text" className="plain-input" />
              </div>
              <button className="filter-btn">2334 Cars</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Explore Our Cars Section
function ExploreCars() {
  return (
    <div className="explore-container">
      <div className="explore-header">
        <h2 className="explore-title">Explore Our Cars</h2>
        <a href="#" className="explore-viewmore">View more</a>
      </div>
      <div className="explore-cards-row">
        <div className="explore-card"><img src={car1} alt="SUV" /><div className="explore-label">SUVs</div></div>
        <div className="explore-card"><img src={car2} alt="Campers" /><div className="explore-label">Campers</div></div>
        <div className="explore-card"><img src={car3} alt="Cabriolet" /><div className="explore-label">Cabriolet</div></div>
        <div className="explore-card"><img src={car4} alt="Pickup" /><div className="explore-label">Pickup</div></div>
        <div className="explore-card"><img src={car5} alt="Supercar" /><div className="explore-label">Supercar</div></div>
        <div className="explore-card"><img src={car6} alt="Minivans" /><div className="explore-label">Minivans</div></div>
      </div>
    </div>
  );
}

export default function MainHome() {
  return (
    <>
      <Home />
      <ExploreCars />
      <FeatureListing />
      <div className="double-row-section">
        <div className="double-row">
          <div className="double-card">
            <div>
              <div className="double-card-subtitle">CAR INVENTORY</div>
              <div className="double-card-title">Search Over 18000+<br />Used Vehicles</div>
              <a href="#" className="double-card-link">View inventory</a>
            </div>
            <img src={Loadcar1} alt="Used Vehicles" className="double-card-img" />
          </div>
          <div className="double-card">
            <div>
              <div className="double-card-subtitle">CAR INVENTORY</div>
              <div className="double-card-title">Looking to sell your<br />Used brand car?</div>
              <a href="#" className="double-card-link">View inventory</a>
            </div>
            <img src={Loadcar2} alt="Sell Car" className="double-card-img" />
          </div>
        </div>
        <div className="double-row">
          <div className="double-card community-card">
            <div>
              <div className="double-card-title" style={{fontSize: "1.2rem"}}>
                <span style={{ borderLeft: "4px solid #d11212", paddingLeft: 8, marginRight: 8 }}></span>
                Hear From Our Community
              </div>
              <div className="double-card-desc">
                Real stories from our happy customers. See what they have to say!
              </div>
              <div className="community-arrows">
                <button className="arrow-btn">◀</button>
                <button className="arrow-btn">▶</button>
              </div>
            </div>
          </div>
          <div className="double-card testimonial-card">
            <div className="testimonial-quote">
              <span className="quote-mark">“</span>
              Highly recommend Jodi J. Appley. She was attentive to our needs and worked tirelessly to find us the perfect home. We couldn't be happier with our new place!
            </div>
            <div className="testimonial-footer">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="testimonial-avatar" />
              <span className="testimonial-name">Arjun S. Patil</span>
              <span className="testimonial-stars">★★★★★</span>
            </div>
          </div>
        </div>
      </div>
      <GetTouch />
      <CarspaceClarity />
      <CommunityStories />
      <Footer />
    </>
  );
} 