import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [showHelperNotice, setShowHelperNotice] = useState(true);

  // Trigger search focus on home page using global events since search input is in Home page
  const handleSearchClick = () => {
    // Dispatch a custom event to focus search input if we are on home page
    const event = new CustomEvent('focus-search-input');
    window.dispatchEvent(event);
  };

  const handleAddToCart = (item) => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="app-container">
        <Header onSearchClick={handleSearchClick} cartCount={cartCount} />

        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                showHelperNotice={showHelperNotice} 
                setShowHelperNotice={setShowHelperNotice} 
              />
            } 
          />
          <Route 
            path="/restaurant/:id" 
            element={<RestaurantDetail onAddToCart={handleAddToCart} />} 
          />
        </Routes>

        <footer className="footer" id="help">
          <div className="footer-container">
            <div className="footer-logo">
              <div className="footer-logo-icon">🍳</div>
              <span className="footer-logo-text">FoodExpress</span>
            </div>
            <span className="footer-copyright">
              © {new Date().getFullYear()} FoodExpress Technologies Pvt. Ltd. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </Router>
  );
}
