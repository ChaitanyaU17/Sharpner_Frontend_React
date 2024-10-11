/* eslint-disable react/prop-types */
import { useState } from "react";

const Checkout = ({ userId, token }) => {
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]);
  const ordersUrl = `https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/orders.json?auth=${token}`;

  const placeOrder = async () => {
    const order = {
      userId,
      address,
      items: cart,
      status: "pending",
    };
    await fetch(ordersUrl, {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    setCart([]); // Clear cart after placing order
    alert("Order placed successfully!");
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter delivery address"
        className="outline-none border-b-2 border-b-black px-1 mr-4"
      />
      <button className="bg-blue-300 rounded-lg px-4 p-2" onClick={placeOrder}>Place Order (COD)</button>
    </div>
  );
};

export default Checkout;
