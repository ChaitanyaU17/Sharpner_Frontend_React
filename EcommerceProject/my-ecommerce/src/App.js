import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Store from './components/Store';
import About from './components/About'; // Import the About component
import { CartProvider } from './utils/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Cart />
      </Router>
    </CartProvider>
  );
}

export default App;
