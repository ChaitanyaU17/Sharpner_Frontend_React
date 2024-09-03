import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authctx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const passsword = passwordRef.current.value;

    setLoading(true);

    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        passsword: passsword,
        returnSecureToken: true,
      }),
    }
  );
  setLoading(false);
  const data = await res.json();
  if(res.ok) {
    navigate('/home');
    authctx.addIdToken(data.idToken);
    authctx.addEmail(email);
  } else {
    let errorMsg = 'Authentication failed.';
    if (data && data.error && data.error.message) {
      errorMsg = data.error.message;
    }
    alert(errorMsg);
  }
    email.current.value = '';
    passsword.current.value = '';
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 shadow-lg p-5 mt-3 rounded-5">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={submitHandler}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                className='form-control'
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className='form-control'
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </div>
            {loading ? (
              <button type="submit" className="btn btn-primary w-100">
              Loading...
            </button>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            )}
          </form>
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "blue" }}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
