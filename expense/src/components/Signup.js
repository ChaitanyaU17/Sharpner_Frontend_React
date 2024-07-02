import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
//import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Signup failed");
      }

      const data = await response.json();
      console.log("User has successfully signed up", data);
      setSuccess(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.message);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  const handleLogin = async (e) => { 
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          
        }
        
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Login failed");
      }

      const data = await response.json();
      console.log("Logged in successfully", data);
      setSuccess(true);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(error.message);
      setEmail('');
      setPassword('');
      setConfirmPassword('')
    }
  };

  if (isLoggedIn) {
    return (
      <div className="text-center" style={{ marginTop: "20%" }}>
        <h1>Welcome to Expense Tracker</h1>
      </div>
    );
  }

  return (
    <div>
      <Card style={{ width: "20rem", marginTop: "10%" }} className="mx-auto">
        <h2 className="text-center mt-3 mb-3 w-100">
          {showLoginPage ? "Login" : "Signup"}
        </h2>
        <Form
          className="mx-auto"
          onSubmit={showLoginPage ? handleLogin : handleSignup}
        >
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">
              {showLoginPage
                ? "Logged in successfully"
                : "User has successfully signed up"}
            </Alert>
          )}

          <Form.Group className="mb-3 mt-2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {!showLoginPage && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}

          <Button
            variant="primary"
            className="mb-3 w-100 rounded-5"
            type="submit"
          >
            {showLoginPage ? "Login" : "Sign Up"}
          </Button>
        </Form>
        <div className="text-center mb-3">
        {showLoginPage ? (
            <>
              <p
                className="text-primary"
                onClick={() => setShowLoginPage(false)}
                style={{ cursor: "pointer" }}
              >
                Create an account? Signup
              </p>
              <p className="text-primary" style={{ cursor: "pointer" }}>
                Forget Your Password? Click Here
              </p>
            </>
          ) : (
            <p
              className="text-primary"
              onClick={() => setShowLoginPage(true)}
              style={{ cursor: "pointer" }}
            >
              Have an Account? Login
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Signup;
