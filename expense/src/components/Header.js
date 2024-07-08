import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import ExpenseForm from './ExpenseForm';
//import Signup from './Signup';

const Header = ({ handleEmailVerification }) => {
  const { logout } = useAuth();

  return (
    <div>
      <Container fluid>
        <Row className="p-2 border border-black">
          <Col sm={4}>
            <i>Welcome to Expense Tracker!!</i>
          </Col>
          <Col className="bg-danger bg-opacity-25 p-1 rounded">
            <i>
              Your Profile is incomplete.{' '}
              <Link to="/update-profile">
                Complete now
              </Link>
            </i>
          </Col>
          <Col sm={2} className="d-flex justify-content-end">
            <Button
              className="bg-success bg-opacity-75 mt-3"
              onClick={handleEmailVerification}
            >
              Verify Email
            </Button>
          </Col>
          <Col sm={2} className="d-flex justify-content-end">
           <Link to='/signup'><Button className="bg-danger" onClick={logout}> Logout
           </Button></Link> 
             
          </Col>
        </Row>
      </Container>
      <ExpenseForm />
    </div>
  );
};

export default Header;
