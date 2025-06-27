import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';
import car4 from '../assets/car4.jpg';
import car5 from '../assets/car5.jpg';
import car6 from '../assets/car6.jpg';

const UserDashboard = ({ onSignOut }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [fuelFilter, setFuelFilter] = useState('all');
  const [priceRange, setPriceRange] = useState(50000);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [requestForm, setRequestForm] = useState({
    userName: '',
    userEmail: '',
    message: ''
  });
  const [myRequests, setMyRequests] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    const savedCars = localStorage.getItem('cars');
    const savedRequests = localStorage.getItem('purchaseRequests');
    const savedMyRequests = localStorage.getItem('myRequests');
    
    if (savedCars) {
      const carsData = JSON.parse(savedCars);
      setCars(carsData);
      setFilteredCars(carsData);
    } else {
      // Initialize with sample cars
      const sampleCars = [
        { id: 1, img: car1, tag: "Featured", model: "Mini cooper 3", title: "Chevrolet suburban 2021", price: "₹ 27,000", fuel: "Petrol", mileage: "90 km", transmission: "Auto", year: "2021", description: "Excellent condition SUV with low mileage" },
        { id: 2, img: car2, tag: "Featured", model: "Tesla Model S", title: "Tesla Model S 2022", price: "₹ 80,000", fuel: "Electric", mileage: "300 km", transmission: "Auto", year: "2022", description: "Electric car with autopilot and long range." },
        { id: 3, img: car3, tag: "Featured", model: "Toyota Prius", title: "Toyota Prius 2020", price: "₹ 35,000", fuel: "Hybrid", mileage: "120 km", transmission: "Auto", year: "2020", description: "Hybrid car with great fuel efficiency." },
        { id: 4, img: car4, tag: "Featured", model: "Ford F-150", title: "Ford F-150 2019", price: "₹ 40,000", fuel: "Diesel", mileage: "150 km", transmission: "Manual", year: "2019", description: "Diesel pickup truck, powerful and reliable." },
        { id: 5, img: car5, tag: "Featured", model: "Honda Civic", title: "Honda Civic 2021", price: "₹ 30,000", fuel: "Petrol", mileage: "100 km", transmission: "Auto", year: "2021", description: "Popular sedan, comfortable and efficient." },
        { id: 6, img: car6, tag: "Featured", model: "Hyundai Kona Electric", title: "Hyundai Kona Electric 2023", price: "₹ 60,000", fuel: "Electric", mileage: "250 km", transmission: "Auto", year: "2023", description: "Modern electric SUV with fast charging." }
      ];
      setCars(sampleCars);
      setFilteredCars(sampleCars);
      localStorage.setItem('cars', JSON.stringify(sampleCars));
    }

    if (savedMyRequests) {
      setMyRequests(JSON.parse(savedMyRequests));
    }
  }, []);

  // Filter cars based on search and filters
  useEffect(() => {
    let filtered = cars;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(car => car.fuel === selectedCategory);
    }

    // Filter by fuel type
    if (fuelFilter !== 'all') {
      filtered = filtered.filter(car => car.fuel === fuelFilter);
    }

    // Filter by price range
    filtered = filtered.filter(car => {
      const price = parseInt(car.price.replace(/[^\d]/g, ''));
      return price <= priceRange;
    });

    setFilteredCars(filtered);
  }, [cars, searchTerm, selectedCategory, priceRange, fuelFilter]);

  const handleRequestPurchase = (car) => {
    setSelectedCar(car);
    setShowRequestForm(true);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now(),
      carId: selectedCar.id,
      userName: requestForm.userName,
      userEmail: requestForm.userEmail,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      message: requestForm.message
    };

    // Add to my requests
    const updatedMyRequests = [...myRequests, newRequest];
    setMyRequests(updatedMyRequests);
    localStorage.setItem('myRequests', JSON.stringify(updatedMyRequests));

    // Add to global requests
    const existingRequests = JSON.parse(localStorage.getItem('purchaseRequests') || '[]');
    const updatedRequests = [...existingRequests, newRequest];
    localStorage.setItem('purchaseRequests', JSON.stringify(updatedRequests));

    // Reset form
    setRequestForm({
      userName: '',
      userEmail: '',
      message: ''
    });
    setShowRequestForm(false);
    setSelectedCar(null);
  };

  const handleInputChange = (e) => {
    setRequestForm({
      ...requestForm,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#ffc107';
    }
  };

  return (
    <div className="user-dashboard">
      <nav className="user-navbar">
        <div className="user-logo">Car<span>space</span></div>
        <div className="user-nav-links">
          <button 
            className="active"
            onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
          >
            Search Cars
          </button>
          <button 
            onClick={() => document.getElementById('my-requests').scrollIntoView({ behavior: 'smooth' })}
          >
            My Requests
          </button>
          <button onClick={onSignOut} className="signout-btn">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="user-content">
        {/* Search Section */}
        <div id="search-section" className="search-section">
          <div className="search-header">
            <h1>Find Your Perfect Car</h1>
            <p>Browse through our extensive collection of quality-assured vehicles</p>
          </div>

          {/* Fuel Type Filter Buttons */}
          <div className="fuel-filter-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {['all', 'Petrol', 'Diesel', 'Electric', 'Hybrid'].map(type => (
              <button
                key={type}
                className={fuelFilter === type ? 'fuel-filter-btn active' : 'fuel-filter-btn'}
                onClick={() => setFuelFilter(type)}
                style={{
                  padding: '0.5rem 1.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: fuelFilter === type ? '#d11212' : '#fff',
                  color: fuelFilter === type ? '#fff' : '#333',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {type === 'all' ? 'All' : type}
              </button>
            ))}
          </div>
          {/* Car count message for selected fuel type */}
          <div style={{ marginBottom: '1.5rem', fontWeight: 500, color: '#333' }}>
            {fuelFilter === 'all' ? (
              `${filteredCars.length} cars available`
            ) : filteredCars.length > 0 ? (
              `${filteredCars.length} ${fuelFilter} car${filteredCars.length > 1 ? 's' : ''} available`
            ) : (
              `No ${fuelFilter} cars available.`
            )}
          </div>

          <div className="search-filters">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search cars by name, model, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <label>Max Price: ₹{priceRange.toLocaleString()}</label>
                <input
                  type="range"
                  min="10000"
                  max="100000"
                  step="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="price-slider"
                />
              </div>
            </div>
          </div>

          <div className="results-info">
            <p>Showing {filteredCars.length} cars</p>
          </div>

          <div className="cars-grid">
            {filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="car-image">
                  <img src={car.img} alt={car.title} />
                  <div className="car-tag">{car.tag}</div>
                </div>
                <div className="car-details">
                  <h3>{car.title}</h3>
                  <p className="car-model">{car.model}</p>
                  <p className="car-price">{car.price}</p>
                  <div className="car-specs">
                    <span>⛽ {car.fuel}</span>
                    <span>🏁 {car.mileage}</span>
                    <span>⚙️ {car.transmission}</span>
                  </div>
                  <p className="car-year">Year: {car.year}</p>
                  <p className="car-description">{car.description}</p>
                  <button 
                    className="request-btn"
                    onClick={() => handleRequestPurchase(car)}
                  >
                    Request Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="no-results">
              <h3>No cars found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {/* My Requests Section */}
        <div id="my-requests" className="my-requests-section">
          <h2>My Purchase Requests</h2>
          <div className="requests-list">
            {myRequests.length === 0 ? (
              <div className="no-requests">
                <p>You haven't made any purchase requests yet.</p>
              </div>
            ) : (
              myRequests.map((request) => {
                const car = cars.find(c => c.id === request.carId);
                return (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>Request #{request.id}</h3>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(request.status) + '20', color: getStatusColor(request.status) }}
                      >
                        {request.status}
                      </span>
                    </div>
                    <div className="request-details">
                      <div className="request-car">
                        <img src={car?.img} alt={car?.title} />
                        <div>
                          <h4>{car?.title}</h4>
                          <p>{car?.price}</p>
                        </div>
                      </div>
                      <div className="request-info">
                        <p><strong>Date:</strong> {request.date}</p>
                        <p><strong>Message:</strong> {request.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <h3>Request Purchase</h3>
            <div className="selected-car">
              <img src={selectedCar?.img} alt={selectedCar?.title} />
              <div>
                <h4>{selectedCar?.title}</h4>
                <p>{selectedCar?.price}</p>
              </div>
            </div>
            <form onSubmit={handleRequestSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="userName"
                  value={requestForm.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="userEmail"
                  value={requestForm.userEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Message (Optional)</label>
                <textarea
                  name="message"
                  value={requestForm.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your interest in this car..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit Request
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowRequestForm(false);
                    setSelectedCar(null);
                    setRequestForm({
                      userName: '',
                      userEmail: '',
                      message: ''
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard; 