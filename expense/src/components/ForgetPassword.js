import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to send password reset email');
      }

      setLoading(false);
      setSuccess(true);
      setEmail('');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div style={{ width: '20rem', marginTop: '10%' }} className="mx-auto">
      <h2 className="text-center mt-3 mb-3">Forget Password</h2>
      <Form onSubmit={handleForgetPassword}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">Password reset email sent successfully. Check your email to reset the password.</Alert>}
        <Form.Group className="mb-3 mt-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" className="mb-3 w-100 rounded-5" type="submit" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Next'}
        </Button>
        <div className="border border-primary p-1 rounded text-center mt-3">
          <Link to="/signup" style={{textDecoration: 'none'}} >Back to Signup</Link>
        </div>
      </Form>
    </div>
  );
};

export default ForgetPassword;
