import React from 'react';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Store from './components/Store';
import { CartProvider } from './utils/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <Store />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
