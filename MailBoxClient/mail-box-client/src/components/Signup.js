import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/AuthContext';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [loading, setLoading] = useState(false);

  const authctx = useContext(AuthContext);

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
      setLoading(true);
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
      setLoading(false);
      const data = await res.json();
      if (res.ok) {
        authctx.addIdToken(data.idToken);
        authctx.addEmail(email);
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 shadow-lg p-5 mt-3 rounded-5">
          <h2 className="text-center mb-4">Signup</h2>
          <form onClick={submitHandler}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                ref={emailRef}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                ref={confirmPasswordRef}
                placeholder="Confirm Password"
                required
              />
            </div>
            {loading ? (
              <button type="submit" className="btn btn-primary w-100">
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            )}
          </form>
          <div className="text-center mt-3">
            <p>
              Already a user?{" "}
              <Link to="/login" style={{ color: "blue" }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
