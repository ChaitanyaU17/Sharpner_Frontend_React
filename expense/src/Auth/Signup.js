import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Toast, ToastContainer } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthActions } from "../store/AuthReducer";
import './Signup.css'

function Signup() {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const confirmInputRef = useRef();
  const [showError, setShowError] = useState({ active: false, message: "" });
  const [showLoginPage, setShowLoginPage] = useState(false);

  const SubmitHandler = async e => {
    e.preventDefault();
    let pass = passInputRef.current.value;
    let email = emailInputRef.current.value;

    if (showLoginPage) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0",
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken: true
          })
        }
      );
      const data = await response.json();
      if (data.error) {
        setShowError({ active: true, message: data.error.message });
        setTimeout(() => setShowError({ active: false, message: "" }), 3000);
        emailInputRef.current.value = "";
        passInputRef.current.value = "";
      } else {
        localStorage.setItem('idToken', data.idToken);
        localStorage.setItem('userId', data.localId);
        setShowError({ active: true, message: "Login Successfully" });
        setTimeout(() => setShowError({ active: false, message: "" }), 3000);
        dispatch(AuthActions.login(data.localId));
        emailInputRef.current.value = "";
        passInputRef.current.value = "";
      }
    } else {
      let cpass = confirmInputRef.current.value;
      if (pass === cpass) {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              password: pass,
              returnSecureToken: true
            })
          }
        );
        const data = await response.json();
        if (data.error) {
          setShowError({ active: true, message: data.error.message });
          setTimeout(() => setShowError({ active: false, message: "" }), 3000);
          emailInputRef.current.value = "";
          passInputRef.current.value = "";
        } else {
          setShowError({ active: true, message: "Signup Successfully" });
          setTimeout(() => setShowError({ active: false, message: "" }), 3000);
          emailInputRef.current.value = "";
          passInputRef.current.value = "";
          confirmInputRef.current.value = "";
        }
      } else {
        setShowError({
          active: true,
          message: "Password does not match with confirm"
        });
        setTimeout(() => setShowError({ active: false, message: "" }), 3000);
        passInputRef.current.value = "";
        confirmInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="signup-background">
      {showError.active && (
        <ToastContainer className="p-3" position="top-center" style={{ zIndex: 2 }}>
          <Toast>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>{showError.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <div className="expense-tracker-text">
        <h1 className="expense">Expense</h1>
        <h1 className="tracker">Tracker</h1>
      </div>
      <Card className="signup-card mx-auto pt-2 bg-success bg-opacity-25" style={{ width: "20rem", marginTop: "6%" }} onSubmit={SubmitHandler}>
        {showLoginPage ? (
          <h2 className="text-center w-100" variant="info">Login</h2>
        ) : (
          <h2 className="text-center w-100">Signup</h2>
        )}
        <Form className="mx-auto">
          <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef} />
            <Form.Text className="text-muted">
              <i>We'll never share your email with anyone else.</i>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required ref={passInputRef} />
          </Form.Group>
          {!showLoginPage && (
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" required ref={confirmInputRef} />
            </Form.Group>
          )}
          <Button variant="success" className="mb-3 w-100 rounded-5" type="submit">
            {showLoginPage ? "Login" : "Signup"}
          </Button>
        </Form>
        <div style={{ cursor: "pointer", marginLeft: "20px" }} sm="2" onClick={() => setShowLoginPage(!showLoginPage)}>
          {showLoginPage ? (
            <p>
              Create an account?{" "}
              <span className="text-primary" style={{ fontWeight: "600" }}>Signup</span>
            </p>
          ) : (
            <p>
              Have an Account?{" "}
              <span className="text-primary" style={{ fontWeight: "600" }}>Login</span>
            </p>
          )}
          <p>
            Forget Your Password{" "}
            <Link to="forget-pass" className="text-decoration-none" style={{ fontWeight: "600" }}>Click Here</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Signup;
