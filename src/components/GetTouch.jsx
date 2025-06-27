import React from "react";
import "./GetTouch.css";
import getImg from "../assets/getImg.jpg"; // Update path as needed

export default function GetTouch() {
  return (
    <div className="gettouch-container">
      <div className="gettouch-content">
        <h2 className="gettouch-title">
          <span className="gettouch-bar"></span>
          Get in Touch
        </h2>
        <form className="gettouch-form">
          <input type="text" placeholder="Name" className="gettouch-input" />
          <input type="tel" placeholder="Phone Number" className="gettouch-input" />
          <textarea placeholder="Type your message..." className="gettouch-textarea"></textarea>
          <button type="submit" className="gettouch-btn">Send Message</button>
        </form>
      </div>
      <div className="gettouch-img-wrap">
        <img src={getImg} alt="Get in touch" className="gettouch-img" />
      </div>
    </div>
  );
}
