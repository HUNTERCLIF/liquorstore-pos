import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './CartContext';
import PointOfSale from './components/PointOfSale';
import Help from './components/Help';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="container">
          <nav>
            <ul>
              <li>
                <Link to="/">Point of Sale</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
            </ul>
          </nav>

          <hr />

          <Routes>
            <Route path="/" element={<PointOfSale />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
