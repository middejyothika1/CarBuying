import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="footer-top">
        <div className="footer-left">
          <h2 className="footer-title">Do you have Something to Sell through Us?</h2>
          <div className="footer-links">
            <div>
              <div className="footer-link-title">Useful links</div>
              <a href="#">About Us</a>
              <a href="#">Features</a>
              <a href="#">Cars</a>
              <a href="#">Testimonials</a>
              <a href="#">FAQ's</a>
            </div>
            <div>
              <div className="footer-link-title">Explore</div>
              <a href="#">Blogs</a>
              <a href="#">Press mentions</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <button className="footer-sell-btn">Sell your car today</button>
          <div className="footer-contact-card">
            <div>
              <span className="footer-icon">📍</span>
              7th b main BTM 1st stage Bangalore<br />Karnataka 560029
            </div>
            <div>
              <span className="footer-icon">✉️</span>
              hello@email.com
            </div>
            <div>
              <span className="footer-icon">📞</span>
              +91 8310955920
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Terms & Conditions</span>
        <span>Privacy Policy</span>
        <div className="footer-socials">
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
}
