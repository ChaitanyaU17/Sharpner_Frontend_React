import React, { useContext, useRef } from "react";

import { Container, Button } from "react-bootstrap";
import AuthContext from "../store/authContext";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } else {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_KEY}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        authCtx.addIdToken(data.idToken);
        authCtx.addEmail(email);
      } else {
        let errMessage = "Authentication Failed...";
        if (data && data.error && data.error.message) {
          errMessage = data.error.message;
        }
        alert(errMessage);
      }
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <Container className="mt-3">
      <h2 className="text-center">SignUp</h2>
      <div className="d-flex justify-content-center">
        <form className="shadow-lg rounded-4 w-50 p-5" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              ref={confirmPasswordRef}
              className="form-control"
              placeholder="Confirm Password"
              required
            />
          </div>
          <Button type="submit" variant='secondary' className="w-100 my-3">
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
