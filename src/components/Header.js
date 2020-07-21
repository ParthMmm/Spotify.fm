import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar className="color-nav" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>
          <NavLink to="/home/" style={{ color: "#7abd00" }}>
            <i class="fa fa-spotify" aria-hidden="true"></i>.
            <i class="fa fa-lastfm-square" aria-hidden="true"></i>
          </NavLink>
        </Navbar.Brand>
        <Nav className="mr-auto"></Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
