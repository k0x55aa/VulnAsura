// app/page.tsx
'use client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginContainer from '../components/LoginContainer'; // Your login component
import Profile from '../components/Profile';  // The Profile component
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import "../styles/login.css"
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header /> {/* Add the header */}
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LoginContainer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      
      <Footer /> {/* Add the footer */}
    </BrowserRouter>
  );
};

export default App;
