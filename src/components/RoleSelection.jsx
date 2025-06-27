import React, { useState } from 'react';
import './RoleSelection.css';
import carparking from '../assets/carparking.jpg';

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Store role in localStorage
    localStorage.setItem('userRole', role);
    onRoleSelect(role);
    
    // If user is already logged in, redirect to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        onRoleSelect(role);
      }
    });
  };

  return (
    <div className="role-selection" style={{ backgroundImage: `url(${carparking})` }}>
      <div className="role-overlay">
        <div className="role-content">
          <div className="role-header">
            <h1>Welcome to Car<span>space</span></h1>
            <p>Please select your role to continue</p>
          </div>
          
          <div className="role-cards">
            <div 
              className={`role-card ${selectedRole === 'user' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('user')}
            >
              <div className="role-icon">👤</div>
              <h3>User</h3>
              <p>Browse cars, search listings, and request purchases</p>
              <ul>
                <li>Search and filter cars</li>
                <li>View detailed car information</li>
                <li>Request to purchase cars</li>
                <li>Track your purchase requests</li>
              </ul>
            </div>
            
            <div 
              className={`role-card ${selectedRole === 'admin' ? 'selected' : ''}`}
              onClick={() => handleRoleSelect('admin')}
            >
              <div className="role-icon">⚙️</div>
              <h3>Admin</h3>
              <p>Manage cars, listings, and purchase requests</p>
              <ul>
                <li>Add and edit car listings</li>
                <li>Update car details and pricing</li>
                <li>Manage purchase requests</li>
                <li>View all car inventory</li>
              </ul>
            </div>
          </div>
          
          <div className="role-note">
            <p>💡 <strong>Note:</strong> You can change your role later by signing out and signing back in.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; 