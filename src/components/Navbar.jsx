import React from 'react';

const Navbar = ({ onHomeClick }) => (
  <nav style={{
    width: '100%',
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 100
  }}>
    <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#2196f3', cursor: 'pointer' }} onClick={onHomeClick}>
      Car<span style={{ color: '#d11212' }}>space</span>
    </div>
    <div>
      <button onClick={onHomeClick} style={{ marginRight: 16, fontWeight: 600, background: 'none', border: 'none', color: '#222', cursor: 'pointer' }}>Home</button>
      {/* Add more nav links here if needed */}
    </div>

  </nav>
)
export default Navbar;