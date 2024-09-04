import React, { useContext } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import AuthContext from "../store/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import ComposeMail from "../components/ComposeMail";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
      <h1>Welcome to your Mail Box!</h1>
      <Container>
        <Row>
          <Col xxl={10}>
            <Routes>
              <Route 
                path="/composeMail" 
                element={authCtx.idToken ? <ComposeMail /> : <Navigate to="/home" />} 
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Home;
