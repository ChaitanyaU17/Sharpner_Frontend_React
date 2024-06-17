import React from "react";
import { useState } from "react";
const AuthContext = React.createContext({
  tokenId: "",
  userLoggedIn: false,
  useremail:"",
  login: id => {},
});

export const AuthContextProvider = props => {
  const idTokenLocal = localStorage.getItem("idToken");
  const userEmailLocal = localStorage.getItem('email')
  const [tokenId, setTokenId] = useState(idTokenLocal);
  const [email, setemailId] = useState(userEmailLocal);
  

  const loginHandler = (id,email) => {
    localStorage.setItem("idToken", JSON.stringify(id));
    localStorage.setItem('email',email)

    setTokenId(id);
    setemailId(email);
  };
 

  const userLoggedInHanlder = idTokenLocal ? true : false;
  const authValue = {
    tokenId,
    userLoggedIn: userLoggedInHanlder,
    useremail: email,
    login: loginHandler,
   
  };
  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
