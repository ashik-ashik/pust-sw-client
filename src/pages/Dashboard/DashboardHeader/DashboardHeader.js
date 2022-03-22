import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';

const DashboardHeader = () => {

  const {user, memberLogOut} = useAuth();
  const [currentUser, setCurrentUser]=useState(null);
  useEffect(()=> {
    fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
    .then(res => res.json())
    .then(data => setCurrentUser(data));
  }, [user]);

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand={false}>
        <Container>
          <Navbar.Brand as={Link} to="/"><img className='menubar-logo' src="https://i.ibb.co/Q9PRVg1/logo.png" alt="Pust sw" /></Navbar.Brand>
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
                
                <Nav.Link as={Link} className="menu-items" to="/"><i className='fs-4 bx bxs-home me-2'></i> <span>Home</span></Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/manage-members"><i className='fs-4 bx bxs-user-detail me-2'></i> <span>Manage Members</span></Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/cr-request"><i className='fs-4 bx bxs-user-pin me-2' ></i> CR Requests</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/manage-notice"><i className='fs-4 bx bxs-bell-plus me-2' ></i> Manage Notice</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/publish-event"><i className='fs-4 bx bxs-calendar-event me-2' ></i> Publish Event</Nav.Link>
                <Nav.Link as={Link} className="menu-items" to="/manage-events"><i className='fs-4 bx bx-calendar-event me-2' ></i> Manage Event</Nav.Link>
                
                <Nav.Link as={Link} className="menu-items" to="/profile"><i className='fs-4 bx bxs-user-circle me-2' ></i> Profile</Nav.Link>
                <Nav.Link as={Button} variant='danger' className='text-white small mt-2' onClick={memberLogOut}>Log Out</Nav.Link>
                
              </Nav>
              <div className="canvas-logo py-4">
                <Link to="/"><img className='img-fluid' src="https://i.ibb.co/Q9PRVg1/logo.png" alt="pust-sw" /></Link>
                <h4 className="styled-heading text-center text-success mt-4">Department of Social Work at PUST</h4>
              </div>
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


export default DashboardHeader;

 