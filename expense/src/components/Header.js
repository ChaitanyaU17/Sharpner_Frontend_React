import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useDispatch} from "react-redux";
import { AuthActions } from "../Store/AuthReducer";

const Header = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailVerification = async () => {
    setError('');
    setEmailSent(false);
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: localStorage.getItem('idToken'), // Ensure idToken is correctly stored in localStorage
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send verification email');
      }

      setEmailSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () =>{
    dispatch(AuthActions.logout())

  }
  return (
    <Container fluid>
      <Row className="mt-3">
        <Col sm={6}><i>Welcome Expense Tracker !!</i></Col>
        <Col sm={3} className="bg-danger bg-opacity-25 rounded pt-1">
          <i>Your Profile is incomplete.{' '}<Link to="/update-profile">Complete now</Link></i>
        </Col>
        <Col sm={2}>
          <Button variant="success" onClick={handleEmailVerification}>
            Verify Email
          </Button>
        </Col>
        <Col sm={1}>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <hr />
      {emailSent && (
        <Container className="mt-4">
          <Alert variant="success">
            Verification email sent successfully. Check your email to verify.
          </Alert>
        </Container>
      )}
      {error && (
        <Container className="mt-4">
          <Alert variant="danger">
            {error}
          </Alert>
        </Container>
      )}
      <Outlet />
    </Container>
  );
};
export default Header;
