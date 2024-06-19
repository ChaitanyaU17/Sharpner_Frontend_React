import { useState, useRef, useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import classes from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context_store/AuthContext";
import { API_KEY } from "../utils/constants";

const AuthForm = () => {
  const ctx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState({ active: false, message: "" });
  const email = useRef();
  const password = useRef();
  // const username = useRef();
  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };
  const history = useNavigate();
  const AuthHandler = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (!isLogin) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}
        `,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            returnSecureToken: true
          })
        }
      );
      const data = await response.json();
      if (data.error) {
        setIsLoading(false);
        setShowMsg({ active: true, message: data.error.message });
        setTimeout(() => setShowMsg({ active: false, message: "" }), 3000);
        email.current.value = "";
        password.current.value = "";

      } else {
        setIsLoading(false);
        setShowMsg({ active: "true", message: "Signup SuccessFully" });
        setTimeout(() => setShowMsg({ active: false, message: "" }), 3000);
        email.current.value = "";
        password.current.value = "";
      }
    } else {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY} 
        `,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            returnSecureToken: true
          })
        }
      );

      const data = await response.json();
      if (data.error) {
        setIsLoading(false);
        setShowMsg({ active: true, message: data.error.message });
        setTimeout(() => setShowMsg({ active: false, message: "" }), 3000);
        email.current.value = "";
        password.current.value = "";
      } else {
        
        ctx.login(data.idToken,data.email);
        setIsLoading(false);
        setShowMsg({ active: "true", message: "Login SuccessFully" });
        setTimeout(() => setShowMsg({ active: false, message: "" }), 3000);
        email.current.value = "";
        password.current.value = "";
       
        history('/store');

      }
    }
  };
  return (
    <section className={classes.auth} >
      {!ctx.userLoggedIn &&
      <>
      <h1>
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form onSubmit={AuthHandler}>
      {/* <div className={classes.control}>
          <label>Name</label>
          <input type="text" required ref={username} />
        </div> */}
        <div className={classes.control}>
          <label>Your Email</label>
          <input type="email"required ref={email} />
        </div>
        <div className={classes.control}>
          <label>Your Password</label>
          <input type="password"ref={password} required />
        </div>
        <div className={classes.actions}>
          {!isloading
            ? <button
                type="submit"
                className={classes.button}
  
              >
                {isLogin ? "SignIn" : "SignUp"}
              </button>
            : <p>Sending Request...</p>}
        </div>

        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      {showMsg.active &&
        <ToastContainer
          className="p-3"
          position="top-center"
          style={{ zIndex: 1 }}
        >
          <Toast>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>
              {showMsg.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>}
        </>
}
{ctx.userLoggedIn&& <h1>You are Already Signed In</h1>}
    </section>
  
  );
};

export default AuthForm;
