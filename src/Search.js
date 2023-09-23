import React, { useState } from 'react';
import './VirtualKeyboard.css';
import VirtualKeyboard from './VirtualKeyboard';
import './Search.css';

// Define your shop data here
const shops = [
  {
    id: 1,
    name: 'Sportmaster',
    description: 'Fitness',
    products: ['GLASSESS', 'BALL', 'HATS'],
    distance: '700m',
    imageUrl: 'https://i2.photo.2gis.com/images/branch/0/30258560067372717_ee38.jpg',
  },
  {
    id: 2,
    name: 'ADIDAS',
    description: 'Fitness',
    products: ['BOOTS', 'BALL', 'SHORTS'],
    distance: '900m',
    imageUrl: 'https://i2.photo.2gis.com/images/branch/0/30258560109010468_2f6b_328x170.jpg',
  },
  {
    id: 3,
    name: 'NIKE',
    description: 'Fitness',
    products: ['T-SHIRT', 'SOCKS', 'BALL'],
    distance: '900m',
    imageUrl: 'https://i5.photo.2gis.com/images/branch/68/9570149240077333_d2c0_656x340.jpg',
  },
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [showShops, setShowShops] = useState(false);
  const [filteredShops, setFilteredShops] = useState([]);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);

    if (e.key === 'Enter') {
      const matchingShops = shops.filter((shop) =>
        shop.products.includes(searchText)
      );

      if (matchingShops.length > 0) {
        setFilteredShops(matchingShops);
        setShowShops(true);
      } else {
        setShowShops(false);
      }
    } else {
      setShowShops(false);
    }
  };

  const handleDelete = () => {
    setQuery(query.slice(0, -1));
  };

  const handleKeyboardKeyPress = (key) => {
    if (key === 'Del') {
      handleDelete();
    } else {
      setQuery(query + key);
    }
  };

  const handleSearchWithEnter = () => {
    const matchingShops = shops.filter((shop) =>
      shop.products.includes(query)
    );

    if (matchingShops.length > 0) {
      setFilteredShops(matchingShops);
      setShowShops(true);
    } else {
      setShowShops(false);
    }
  };

  const handleExit = () => {
    setShowShops(false); // Hide the shop list
    setQuery(''); // Clear the query
  };

  return (
    <div className="search-container">
      {showShops ? (
        <div className="shop-listings">
          {filteredShops.map((shop) => (
            <div key={shop.id} className="shop-listing">
              <img
                src={shop.imageUrl}
                alt={shop.name}
                className="shop-image" // Apply styles to the shop image
              />
              <h3>{shop.name}</h3>
              <p>About: {shop.description}</p>
              <p>Distance: {shop.distance}</p>
              <p>Products: {shop.products.join(', ')}</p>
            </div>
          ))}
          <button onClick={handleExit} className="exit-button">Exit</button> {/* Apply styles to the exit button */}
        </div>
      ) : (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a product..."
            value={query}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchWithEnter();
              }
            }}
          />
        </div>
      )}
      {showShops ? null : (
        <>
          <VirtualKeyboard
            onKeyPress={handleKeyboardKeyPress}
            onDelete={handleDelete}
            onSearch={handleSearchWithEnter}
          />
          <ul>
            {/* Render filtered items here if needed */}
          </ul>
        </>
      )}
    </div>
  );
};

export default Search;
