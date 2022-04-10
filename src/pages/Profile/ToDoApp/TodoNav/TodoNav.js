import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TodoNav = () => {
  return (
    <Navbar bg="danger" variant="dark">
    <Container>
    <Navbar.Brand as={Link} to="/"><img className='menubar-logo' src="https://i.ibb.co/Q9PRVg1/logo.png" alt="Pust sw" /></Navbar.Brand>
    <Nav className="ms-auto">
      <Nav.Link as={Link} to="/"><i className='bx bx-home fs-4 text-white'></i></Nav.Link>
      <Nav.Link as={Link} to="/profile"><i className="bx bx-user-circle fs-4 text-light"></i></Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
};

export default TodoNav;