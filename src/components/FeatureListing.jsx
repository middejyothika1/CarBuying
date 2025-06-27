import React, { useState, useEffect } from "react";
import "./FeatureListing.css";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import car4 from "../assets/car4.jpg";
import car5 from "../assets/car5.jpg";
import car6 from "../assets/car6.jpg";

const FeatureListing = ({ onRequestPurchase }) => {
  const [cars, setCars] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const savedCars = localStorage.getItem('cars');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    } else {
      // Initialize with sample cars
      const sampleCars = [
        { id: 1, img: car1, tag: "Featured", model: "Mini cooper 3", title: "Chevrolet suburban 2021", price: "₹ 27,000", fuel: "Petrol", mileage: "90 km", transmission: "Auto", year: "2021", description: "Excellent condition SUV with low mileage" },
        { id: 2, img: car2, tag: "Featured", model: "Mini cooper 3", title: "Chevrolet suburban 2021", price: "₹ 27,000", fuel: "Petrol", mileage: "90 km", transmission: "Auto", year: "2021", description: "Well-maintained vehicle with full service history" },
        { id: 3, img: car3, tag: "Featured", model: "Mini cooper 3", title: "Chevrolet suburban 2021", price: "₹ 27,000", fuel: "Petrol", mileage: "90 km", transmission: "Auto", year: "2021", description: "Single owner car in pristine condition" },
        { id: 4, img: car4, tag: "Featured", model: "Mini cooper 3", title: "Chevrolet suburban 2021", price: "₹ 27,000", fuel: "Petrol", mileage: "90 km", transmission: "Auto", year: "2021", description: "Family car with spacious interior" },
        { id: 5, img: car5, tag: "Featured", model: "Mini cooper 3", title: "Chevrolet suburban 2021", price: "₹ 27,000", fuel: "Petrol", mileage: "90 km", transmission: "Auto", year: "2021", description: "Perfect for daily commute" },
        { id: 6, img: car6, tag: "Featured", model: "Mini cooper 3", title: "Chevrolet suburban 2021", price: "₹ 37,000", fuel: "Petrol", mileage: "90 km", transmission: "Auto", year: "2021", description: "Luxury vehicle with premium features" }
      ];
      setCars(sampleCars);
      localStorage.setItem('cars', JSON.stringify(sampleCars));
    }
  }, []);

  const filteredCars = activeFilter === "all" 
    ? cars 
    : cars.filter(car => car.fuel === activeFilter);

  const handleRequestPurchase = (car) => {
    if (onRequestPurchase) {
      onRequestPurchase(car);
    }
  };

  return (
    <div className="feature-listing-container">
      <h2 className="feature-listing-title">
        <span style={{ borderLeft: "4px solid #d11212", paddingLeft: 8, marginRight: 8 }}></span>
        Feature listing
      </h2>
      <div className="feature-listing-filters">
        <button 
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          All
        </button>
        <button 
          className={activeFilter === "Petrol" ? "active" : ""}
          onClick={() => setActiveFilter("Petrol")}
        >
          Petrol
        </button>
        <button 
          className={activeFilter === "Diesel" ? "active" : ""}
          onClick={() => setActiveFilter("Diesel")}
        >
          Diesel
        </button>
        <button 
          className={activeFilter === "Electric" ? "active" : ""}
          onClick={() => setActiveFilter("Electric")}
        >
          Electric
        </button>
      </div>
      <div className="feature-listing-grid">
        {filteredCars.map((car, idx) => (
          <div className="feature-card" key={car.id || idx}>
            <div className="feature-card-img-wrap">
              <img src={car.img} alt={car.title} className="feature-card-img" />
              <div className="feature-card-tag">{car.tag}</div>
            </div>
            <div className="feature-card-content">
              <div className="feature-card-model">{car.model}</div>
              <div className="feature-card-title">{car.title}</div>
              <div className="feature-card-price">{car.price}</div>
              <div className="feature-card-specs">
                <div>
                  <span role="img" aria-label="fuel">⛽</span>
                  <span className="spec-label">Fuel type</span>
                  <span className="spec-value">{car.fuel}</span>
                </div>
                <div>
                  <span role="img" aria-label="mileage">🏁</span>
                  <span className="spec-label">Mileage</span>
                  <span className="spec-value">{car.mileage}</span>
                </div>
                <div>
                  <span role="img" aria-label="transmission">⚙️</span>
                  <span className="spec-label">Transmission</span>
                  <span className="spec-value">{car.transmission}</span>
                </div>
              </div>
              <div className="feature-card-footer">
                <button 
                  className="feature-card-request-btn"
                  onClick={() => handleRequestPurchase(car)}
                >
                  Request Purchase
                </button>
                <button className="feature-card-fav" aria-label="favorite">♡</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureListing; 