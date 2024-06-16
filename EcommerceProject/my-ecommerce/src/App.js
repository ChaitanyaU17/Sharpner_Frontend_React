import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Store from './components/Store';
import About from './components/About';
import { CartProvider } from './utils/CartContext';
import Home from './components/Home';
<<<<<<< HEAD
import ContactUs from './components/ContactUs';
=======
>>>>>>> 07d4ed887a16f52ce0e1828cd7ff90e7980a49f0

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
<<<<<<< HEAD
          <Route path="/contact" element={<ContactUs />} />
=======
>>>>>>> 07d4ed887a16f52ce0e1828cd7ff90e7980a49f0
        </Routes>
        <Cart />
      </Router>
    </CartProvider>
  );
}

export default App;
