import { Navbar, Container, Nav, Button, Badge ,Dropdown,DropdownButton } from "react-bootstrap";
import Cart from "../components/Cart";
import { useContext, useState } from "react";
import CartContext from "../context_store/Cart_Context";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context_store/AuthContext";

const Header = () => {

  const [show, setShow] = useState(false);
  const cartHandler = () => {
    setShow(!show);
  };
  const ctx = useContext(CartContext);
  
  const authCtx = useContext(AuthContext);
  const ctxCount = ctx.items.reduce((curr,item)=>{
    return curr = curr + item.quantity
  },0)
  const navigate = useNavigate();
  const goToLogin = () =>{
    if(authCtx.userLoggedIn){
      const confirm = window.confirm('Are You Sure to SignOut');
      if(confirm){
        authCtx.logout()
      }
      
    }
    else{
    navigate('/user-auth')
    }
  }

  return (
    < >
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Generics</Navbar.Brand>
        <Nav className="d-flex justify-content-between w-25" style={{fontWeight:'200', fontSize:'18px', textDecoration:'none'}}>
          <NavLink to="/home" className={({isActive})=>isActive?'text-info':'text-white'}>
            HOME
          </NavLink>
          <NavLink to="/" className={({isActive})=>isActive?'text-info':'text-white'} end>
            STORE
          </NavLink>
          <NavLink to="/about" className={({isActive})=>isActive?'text-info':'text-white'}>
            ABOUT
          </NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive?'text-info':'text-white'}>
            HELP
          </NavLink>
        </Nav>
        <div className="d-flex flex-row-reverse w-25"> 
        <Button
          variant="outline-info"
          onClick={cartHandler}
          className="position-relative m-2"
        >
          Cart
          <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">
            {ctxCount}
          </Badge>
        </Button>
        {authCtx.userLoggedIn &&<DropdownButton className="m-2"
        id="dropdown-basic-button"
        title="Profile"
        variant="info"
      ><Dropdown.Item onClick={()=>navigate('/change-password')}>
            Update Password
          </Dropdown.Item>
          <Dropdown.Item onClick={goToLogin}>
            Sign Out
          </Dropdown.Item>
        </DropdownButton>
      }
        {!authCtx.userLoggedIn && <Button
          variant="outline-info m-2"
          onClick = {goToLogin}

        >
          SignIn
        </Button>}
        </div>
        <Cart show={show} handleClose={cartHandler} />
      </Container>
    </Navbar>
    
    <p className=" text-center pb-5 bg-secondary text-white" style={{fontSize:'100px' ,fontWeight:'bold'}}>
    The Generics
  </p>
  </>
  );
};
export default Header;
