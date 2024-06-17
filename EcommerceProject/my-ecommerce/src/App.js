import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Store from './components/Store';
import About from './components/About';
import { CartProvider } from './utils/CartContext';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import ProductDetailPage from './components/ProductDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
        <Cart />
      </Router>
    </CartProvider>
  );
}

export default App;
