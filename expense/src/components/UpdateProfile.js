import { FaGithub } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ToastContainer
} from "react-bootstrap";

const UpdateProfile = () => {
  const nameinputRef = useRef();
  const urlInputRef = useRef();

  const [showError, setShowError] = useState({ active: false, message: "" });
  useEffect(
    () => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0",
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            idToken: localStorage.getItem('idToken')
          })
        }
      )
        .then(res => res.json())
        .then(data => {
          console.log(data)
          nameinputRef.current.value = data.users[0].displayName
            ? data.users[0].displayName
            : "";
          urlInputRef.current.value = data.users[0].photoUrl
            ? data.users[0].photoUrl
            : "";
        });
    },
    []
  );
  const InputHandler = async e => {
    e.preventDefault();

    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyANERKoLhs3lYRdOUUuhTC2iH9FUv-oLT0",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          idToken: localStorage.getItem('idToken'),
          displayName: nameinputRef.current.value,
          photoUrl: urlInputRef.current.value,
          returnSecureToken: true
        })
      }
    );

    setShowError({ active: "true", message: "Updated SuccessFully" });
    setTimeout(() => setShowError({ active: false, message: "" }), 3000);
    nameinputRef.current.value = "";
    urlInputRef.current.value = "";
  };
  return (
    <Container>
      <h2>Contact Details</h2>
      <Form onSubmit={InputHandler}>
        <Row className=" w-50">
          <Col className="mt-2">
            <Form.Label><FaGithub />{' '}Full Name</Form.Label>
            <Form.Control size="sm" type="text" required ref={nameinputRef} />

            <Form.Label className="mt-2"><TbWorld />{' '}Photo Url</Form.Label>
            <Form.Control size="sm" type="text" required ref={urlInputRef} />
          </Col>
        </Row>

        <Button variant="danger" className="mt-3" type="submit">
          Update
        </Button>
      </Form>
      {showError.active &&
        <ToastContainer
          className="p-3"
          position="top-center"
          style={{ zIndex: 1 }}
        >
          <Alert variant="success" className="mt-5">Profile{' '}{showError.message}</Alert> 
          
        </ToastContainer>}
    </Container>
  );
};
export default UpdateProfile;
