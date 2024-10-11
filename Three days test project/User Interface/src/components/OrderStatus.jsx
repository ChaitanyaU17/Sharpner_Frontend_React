/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const OrderStatus = ({ userId, token }) => {
  const [orders, setOrders] = useState([]);
  const dbUrl = `https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/orders.json?auth=${token}`;

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(dbUrl);
      const data = await response.json();
      const userOrders = Object.entries(data).filter(
        ([, order]) => order.userId === userId
      );
      setOrders(userOrders);
    };
    fetchOrders();
  }, [dbUrl, userId]);

  // Function to determine background color based on order status
  const getStatusBgColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400";
      case "preparing":
        return "bg-blue-400";
      case "delivered":
        return "bg-green-400";
      default:
        return "bg-gray-200"; // Default color for any other status
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-10">Order Status</h1>
      {orders.length > 0 ? (
        orders.map(([key, order]) => (
          <div
            key={key}
            className={`p-5 mb-5 rounded-lg ${getStatusBgColor(order.status)}`}
          >
            <p className="text-xl font-semibold">Order Status: {order.status}</p>
            <p className="text-xl font-semibold">Address: {order.address}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderStatus;
