import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Home from "./components/Home";
import Categories from "./components/Categories";
import CategoryRecipes from "./components/CategoryRecipes";
import UserProfile from "./components/UserProfile";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderStatus from "./components/OrderStatus";

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");
    setUserId(storedUserId);
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* Browse Categories */}
        <Route path="/categories/" element={<Categories />} />

        {/* List recipes under a specific category */}
        <Route
          path="/categories/:categoryName"
          element={<CategoryRecipes userId={userId} token={token} />}
        />

        {/* User Profile */}
        <Route
          path="/profile"
          element={<UserProfile userId={userId} token={token} />}
        />

        {/* Cart */}
        <Route path="/cart" element={<Cart userId={userId} token={token} />} />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout userId={userId} token={token} />}
        />

        {/* Order Status */}
        <Route
          path="/orders"
          element={<OrderStatus userId={userId} token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
