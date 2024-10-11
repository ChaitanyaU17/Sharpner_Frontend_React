/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Cart = ({ userId, token }) => {
  const [cart, setCart] = useState([]);
  const dbUrl = `https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/users/${userId}/cart.json?auth=${token}`;

  useEffect(() => {
    const fetchCart = async () => {
        if (!userId) {
            console.error("User ID is undefined. Cannot fetch cart.");
            return;
        }

        const cartUrl = `https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/users/${userId}/cart.json?auth=${token}`;
        const response = await fetch(cartUrl);
        const data = await response.json();

        setCart(data ? Object.values(data) : []);
    };

    fetchCart();
}, [userId, token]);


  

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-10">Food Cart</h1>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <div key={index} >
            <div className="flex flex-row  gap-x-2 justify-between shaadow-lg bg-gray-50 p-2">
            
              <img className="h-22 w-32" src={item.image} alt='' />
              <p className="text-xl font-semibold">{item.name} <br /> Price: {item.price}</p>
              
              <button className="bg-yellow-400 px-2 h-14 rounded-lg " onClick={() => alert('Your order has been placed successfully!')}>cash on delivery</button>
             
            </div>
            
          </div>
        ))
      ) : (
        <p className="text=xl font-semibold">Cart is Empty!</p>
      )}
    </div>
  );
};

export default Cart;
