import React, { useState, useEffect } from 'react';
import './Otp.css';
import carImage from '../assets/car-image.jpg'; 
import { supabase } from '../supabaseClient';

const Otp = ({ onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(20);
  const phoneNumber = '+91 0000000000'; 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    
    if (value && idx < 5) {
      document.getElementById(`otp-input-${idx + 1}`).focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !e.target.value && idx > 0) {
      document.getElementById(`otp-input-${idx - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP Submitted:', otpValue);
    
    try {
      // Verify OTP with Supabase
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber, // Make sure this matches the phone number used to send OTP
        token: otpValue,
        type: 'sms'
      });
  
      if (error) throw error;
      
      // If verification is successful, call onOtpVerified
      onOtpVerified();
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      // You might want to show an error message to the user here
    }
  };
  const handleResendOtp = () => {
    setTimeLeft(20);
    console.log('Resending OTP...');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="otp-container">
      <div className="otp-modal">
        <div className="otp-image-section"></div>
        
        <div className="otp-form-section">
          <div className="logo">
            <span className="logo-car">Car</span>
            <span className="logo-space">space</span>
          </div>
          
          <button className="close-button" onClick={onClose} />
          
          <div className="otp-form-content">
            <h2>Verify your Mobile</h2>
            <p className="otp-instruction">We have sent A 5 Digit OTP on {phoneNumber}</p>
            
            <form className="otp-form" onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                
              <div className="otp-inputs" style={{ marginBottom: '-5rem', justifyContent: 'center' }}>
              <h2>hi</h2>
                {[0,1,2,3,4,5].map(i => (
                  <input
                    key={i}
                    id={`otp-input-${i}`}
                    type="text"
                    maxLength="1"
                    value={otp[i]}
                    onChange={e => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    style={{
                      width: '60px',
                      height: '60px',
                      fontSize: '2rem',
                      textAlign: 'center',
                      borderRadius: '12px',
                      border: '1px solid #ddd',
                      background: '#f7f7f7',
                      marginRight: i < 5 ? '12px' : 0
                    }}
                  />
                ))}
              </div>
              
              <div className="otp-timer-resend" style={{ marginBottom: '1.5rem', color: '#888', textAlign: 'center' }}>
                <span className="timer" style={{ marginRight: '1.5rem' }}>
                  {timeLeft > 0 ? formatTime(timeLeft) : '00 : 00'}
                </span>
                <button
                  type="button"
                  className="resend-btn"
                  style={{ color: '#888', background: 'none', border: 'none', fontWeight: 500 }}
                  onClick={handleResendOtp}
                >
                  Didn't receive OTP?
                </button>
              </div>
              
              <button
                type="submit"
                className="login-btn-otp"
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#d11212',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;