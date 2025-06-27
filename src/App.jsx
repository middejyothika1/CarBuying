import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import RoleSelection from './components/RoleSelection';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Home from './components/Home';
import { supabase } from './supabaseClient';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [roleSelected, setRoleSelected] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setRoleSelected(true);
    localStorage.setItem('userRole', role);
    supabase.auth.signOut();
  };

  const handleOtpVerified = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setRoleSelected(false);
    localStorage.removeItem('userRole');
    supabase.auth.signOut();
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const savedRole = localStorage.getItem('userRole');
      
      if (session) {
        if (!savedRole) {
          const { data: { user } } = await supabase.auth.getUser();
          const role = user?.user_metadata?.role;
          if (role) {
            setUserRole(role);
            setRoleSelected(true);
            localStorage.setItem('userRole', role);
          }
        } else {
          setUserRole(savedRole);
          setRoleSelected(true);
        }
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };
  
    checkAuth();
  }, []);

  if (loading) {
    return <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>Loading...</div>;
  }

  return (
    <div className="hero-bg-wrapper">
      <Routes>
        <Route path="/" element={
          !roleSelected ? (
            <RoleSelection onRoleSelect={handleRoleSelect} />
          ) : !isLoggedIn ? (
            <Register onOtpVerified={handleOtpVerified} />
          ) : userRole === 'admin' ? (
            <AdminDashboard onSignOut={handleSignOut} />
          ) : (
            <UserDashboard onSignOut={handleSignOut} />
          )
        } />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
