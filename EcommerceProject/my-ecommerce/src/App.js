import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Store from './components/Store';
import About from './components/About';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import { CartContextProvider } from './utils/CartContext'; // Correct import

function App() {
  return (
    <CartContextProvider> {/* Correct usage */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Cart />
      </Router>
    </CartContextProvider>
  );
}

export default App;
