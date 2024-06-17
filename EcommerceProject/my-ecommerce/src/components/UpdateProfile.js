import { useContext, useEffect, useState, useRef } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import AuthContext from "../context_store/AuthContext";
import { API_KEY } from "../utils/constants";

const Profile = () => {
  const ctx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const newPasswordRef = useRef();
  
  console.log(ctx.tokenId)
  useEffect(
    () => {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            idToken: ctx.tokenId
          })
        }
      )
        .then(res => {
          if (!res.ok) {
            console.log('res',res)
            throw new Error("Email Not Found");
          }
          return res.json();
        })
        .then(data => setEmail(data.users[0].email))
        .catch(err => setEmail(err.message));
    },[ctx]
  );
  const changePasswordHandler = async () => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
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
      window.confirm(data.error.message);
      newPasswordRef.current.value = "";
    }
    else{
        window.confirm('SuccessFully Changed')
        newPasswordRef.current.value = "";
    }
  };
  return (
    <Form className="mx-auto p-2" style={{width: "50%"}}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="5">
          <Form.Control plaintext readOnly defaultValue={email} />
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
      <Button
        className="align-middle"
        onClick={changePasswordHandler}
      >
        Update Password
      </Button>
    </Form>
  );
};
export default Profile;
