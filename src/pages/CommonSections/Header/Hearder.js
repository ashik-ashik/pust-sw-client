import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';

const Hearder = ({children}) => {
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
          <Nav className='ms-auto me-2'>
            {children}
          </Nav>
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
              <Nav className="justify-content-end  pe-3">
                <Nav.Link as={NavLink} className="menu-items" to="/"><i className='fs-4 bx bx-home me-2'></i> <span>Home</span></Nav.Link>
                {
                  currentUser?.role === "admin" && <>
                    <Nav.Link as={Link} className="menu-items" to="/dashboard/overview"><i className='fs-4 bx bxs-dashboard me-2'></i> <span>Dashboard</span></Nav.Link>
                  </>
                }
                <Nav.Link as={NavLink} className="menu-items" to="/cafeteria"><i className='fs-4 bx bx-restaurant me-2'></i> <span>Cafeteria</span></Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/notice-board"><i className='fs-4 bx bx-bell me-2'></i> <span>Notice</span></Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/events"><i className='fs-4 bx bx-calendar-event me-2' ></i> Events</Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/find-blood"><i className='fs-4 bx bx-donate-blood me-2' ></i> Find Blood</Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/contacts"><i className='fs-4 bx bx-phone me-2' ></i> Contacts</Nav.Link>
                
                <Nav.Link as={NavLink} className="menu-items" to="/members"><i className='fs-4 bx bx-group me-2'></i> Members</Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/profile"><i className='fs-4 bx bx-user-circle me-2' ></i> Profile</Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/blogs"><i className='fs-4 bx bx-book-alt me-2' ></i> Blogs</Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/publish-blog"><i className='fs-4 bx bx-book-add me-2' ></i> Publish a Blogs</Nav.Link>

                <Nav.Link as={NavLink} className="menu-items" to="/mission-vision"><i className='fs-4 bx bx-target-lock me-2' ></i> Mission & Vision</Nav.Link>

                {
                  user ? <Nav.Link as={Button} variant='danger' className='text-white mt-2 py-1' onClick={memberLogOut}>Log Out</Nav.Link> : <>
                    <Nav.Link to="/login">Log In</Nav.Link>
                  </>
                }
                
              </Nav>
              <div className="canvas-logo py-4">
                <a href="https://social-work-at-pust.web.app/" rel='noreferrer' target='_blank'><img className='img-fluid' src="https://i.ibb.co/Q9PRVg1/logo.png" alt="pust-sw" /></a>
                <h4 className="styled-heading text-center text-success mt-4">Department of Social Work at PUST</h4>
              </div>
              <p style={{fontSize:'11px'}} className="text-secondary">
              the web side designed and developed by <Link to="/member/625dbd513d8e55f7e7ede7f6">Md Ashik Ali</Link>
              </p>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
        <div className="pt-2 pb-1 bg-danger">
      <Container>
        <marquee className='text-white m-0 small' behavior="scroll" truespeed='1' direction="left">
            <small className="small">
            Hey Social Worker, Ramadan Mubarak. Welcome {currentUser?.fullName} to the our new web application. We are going to get useable helpful reality based web application. Thank you for visiting us.
            </small>
          </marquee>
      </Container>
        </div>
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