import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { restaurants } from '../data/restaurants';

// Helper to generate dynamic menu items based on restaurant cuisines
const getMockMenu = (cuisineStr) => {
  const cuisines = cuisineStr.split(',').map(c => c.trim());
  const primary = cuisines[0] || 'Fast Food';
  
  const menuTemplates = {
    'Chinese': [
      { id: 'c1', name: 'Veg Manchurian Dry', price: 180, desc: 'Deep-fried mixed vegetable balls tossed in Chinese sauces.', tags: ['Veg', 'Bestseller'] },
      { id: 'c2', name: 'Hakka Noodles', price: 210, desc: 'Perfectly cooked noodles tossed with fresh veggies and aromatic spices.', tags: ['Veg'] },
      { id: 'c3', name: 'Chilli Chicken Gravy', price: 260, desc: 'Tender chicken chunks coated and cooked in rich spicy soy-chilli gravy.', tags: ['Non-Veg', 'Must Try'] },
      { id: 'c4', name: 'Spring Rolls', price: 150, desc: 'Crispy rolls filled with seasoned vegetables, served with sweet chilli sauce.', tags: ['Veg'] }
    ],
    'Pizzas': [
      { id: 'p1', name: 'Double Cheese Margherita', price: 249, desc: 'Classic delight with double mozzarella cheese on a fresh herb crust.', tags: ['Veg', 'Bestseller'] },
      { id: 'p2', name: 'Farmhouse Special Pizza', price: 399, desc: 'Overloaded with capsicum, tomatoes, onions, mushrooms, and golden corn.', tags: ['Veg'] },
      { id: 'p3', name: 'Spicy Chicken Supreme Pizza', price: 459, desc: 'Spicy chicken, schezwan chicken meatballs, onions, and red paprika.', tags: ['Non-Veg', 'Must Try'] },
      { id: 'p4', name: 'Garlic Breadsticks', price: 129, desc: 'Baked to perfection with garlic butter and creamy cheese filling.', tags: ['Veg'] }
    ],
    'North Indian': [
      { id: 'n1', name: 'Paneer Butter Masala', price: 240, desc: 'Soft cottage cheese cubes cooked in rich tomato and butter-laden gravy.', tags: ['Veg', 'Bestseller'] },
      { id: 'n2', name: 'Butter Naan (1 Pc)', price: 60, desc: 'Soft and fluffy flatbread baked in tandoor and brushed with butter.', tags: ['Veg'] },
      { id: 'n3', name: 'Chicken Dum Biryani', price: 320, desc: 'Richly flavored basmati rice layered with marinated chicken and fried onions.', tags: ['Non-Veg', 'Must Try'] },
      { id: 'n4', name: 'Dal Makhani', price: 199, desc: 'Black lentils slow cooked overnight with butter and cream.', tags: ['Veg'] }
    ],
    'Sweets': [
      { id: 's1', name: 'Kesar Rasmalai (2 Pcs)', price: 110, desc: 'Soft cottage cheese dumplings soaked in saffron milk.', tags: ['Veg', 'Sweet', 'Bestseller'] },
      { id: 's2', name: 'Gulab Jamun (2 Pcs)', price: 80, desc: 'Deep-fried milk solids dumplings dipped in warm sugar syrup.', tags: ['Veg', 'Sweet'] },
      { id: 's3', name: 'Kaju Katli (250g)', price: 250, desc: 'Premium cashew fudge sheets cut in diamond shape.', tags: ['Veg', 'Sweet'] }
    ],
    'Burgers': [
      { id: 'b1', name: 'Crispy Veg Burger', price: 99, desc: 'Crispy vegetable patty, layered with fresh lettuce and rich creamy mayo.', tags: ['Veg', 'Bestseller'] },
      { id: 'b2', name: 'Spicy Grilled Chicken Burger', price: 169, desc: 'Juicy grilled chicken breast with spicy secret sauce and melted cheese.', tags: ['Non-Veg', 'Must Try'] },
      { id: 'b3', name: 'Cheesy Fries', price: 119, desc: 'Crispy golden fries loaded with warm liquid cheese sauce.', tags: ['Veg'] }
    ],
    'Bakery': [
      { id: 'bk1', name: 'Truffle Celebration Cake (Half Kg)', price: 499, desc: 'Decadent chocolate sponge layered with dark chocolate truffle ganache.', tags: ['Veg', 'Bestseller'] },
      { id: 'bk2', name: 'Red Velvet Pastry', price: 120, desc: 'Classic red velvet crumb layer with rich cream cheese frosting.', tags: ['Veg'] },
      { id: 'bk3', name: 'Blueberry Cheesecake Slice', price: 180, desc: 'Baked New York style cheesecake topped with sweet blueberry compote.', tags: ['Veg', 'Must Try'] }
    ]
  };

  // Find matches or fallback to a default menu
  const matchedKey = Object.keys(menuTemplates).find(key => 
    primary.toLowerCase().includes(key.toLowerCase()) || 
    key.toLowerCase().includes(primary.toLowerCase())
  );
  
  if (matchedKey) {
    return menuTemplates[matchedKey];
  }

  // General fallback menu
  return [
    { id: 'g1', name: 'Special Veg Thali', price: 220, desc: 'A complete meal with Paneer, Dal, Veg Sabji, Roti, Rice, Sweet and Salad.', tags: ['Veg', 'Bestseller'] },
    { id: 'g2', name: 'Spicy Chicken Wrap', price: 149, desc: 'Tortilla rolled with spicy crispy chicken, fresh veggies and chipotle sauce.', tags: ['Non-Veg', 'Must Try'] },
    { id: 'g3', name: 'Cold Coffee with Ice Cream', price: 120, desc: 'Rich espresso blended with milk and topped with vanilla ice cream.', tags: ['Veg'] },
    { id: 'g4', name: 'French Fries (Large)', price: 99, desc: 'Salted, crispy golden potato fries served with ketchup.', tags: ['Veg'] }
  ];
};

