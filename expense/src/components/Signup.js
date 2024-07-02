import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
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
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log("User has successfully signed up", data);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Card style={{ width: "20rem", marginTop: "10%" }} className="mx-auto">
        <h2 className="text-center mt-3 mb-3 w-100">Signup</h2>
        <Form className="mx-auto" onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">User has successfully signed up</Alert>}

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

          <Button
            variant="primary"
            className="mb-3 w-100 rounded-5"
            type="submit"
          >
            Sign Up
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
