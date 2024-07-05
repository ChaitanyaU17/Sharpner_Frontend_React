import React from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Header from './components/Header';
import UpdateProfile from './components/UpdateProfile';
import ForgetPassword from './components/ForgetPassword';
import { AuthProvider, useAuth } from './Auth/AuthContext';
import ExpenseForm from './components/ExpenseForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const RouterComponent = () => {
  const { isLoggedIn } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn
        ? <Header /> : <Navigate to="/signup" replace />,
      children: [
        {
          path: "/update-profile",
          element: <UpdateProfile />
        },
        {
          path: "/",
          element: <ExpenseForm />
        }
      ]
    },
    {
      path: "/signup",
      children: [
        {
          path: "/signup",
          element: isLoggedIn
            ? <Navigate to="/" replace />
            : <Signup />
        },
        {
          path: "/signup/forget-pass",
          element: <ForgetPassword />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AuthProvider>
      <RouterComponent />
    </AuthProvider>
  );
};

export default App;
