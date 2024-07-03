import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UpdateProfile = () => {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: localStorage.getItem('idToken'),
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        const user = data.users[0];
        setFullName(user.displayName || '');
        setPhotoUrl(user.photoUrl || '');
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: localStorage.getItem('idToken'),
            displayName: fullName,
            photoUrl: photoUrl,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col sm={6}>Welcome to Expense Tracker!!</Col>
        <Col sm={3} className="bg-info">
          Your Profile is incomplete. <Link to="/update-profile">Complete now</Link>
        </Col>
      </Row>
      <Container>
        <h2>Contact Details</h2>
        <Form onSubmit={handleUpdateProfile}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Profile updated successfully</Alert>}
          <Row className="justify-content-md-center">
            <Col>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Form.Label>Photo URL</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Button variant="danger" className="mt-3" type="submit">
            Update
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default UpdateProfile;
