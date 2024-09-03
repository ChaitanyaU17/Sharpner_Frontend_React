import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <Signup /> // Set a default route if needed
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
