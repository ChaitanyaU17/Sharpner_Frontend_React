import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Header from './Header';
import { useAuth } from '../Auth/AuthContext';

const UpdateProfile = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: user.idToken,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        const userProfile = data.users[0];
        setFullName(userProfile.displayName || '');
        setPhotoUrl(userProfile.photoUrl || '');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

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
            idToken: user.idToken,
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
            idToken: user.idToken,
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

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  const showProfile = (e) => {
    e.preventDefault();
    setShowUpdateProfile(true);
  }

  return (
    <Container fluid>
      <Header handleEmailVerification={handleEmailVerification} updateProfile={showProfile} />
      <Container className="mt-4">
        {emailSent && (
          <Alert variant="success">
            Verification email sent successfully. Check your email to verify.
          </Alert>
        )}
      </Container>
      {showUpdateProfile && (
        <Container>
          <h2>Contact Details</h2>
          <Form onSubmit={handleUpdateProfile}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">Profile updated successfully</Alert>
            )}
            <Row className="justify-content-md-evenly">
              <Col>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Photo URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter photo URL"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="mt-3 bg-danger bg-opacity-75" type="submit">
              Update Profile
            </Button>
          </Form>
        </Container>
      )}
    </Container>
  );
};

export default UpdateProfile;
