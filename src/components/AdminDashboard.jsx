import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';
import car4 from '../assets/car4.jpg';
import car5 from '../assets/car5.jpg';
import car6 from '../assets/car6.jpg';

const AdminDashboard = ({ onSignOut }) => {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [requests, setRequests] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    model: '',
    price: '',
    fuel: 'Petrol',
    mileage: '',
    transmission: 'Auto',
    year: '',
    description: '',
    image: car1
  });

  // Initialize with sample data
  useEffect(() => {
    const savedCars = localStorage.getItem('cars');
    const savedRequests = localStorage.getItem('purchaseRequests');
    
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

    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      // Initialize with sample requests
      const sampleRequests = [
        { id: 1, carId: 1, userName: "John Doe", userEmail: "john@example.com", status: "pending", date: "2024-01-15", message: "Interested in this car. Can I get more details?" },
        { id: 2, carId: 3, userName: "Jane Smith", userEmail: "jane@example.com", status: "approved", date: "2024-01-14", message: "Would like to schedule a test drive." },
        { id: 3, carId: 2, userName: "Mike Johnson", userEmail: "mike@example.com", status: "rejected", date: "2024-01-13", message: "Is financing available for this vehicle?" }
      ];
      setRequests(sampleRequests);
      localStorage.setItem('purchaseRequests', JSON.stringify(sampleRequests));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCar) {
      // Update existing car
      const updatedCars = cars.map(car => 
        car.id === editingCar.id ? { ...formData, id: editingCar.id, img: formData.image } : car
      );
      setCars(updatedCars);
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      setEditingCar(null);
    } else {
      // Add new car
      const newCar = {
        ...formData,
        id: Date.now(),
        tag: "Featured"
      };
      const updatedCars = [...cars, newCar];
      setCars(updatedCars);
      localStorage.setItem('cars', JSON.stringify(updatedCars));
    }
    
    setFormData({
      title: '',
      model: '',
      price: '',
      fuel: 'Petrol',
      mileage: '',
      transmission: 'Auto',
      year: '',
      description: '',
      image: car1
    });
    setShowAddForm(false);
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      title: car.title,
      model: car.model,
      price: car.price,
      fuel: car.fuel,
      mileage: car.mileage,
      transmission: car.transmission,
      year: car.year,
      description: car.description,
      image: car.img
    });
    setShowAddForm(true);
  };

  const handleDelete = (carId) => {
    const updatedCars = cars.filter(car => car.id !== carId);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  };

  const handleRequestAction = (requestId, action) => {
    const updatedRequests = requests.map(request => 
      request.id === requestId ? { ...request, status: action } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('purchaseRequests', JSON.stringify(updatedRequests));
  };

  const getCarById = (carId) => {
    return cars.find(car => car.id === carId);
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <div className="admin-logo">Car<span>space</span> Admin</div>
        <div className="admin-nav-links">
          <button 
            className={activeTab === 'cars' ? 'active' : ''} 
            onClick={() => setActiveTab('cars')}
          >
            Car Management
          </button>
          <button 
            className={activeTab === 'requests' ? 'active' : ''} 
            onClick={() => setActiveTab('requests')}
          >
            Purchase Requests
          </button>
          <button onClick={onSignOut} className="signout-btn">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="admin-content">
        {activeTab === 'cars' && (
          <div className="cars-section">
            <div className="section-header">
              <h2>Car Management</h2>
              <button 
                className="add-car-btn"
                onClick={() => {
                  setShowAddForm(true);
                  setEditingCar(null);
                  setFormData({
                    title: '',
                    model: '',
                    price: '',
                    fuel: 'Petrol',
                    mileage: '',
                    transmission: 'Auto',
                    year: '',
                    description: '',
                    image: car1
                  });
                }}
              >
                Add New Car
              </button>
            </div>

            {showAddForm && (
              <div className="form-overlay">
                <div className="form-modal">
                  <h3>{editingCar ? 'Edit Car' : 'Add New Car'}</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Model</label>
                        <input
                          type="text"
                          name="model"
                          value={formData.model}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Price (₹)</label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Year</label>
                        <input
                          type="number"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Fuel Type</label>
                        <select name="fuel" value={formData.fuel} onChange={handleInputChange}>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Transmission</label>
                        <select name="transmission" value={formData.transmission} onChange={handleInputChange}>
                          <option value="Auto">Auto</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Mileage</label>
                      <input
                        type="text"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="submit-btn">
                        {editingCar ? 'Update Car' : 'Add Car'}
                      </button>
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => {
                          setShowAddForm(false);
                          setEditingCar(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="cars-grid">
              {cars.map((car) => (
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
                    <div className="car-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(car)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(car.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-section">
            <h2>Purchase Requests</h2>
            <div className="requests-list">
              {requests.map((request) => {
                const car = getCarById(request.carId);
                return (
                  <div key={request.id} className={`request-card ${request.status}`}>
                    <div className="request-header">
                      <h3>Request #{request.id}</h3>
                      <span className={`status-badge ${request.status}`}>
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
                      <div className="request-user">
                        <h4>User Details</h4>
                        <p><strong>Name:</strong> {request.userName}</p>
                        <p><strong>Email:</strong> {request.userEmail}</p>
                        <p><strong>Date:</strong> {request.date}</p>
                        <p><strong>Message:</strong> {request.message}</p>
                      </div>
                    </div>
                    {request.status === 'pending' && (
                      <div className="request-actions">
                        <button 
                          className="approve-btn"
                          onClick={() => handleRequestAction(request.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button 
                          className="reject-btn"
                          onClick={() => handleRequestAction(request.id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 