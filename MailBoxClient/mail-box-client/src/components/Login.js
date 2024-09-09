import React, { useContext, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import AuthContext from "../store/authContext";

import { Button } from "react-bootstrap";

const LogIn = () => {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`,
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
    setLoading(false);
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

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <Container className="mt-3">
      <h2 className="text-center">LogIn</h2>
      <div className="d-flex justify-content-center">
        <form className="rounded-4 shadow-lg p-5 w-50" onSubmit={submitHandler}>
          <label htmlFor="email" className="my-1">
            Email
          </label>
          <br />
          <input
            type="email"
            id="email"
            className="form-control"
            ref={emailRef}
            placeholder="Email"
            required
          />
          <br />
          <label htmlFor="password" className="my-1">
            Password
          </label>
          <br />
          <input
            type="password"
            id="password"
            className="form-control"
            ref={passwordRef}
            placeholder="Password"
            required
          />
          <br />
          {loading ? (
            <p className="my-1">Loading...</p>
          ) : (
            <Button type="submit" variant="secondary" className="my-1 w-100">
              LogIn
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
};

export default LogIn;
