import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./components/Home";
import CategoriesManagement from "./components/CategoriesManagement"; 
import RecipesManagement from "./components/RecipesManagement";
import OrdersManagement from "./components/OrdersManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manage-categories" element={<CategoriesManagement />} />
        <Route path="/manage-recipes" element={<RecipesManagement />} />
        <Route path="/manage-orders" element={<OrdersManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
