// App.js
import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import UpdateProfile from './components/UpdateProfile';
import { AuthProvider } from './Auth/AuthContext';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />
  },
  {
    path: "/update-profile",
    element: <UpdateProfile />
  }
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;

