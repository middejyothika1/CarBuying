import React, { useState } from 'react';
import './Register.css';
import image from "../assets/image.png";
import { supabase, handleGoogleAuth } from '../supabaseClient';

const countries = [
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
];

const Register = ({ onOtpVerified }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [formType, setFormType] = useState('signup'); // 'signup' or 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [step, setStep] = useState('register');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const fullPhoneNumber = `${countryCode}${cleanPhone}`;
    try {
      console.log('Sending OTP to:', fullPhoneNumber);
      const { error } = await supabase.auth.signInWithOtp({ phone: fullPhoneNumber });
      if (error) throw error;
      setStep('otp');
    } catch (error) {
      setErrorMsg(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

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

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const code = otp.join('');
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/[^0-9]/g, '')}`;
    
    console.log('Verifying OTP:', { code, fullPhoneNumber });
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: fullPhoneNumber,
        token: code,
        type: 'sms',
      });
      
      if (error) throw error;
      
      console.log('OTP verification successful:', data);
      
      // Check if we have a session after verification
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session after OTP verification:', session);
      
      if (session) {
        console.log('Session found, calling onOtpVerified');
        onOtpVerified();
      } else {
        console.log('No session found after OTP verification');
        setErrorMsg('Authentication failed - no session created');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrorMsg(error.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    
    try {
      const role = localStorage.getItem('userRole');
      if (!role) {
        throw new Error('Please select a role first');
      }
      
      const { error } = await handleGoogleAuth(role, () => {
        // This callback will be called after successful authentication
        onOtpVerified();
      });
      
      if (error) {
        setErrorMsg(error.message || 'Google authentication failed');
      }
    } catch (error) {
      setErrorMsg(error.message || 'Google authentication failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card-split">
        <div className="register-img-side">
          <img src={image} alt="Car" className="register-car-img" />
        </div>
        <div className="register-box">
          {/* Logo, close button, etc. */}
          <div className="logo">
            <span className="logo-text">
              <span className="car">Car</span><span className="space">space</span>
            </span>
          </div>
          {/* Login/Signup Toggle */}
          <div className="auth-toggle">
            <button
              className={`login-btn${formType === 'login' ? ' active' : ''}`}
              onClick={() => setFormType('login')}
              type="button"
            >
              Login
            </button>
            <button
              className={`signup-btn${formType === 'signup' ? ' active' : ''}`}
              onClick={() => setFormType('signup')}
              type="button"
            >
              Sign up
            </button>
          </div>
          <div className="form-fields-wrapper" style={{ marginTop: '0.2rem' }}>
            {step === 'register' ? (
              <form onSubmit={handleSubmit} className={formType === 'login' ? 'login-form' : ''}>
                {formType === 'signup' && (
                  <>
                    <div className="form-group">
                      <label>Enter your Name</label>
                      <div className="input-field-merged">
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Name"
                          className="input-inner"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Enter your Email ID</label>
                      <div className="input-field-merged">
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Email ID"
                          className="input-inner"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="form-group">
                  <label>Enter your Mobile Number</label>
                  <div className="phone-field-merged">
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="+918125208291"
                      className="phone-number-merged"
                      maxLength={15}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="continue-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Continue'}
                </button>
                {errorMsg && <div className="otp-error-msg">{errorMsg}</div>}
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} style={{ marginTop: '0.5rem' }}>
                <h2 style={{ marginTop: '-3rem', marginBottom: '1rem', fontWeight: 700 }}>Verify your<br />Mobile</h2>
                <p className="otp-subtitle" style={{ marginBottom: '1rem' }}>
                  We have sent a 6 Digit OTP on {phoneNumber}
                </p>
                <div className="otp-inputs" style={{ marginBottom: '1rem', justifyContent: 'center' }}>
                  {[0,1,2,3,4,5].map(i => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      maxLength="1"
                      value={otp[i]}
                      onChange={e => handleOtpChange(e, i)}
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
                <div className="otp-timer-resend" style={{ marginBottom: '1rem', color: '#888', textAlign: 'center' }}>
                  <span className="timer" style={{ marginRight: '1.5rem' }}>00 : 20</span>
                  <button
                    type="button"
                    className="resend-btn"
                    style={{ color: '#888', background: 'none', border: 'none', fontWeight: 500 }}
                  >
                    Didn't receive OTP?
                  </button>
                </div>
                <button type="submit" className="login-btn-otp" style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#d11212',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}>
                  Login
                </button>
                
                {errorMsg && <div className="otp-error-msg">{errorMsg}</div>}

              </form>
            )}

            {/* Place the Google Auth button here, after the form */}
            <button
              type="button"
              className="google-auth-btn"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
            >
              {googleLoading ? (
                'Signing in...'
              ) : (
                <>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    alt="Google"
                    style={{ width: 22, height: 22, marginRight: 8, verticalAlign: 'middle' }}
                  />
                  Continue with Google
                </>
              )}
            </button>
            {errorMsg && <div className="otp-error-msg" style={{ marginTop: '0.5rem' }}>{errorMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;