import { useState, useEffect } from "react";

const ordersUrl = "https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/orders.json";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch(ordersUrl);
    const data = await response.json();
    setOrders(Object.entries(data || {}));
  };

  const updateOrderStatus = async (id, status) => {
    await fetch(`https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/orders/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });
    fetchOrders();
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl font-bold">Manage Orders</h2>
      <ul>
        {orders.map(([id, order]) => (
          <li key={id}>
            <p>Order ID: {id}</p>
            <p>Status: {order.status}</p>
            <p>Items: {order.items.join(", ")}</p>
            <button onClick={() => updateOrderStatus(id, "delivered")}>Mark as Delivered</button>
            <button onClick={() => updateOrderStatus(id, "failed")}>Mark as Failed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersManagement;
