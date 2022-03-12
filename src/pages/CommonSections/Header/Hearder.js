import React from 'react';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';

const Hearder = () => {
  const {user, memberLogOut} = useAuth();
  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand={false}>
        <Container>
          <Navbar.Brand as={Link} to="/">PUST-SW</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className='shahow-none rounded-0 border-2' />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} className="menu-items" to="/">Home</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/notice">Notice</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/events">Events</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/members">Members</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/profile"><img className='nav-avatar' src={user?.photoURL ? user.photoURL : "https://i.ibb.co/DYyrPrg/avatar.png" } alt="avatar" /> Profile</Nav.Link>
                <Nav.Link as={Button} variant='danger' className='text-white small mt-2' onClick={memberLogOut}>Log Out</Nav.Link>
                
              </Nav>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </>
  );
};

export default Hearder;