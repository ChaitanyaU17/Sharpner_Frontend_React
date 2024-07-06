import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import {store} from './Store/index';
import Header from './components/Header';
import UpdateProfile from './components/UpdateProfile';
import ForgetPassword from './components/ForgetPassword';
//import ExpenseForm from './components/ExpenseForm';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;
