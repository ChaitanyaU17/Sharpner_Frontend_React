import React from "react";
import { Navbar, Container, Badge, ListGroup } from "react-bootstrap";
import { FiEdit3 } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const mails = useSelector(state => state.inbox.mails);
  let unreadInbox = 0;

  for (let i of mails) {
    if (i[1].read === false) {
      unreadInbox += 1;
    }
  }

  return (
    <Navbar>
      <Container>
        <ListGroup>
          <ListGroup.Item variant="info">
            <NavLink
              style={(isActive) => ({
                color: isActive ? "black" : "green",
                textDecoration: "inherit",
              })}
              to="/composeMail"
              
            >
              <FiEdit3  />
              <span className='px-2'>Compose Mail</span>
            </NavLink>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <NavLink
              style={(isActive) => ({
                color: isActive ? "black" : "blue",
                textDecoration: "inherit",
              })}
              to="/inbox"
            >
              Inbox {<Badge pill>{unreadInbox}</Badge>}
            </NavLink>
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <NavLink
              style={(isActive) => ({
                color: isActive ? "black" : "blue",
                textDecoration: "inherit",
              })}
              to="/sent"
            >
              Sent
            </NavLink>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Navbar>
  );
};

export default NavBar;
