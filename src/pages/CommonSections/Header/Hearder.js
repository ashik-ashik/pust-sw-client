import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';

const Hearder = () => {
  const {user, memberLogOut} = useAuth();
  const [currentUser, setCurrentUser]=useState(null);
  useEffect(()=> {
    fetch(`http://localhost:5500/currentUser/${user?.email}`)
    .then(res => res.json())
    .then(data => setCurrentUser(data));
  }, []);
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
                <Nav.Link as={Link} className="menu-items" to="/"><i className='fs-4 bx bx-home me-2'></i> <span>Home</span></Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/notice"><i className='fs-4 bx bxs-bell-ring me-2'></i> <span>Notice</span></Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/events"><i className='fs-4 bx bx-calendar-event me-2' ></i> Events</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/members"><i className='fs-4 bx bxs-group me-2'></i> Members</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/profile"><i className='fs-4 bx bxs-user-circle me-2' ></i> Profile</Nav.Link>
                <Nav.Link as={Button} variant='danger' className='text-white small mt-2' onClick={memberLogOut}>Log Out</Nav.Link>
                
              </Nav>
              
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {
        currentUser ? (currentUser.email && "") : ""
      }

      {
       currentUser ? (!currentUser?.phone && !currentUser?.blood && !currentUser?.roll && !currentUser?.reg && !currentUser?.dept && !currentUser?.district &&  <>
        <Container>
        <Alert variant="danger" className='mt-4'>
          <Alert.Heading>Oh snap! You have not set your basic information!</Alert.Heading>
          <p>
            First you have to set some basic information about so that others can know you better. So please set your basic information. <br />
            <Link to="/setup-information">Click Here</Link>
          </p>
        </Alert>
      </Container>
       </>) : ''
      }
      
    </>
  );
};

export default Hearder;