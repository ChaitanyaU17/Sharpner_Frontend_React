import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ContactUs = () => {
  const [contactDetail, setContactDetail] = useState({
    name: '',
    email: '',
    pno: ''
  });
  const [showAlert, setShowAlert] = useState({ active: false, message: '', variant: '' });

  const showDetail = async (e) => {
    e.preventDefault();
    if (contactDetail.name !== '' && contactDetail.email !== '' && contactDetail.pno !== '') {
      const response = await fetch('https://ecommerce-1f4c2-default-rtdb.firebaseio.com/Eccommerce.json', {
        method: 'POST',
        body: JSON.stringify(contactDetail),
        headers: {
          'content-type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.name) {
        setShowAlert({ active: true, message: 'Saved Successfully, I will reach out soon', variant: 'success' });
        setContactDetail({
          name: '',
          email: '',
          pno: ''
        });
        setTimeout(() => setShowAlert({ active: false, message: '', variant: '' }), 3000);
      }
    } else {
      setShowAlert({ active: true, message: 'Please fill out all details', variant: 'danger' });
      setTimeout(() => setShowAlert({ active: false, message: '', variant: '' }), 3000);
    }
  };

  return (
    <div className='mt-4'>
      {showAlert.active && <Alert variant={showAlert.variant}>{showAlert.message}</Alert>}
      <Form onSubmit={showDetail} className="d-flex flex-column mx-auto justify-content-around" style={{ width: "50%" }}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label className="text-primary">Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={contactDetail.name}
            onChange={e => setContactDetail(prev => ({ ...prev, name: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-primary">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={contactDetail.email}
            onChange={e => setContactDetail(prev => ({ ...prev, email: e.target.value }))}
          />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label className="text-primary">Contact Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Contact Number"
            value={contactDetail.pno}
            onChange={e => setContactDetail(prev => ({ ...prev, pno: e.target.value }))}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ContactUs;
