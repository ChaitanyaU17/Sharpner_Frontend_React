import React, { useContext } from 'react';
import { CartContext } from '../utils/CartContext';

const Header = () => {
  const { cartItems, toggleCartVisibility } = useContext(CartContext);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-black" style={{ height: "55px" }}>
      <header className='d-flex justify-content-between align-items-center pt-2 text-white'>
        <ul className='d-flex justify-content-center align-items-center list-unstyled m-0' style={{ flexGrow: 1 }}>
          <li className='mx-5'>HOME</li>
          <li className='mx-5'>STORE</li>
          <li className='mx-5'>ABOUT</li>
        </ul>
        <button 
          className='border border-primary mt-1 rounded bg-black text-white mx-5'
          onClick={toggleCartVisibility}
        >
          Cart ({cartCount})
        </button>
      </header>
      <h1 className='d-flex justify-content-center mt-4'>The Generics</h1>
    </div>
  );
}

export default Header;
