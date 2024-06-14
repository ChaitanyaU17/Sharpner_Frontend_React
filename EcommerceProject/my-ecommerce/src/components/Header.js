import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { CartContext } from '../utils/CartContext';

const Header = () => {
  const { cartItems, toggleCartVisibility } = useContext(CartContext);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-black sticky-top top-0" style={{ height: "55px" }}>
      <header className='d-flex justify-content-between align-items-center pt-2 text-white'>
        <ul className='d-flex justify-content-center align-items-center list-unstyled m-0' style={{ flexGrow: 1 }}>
          <li className='mx-5'>
            <NavLink to="/" className="text-white" activeClassName="text-primary">HOME</NavLink>
          </li>
          <li className='mx-5'>
            <NavLink to="/store" className="text-white" activeClassName="text-primary">STORE</NavLink>
          </li>
          <li className='mx-5'>
            <NavLink to="/about" className="text-white" activeClassName="text-primary">ABOUT</NavLink>
          </li>
        </ul>
        <button 
          className='border border-primary mt-1 rounded bg-black text-white mx-5'
          onClick={toggleCartVisibility}
        >
          Cart ({cartCount})
        </button>
      </header>
    </div>
  );
}

export default Header;
