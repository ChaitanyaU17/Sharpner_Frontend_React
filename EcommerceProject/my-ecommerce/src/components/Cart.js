import React from 'react'
import CartItems from './CartItems'

const cartElements = [

    {
    
    title: 'Colors',
    
    price: 100,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    
    quantity: 2,
    
    },
    
    {
    
    title: 'Black and white Colors',
    
    price: 50,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    
    quantity: 3,
    
    },
    
    {
    
    title: 'Yellow and Black Colors',
    
    price: 70,
    
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    
    quantity: 1,
    
    }
    
    ]

    const Cart = () => {
      const total = cartElements.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return (
        <div className="container my-5">
          <h1 className="text-center mb-4">CART</h1>
          <div className="cart-items">
            {cartElements.map((item, index) => (
              <CartItems key={index} item={item} />
            ))}
          </div>
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <span className="h5">Total</span>
            <span className="h5">${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-lg btn-block ml-8">
            PURCHASE
          </button>
        </div>
      );
    };

export default Cart
