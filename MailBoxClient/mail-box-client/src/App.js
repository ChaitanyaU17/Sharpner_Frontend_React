import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './pages/Home';
import AuthProvider from './store/AuthProvider';

function App() {
  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Signup />, // Default route to signup
    },
    {
      path: '/home',
      element: <Home />, // Route for the home page
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
