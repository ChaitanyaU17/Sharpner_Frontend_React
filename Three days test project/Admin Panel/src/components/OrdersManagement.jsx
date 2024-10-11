import { useState, useEffect } from "react";

const ordersUrl = "https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/orders.json";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch all orders from Firebase
  const fetchOrders = async () => {
    const response = await fetch(ordersUrl);
    const data = await response.json();

    // Extract orders data from the response
    const extractedOrders = Object.entries(data || {}).map(([id, order]) => ({
      id,
      ...order,
    }));
    
    setOrders(extractedOrders);
  };

  // Update the order status in Firebase
  const updateOrderStatus = async (id, status) => {
    await fetch(`https://restaurant-app-cc3a3-default-rtdb.firebaseio.com/orders/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });
    fetchOrders(); // Refresh orders after update
  };

  return (
    <div className="p-5">
      <h2 className="text-4xl font-bold mb-5">Manage Orders</h2>
      {orders.length > 0 ? (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="p-4 border rounded-lg shadow-lg bg-gray-100">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p className="font-semibold">Customer: {order.address}</p>
              <p>Order Status: <span className="font-bold">{order.status}</span></p>

              <div className="mt-3 space-x-3">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  onClick={() => updateOrderStatus(order.id, "delivered")}
                >
                  Mark as Delivered
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={() => updateOrderStatus(order.id, "failed")}
                >
                  Mark as Failed
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default OrdersManagement;
