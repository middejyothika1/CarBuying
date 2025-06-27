import React from "react";
import "./CommunityStories.css";
import carspace1 from "../assets/carspace1.jpg"; // Replace with your actual images
import carspace2 from "../assets/carspace2.jpg";
import carspace5 from "../assets/carspace5.jpg";


const stories = [
  {
    img: carspace1,
    title: "Great Experience!",
    desc: "I found my dream car and the process was smooth and transparent. Highly recommend Carspace!",
    name: "Amit Sharma"
  },
  {
    img: carspace2,
    title: "Superb Support",
    desc: "The team helped me sell my car quickly and at a great price. Thank you Carspace!",
    name: "Priya Verma"
  },
  {
    img: carspace5,
    title: "Trustworthy Platform",
    desc: "I was worried about buying a used car, but Carspace made it easy and safe.",
    name: "Rahul Singh"
  }
];

export default function CommunityStories() {
  return (
    <div className="community-stories-section">
      <h2 className="community-stories-title">
        <span className="community-bar"></span>
        Hear From Our Community
      </h2>
      <div className="community-stories-row">
        {stories.map((story, idx) => (
          <div className="community-story-card" key={idx}>
            <img src={story.img} alt={story.name} className="community-story-img-rect" />
            <div className="community-story-content">
              <div className="community-story-title">{story.title}</div>
              <div className="community-story-desc">{story.desc}</div>
              <div className="community-story-name">— {story.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
