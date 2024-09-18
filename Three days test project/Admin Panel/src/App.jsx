import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
