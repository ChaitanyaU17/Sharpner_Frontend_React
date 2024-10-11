/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqGXglsLCNKz8_ovTrZjtE_66ccW8GjCs`;
const resetPasswordUrl = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBqGXglsLCNKz8_ovTrZjtE_66ccW8GjCs`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (data.idToken) {
        const userId = data.localId;  // This is the UID (same as user UID in Firebase SDK)
        const token = data.idToken;   // Firebase Auth Token
  
        // Store them in localStorage for later use
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
  
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(data.error.message);
      }
  
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      alert("Please enter your email to reset password.");
      return;
    }

    try {
      const response = await fetch(resetPasswordUrl, {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: forgotPasswordEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      
      if (data.email) {
        alert("Password reset email sent! Please check your inbox.");
        setShowForgotPassword(false);
      } else {
        alert(data.error.message);
      }

      if (response.ok && data.idToken) {
        localStorage.setItem("token", data.idToken);
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(data.error.message);
      }

    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">User Log In</h2>

        {showForgotPassword ? (
          <div>
            <h3 className="text-xl text-center mb-4">Forgot Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
              required
            />
            <button
              onClick={handleForgotPassword}
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Reset Password
            </button>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="w-full py-2 px-4 mt-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Log In
            </button>
          </form>
        )}

        {!showForgotPassword && (
          <div className="text-sm text-center mt-4">
            <p>
              Forgot your password?{" "}
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-500 hover:underline"
              >
                Reset it here
              </button>
            </p>
            <p className="mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
