import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UpdateProfile = () => {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

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
      <Row className="mb-4 p-2 border border-black">
        <Col sm={6}>
        { showProfile ? <i>Winners never quit, Quitters never win</i> : <i> Welcome to Expense Tracker!! </i>}
        </Col>
        <Col sm={3} className="bg-danger bg-opacity-25 p-1 rounded"><i>
          Your Profile is incomplete. <Link onClick={() => setShowProfile(true)} to="/update-profile">Complete now</Link>
          </i>
        </Col>
      </Row>
      {showProfile && (
      <Container>
        <h2>Contact Details</h2>
        <Form onSubmit={handleUpdateProfile}>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Profile updated successfully</Alert>}
          <Row className="justify-content-md-evenly">
            <Col >
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className='mb-3 w-50'
              />
              <Form.Label>Profile Photo URL</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
                className='w-50'
              />
            </Col>
          </Row>
          <Button variant="danger" className="mt-3" type="submit">
            Update
          </Button>
        </Form>
      </Container>
        )}
    </Container>
  );
};

export default UpdateProfile;
