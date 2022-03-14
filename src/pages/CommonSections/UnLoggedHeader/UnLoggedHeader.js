import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UnLoggedHeader = () => {
  return (
    <>
      <Navbar bg="light">
      <Container>
      <Navbar.Brand as={Link} to="/"><img className='menubar-logo' src="https://i.ibb.co/Q9PRVg1/logo.png" alt="Pust sw" /></Navbar.Brand>
      <Nav className="ml-auto">
      <Nav.Link className='d-flex align-items-center text-dark' as={Link} to="/login"><i className='bx bxs-log-in-circle me-1'></i><span className="small">Log In</span></Nav.Link>
    </Nav>
      </Container>
    </Navbar>
    </>
  );
};

export default UnLoggedHeader;