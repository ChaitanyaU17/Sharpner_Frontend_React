// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import UpdateProfile from './components/UpdateProfile';
import { AuthProvider } from './Auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
