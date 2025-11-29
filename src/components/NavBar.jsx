import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
    <Container>
      <Navbar.Brand as={NavLink} to="/">Your Name</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
          <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          <Nav.Link as={NavLink} to="/contact-types">Contact Types</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;