export default function RestaurantDetail({ onAddToCart }) {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [imgSrc, setImgSrc] = useState('');
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    const found = restaurants.find(r => r.id === id);
    if (found) {
      setRestaurant(found);
      setMenu(getMockMenu(found.cuisine));
      setImgSrc(`/images/${found.image}`);
      setHasFailed(false);
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div className="main-content no-results">
        <div className="no-results-icon">🤷</div>
        <h3 className="no-results-title">Restaurant not found</h3>
        <p className="no-results-text">The restaurant you are looking for does not exist or has been removed.</p>
        <Link to="/" className="reset-search-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Go Back Home</Link>
      </div>
    );
  }

  const handleImageError = () => {
    if (!hasFailed) {
      setImgSrc(restaurant.fallbackImage);
      setHasFailed(true);
    }
  };

  const isHighRating = restaurant.rating >= 4.2;

  return (
    <div className="restaurant-detail-page">
      {/* Premium details hero banner */}
      <section className="detail-hero">
        <div className="detail-hero-content">
          <div className="detail-hero-left">
            <Link to="/" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to all restaurants</span>
            </Link>
            <h1 className="detail-title">{restaurant.name}</h1>
            <p className="detail-cuisines">{restaurant.cuisine}</p>
            
            <div className="detail-meta">
              <span className={`rating-badge ${isHighRating ? 'rating-high' : 'rating-med'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {restaurant.rating.toFixed(1)}
              </span>
              <span className="detail-meta-divider">•</span>
              <span className="detail-meta-text">⚡ {restaurant.deliveryTime}</span>
              <span className="detail-meta-divider">•</span>
              <span className="detail-meta-text">💵 {restaurant.costForTwo}</span>
            </div>
          </div>
          
          <div className="detail-hero-right">
            <img 
              src={imgSrc} 
              alt={restaurant.name} 
              className="detail-hero-image"
              onError={handleImageError}
            />
          </div>
        </div>
      </section>

      {/* Menu list section */}
      <main className="detail-main-content">
        <h2 className="menu-section-title">Recommended Menu</h2>
        <p className="menu-section-subtitle">Delicious dishes freshly prepared by chefs</p>
        
        <div className="menu-list">
          {menu.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="menu-item-details">
                <div className="menu-item-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className={`menu-tag ${tag.toLowerCase()}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="menu-item-name">{item.name}</h3>
                <span className="menu-item-price">₹{item.price}</span>
                <p className="menu-item-desc">{item.desc}</p>
              </div>
              <div className="menu-item-action">
                <button className="add-item-btn" onClick={() => onAddToCart(item)}>
                  <span>ADD</span>
                  <span className="plus-icon">+</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
