import { useContext, useEffect, useState, useRef } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import AuthContext from "../context_store/AuthContext";
import { API_KEY } from "../utils/constants";

const Profile = () => {
  const ctx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const newPasswordRef = useRef();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              idToken: ctx.tokenId
            })
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setEmail(data.users[0].email);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [ctx.tokenId]);

  const changePasswordHandler = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idToken: ctx.tokenId,
            password: newPasswordRef.current.value,
            returnSecureToken: true
          })
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      alert("Password successfully changed.");
      newPasswordRef.current.value = "";
    } catch (err) {
      alert(err.message);
      newPasswordRef.current.value = "";
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Form className="mx-auto p-2" style={{ width: "50%" }}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="5">
          <Form.Control plaintext readOnly value={email} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          New Password
        </Form.Label>
        <Col sm="5">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={newPasswordRef}
          />
        </Col>
      </Form.Group>
      <Button className="align-middle" onClick={changePasswordHandler}>
        Update Password
      </Button>
    </Form>
  );
};

export default Profile;
