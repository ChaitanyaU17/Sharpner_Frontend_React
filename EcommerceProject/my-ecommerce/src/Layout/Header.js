import { Navbar, Container, Nav, Button, Badge, Dropdown, DropdownButton } from "react-bootstrap";
import Cart from "../components/Cart";
import { useContext, useState } from "react";
import CartContext from "../context_store/Cart_Context";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context_store/AuthContext";

const Header = () => {
  const ctx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const showCartHandler = () => setShowCart(true);
  const hideCartHandler = () => setShowCart(false);

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login');
  };

  return (
    <>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/store">
                Store
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contact Us
              </Nav.Link>
              {authCtx.isLoggedIn && (
                <Nav.Link as={NavLink} to="/profile">
                  Profile
                </Nav.Link>
              )}
            </Nav>
            <Nav className="ms-auto">
              {!authCtx.isLoggedIn ? (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <DropdownButton
                  title={authCtx.email}
                  className="m-2"
                  variant="info"
                >
                  <Dropdown.Item as={NavLink} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </DropdownButton>
              )}
              <Button variant="outline-light" onClick={showCartHandler}>
                Cart <Badge bg="secondary">{ctx.items.length}</Badge>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <p
        className=" text-center pb-5 bg-secondary text-white"
        style={{ fontSize: "100px", fontWeight: "bold" }}
      >
        The Generics
      </p>
    </>
  );
};

export default Header;
