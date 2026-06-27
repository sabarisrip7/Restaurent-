import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants as initialRestaurants } from '../data/restaurants';

export default function Home({ showHelperNotice, setShowHelperNotice }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const searchInputRef = useRef(null);

  // Filter and sort logic
  useEffect(() => {
    let result = [...initialRestaurants];

    // Apply Search Filter
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query)
      );
    }
    if (activeFilter === 'Rating 4.2+') {
      result = result.filter((r) => r.rating >= 4.2);
    } else if (activeFilter === 'Pizzas') {
      result = result.filter((r) => r.cuisine.toLowerCase().includes('pizza'));
    } else if (activeFilter === 'Burgers') {
      result = result.filter((r) => r.cuisine.toLowerCase().includes('burger'));
    } else if (activeFilter === 'Desserts & Sweets') {
      result = result.filter(
        (r) =>
          r.cuisine.toLowerCase().includes('dessert') ||
          r.cuisine.toLowerCase().includes('sweet')
      );
    } else if (activeFilter === 'Cost: Low to High') {
      result.sort((a, b) => {
        const valA = parseInt(a.priceText.replace(/[^\d]/g, ''), 10);
        const valB = parseInt(b.priceText.replace(/[^\d]/g, ''), 10);
        return valA - valB;
      });
    }

    setRestaurants(result);
  }, [searchTerm, activeFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveFilter('All');
  };

  // Expose function to focus search via event if needed
  useEffect(() => {
    const handleFocusSearch = () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('focus-search-input', handleFocusSearch);
    return () => {
      window.removeEventListener('focus-search-input', handleFocusSearch);
    };
  }, []);

  return (
    <main className="main-content">
      {/* Photo Unpack Helper Notice */}
      {showHelperNotice && (
        <div className="dev-helper-notice">
          <span className="dev-helper-text">
            💡 <strong>Have custom photos?</strong> Rename your photos ZIP file to <span className="dev-helper-code">photos.zip</span> and place it in the root folder, then run <span className="dev-helper-code">./extract_photos.ps1</span> in PowerShell to extract them.
          </span>
          <button className="dev-helper-btn" onClick={() => setShowHelperNotice(false)}>Got it</button>
        </div>
      )}

      {/* Toolbar: Search and Filters */}
      <section className="toolbar-section">
        <div className="search-box-container">
          <span className="search-icon-inside">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="Search for restaurants or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="restaurant-search"
          />
          {searchTerm && (
            <button className="search-clear-btn" onClick={() => setSearchTerm('')} title="Clear Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="filters-container">
          {[
            { id: 'All', label: 'All Restaurants' },
            { id: 'Rating 4.2+', label: 'Rating 4.2+' },
            { id: 'Pizzas', label: 'Pizzas' },
            { id: 'Burgers', label: 'Burgers' },
            { id: 'Desserts & Sweets', label: 'Desserts & Sweets' },
            { id: 'Cost: Low to High', label: 'Price: Low to High' }
          ].map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Restaurant List Section */}
      <section className="section-header">
        <h2 className="section-title">Popular Restaurants near you</h2>
        <p className="section-subtitle">Showing {restaurants.length} premium food spots</p>
      </section>

      {restaurants.length > 0 ? (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className="restaurant-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
              <RestaurantCard {...restaurant} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3 className="no-results-title">No restaurants found</h3>
          <p className="no-results-text">We couldn't find anything matching your search criteria. Try adjusting your query or resetting filters.</p>
          <button className="reset-search-btn" onClick={handleResetFilters}>Reset Filters</button>
        </div>
      )}
    </main>
  );
}
