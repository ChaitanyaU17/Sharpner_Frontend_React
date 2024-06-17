import React, { useState } from "react";

const AuthContext = React.createContext({
  tokenId: "",
  userLoggedIn: false,
  useremail: "",
  login: (id, email) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const idTokenLocal = localStorage.getItem("idToken");
  const userEmailLocal = localStorage.getItem("email");
  const [tokenId, setTokenId] = useState(idTokenLocal);
  const [email, setEmail] = useState(userEmailLocal);

  const loginHandler = (id, email) => {
    localStorage.setItem("idToken", id);
    localStorage.setItem("email", email);
    setTokenId(id);
    setEmail(email);
  };

  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    setTokenId(null);
    setEmail("");
  };

  const userLoggedInHandler = !!tokenId;

  const authValue = {
    tokenId,
    userLoggedIn: userLoggedInHandler,
    useremail: email,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
