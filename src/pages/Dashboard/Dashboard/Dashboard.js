import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Offcanvas, Row} from 'react-bootstrap';
import Loading from '../../CommonSections/Loading/Loading';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import useMember from '../../../hooks/useMembers/useMembers';
import Hearder from '../../CommonSections/Header/Hearder';

const Dashboard = () => {
  useEffect(()=>{
    document.title = "Dashboard";
  },[])
  const {memberLogOut} = useAuth()
  const {members} = useMember();

  const [ofcanvasHandle, setOffcanvasHandle] = useState(false)

  
  if(!members){
    return <>
    <Loading />
    </>
  }
  return (
    
    <>
      <Hearder />
      <section className="pb-4">
        <Container fluid>
          <Row className="profile-sticky">
            <Col lg="3" xl="2" className="bg-light d-block d-lg-none profile-nav-sticky">
              <Row className='align-items-center'>
                <Col>
                  <i onClick={()=> setOffcanvasHandle(true)} className='bx bx-menu-alt-left fs-3'></i>
                  <Offcanvas className="dashboard-off" show={ofcanvasHandle} onHide={()=> setOffcanvasHandle(false)}>
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Dashboard</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="/"><i className='fs-4 bx bxs-left-arrow-alt me-1'></i> <span>Back to Home</span></Nav.Link>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="overview"><i className='fs-4 bx bxs-droplet-half me-2'></i> <span>Overview</span></Nav.Link>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="manage-members"><i className='fs-4 bx bxs-user-detail me-2'></i> <span>Manage Members</span></Nav.Link>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="cr-request"><i className='fs-4 bx bxs-user-pin me-2' ></i> CR Requests</Nav.Link>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="manage-notice"><i className='fs-4 bx bxs-bell-plus me-2' ></i> Manage Notice</Nav.Link>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="publish-event"><i className='fs-4 bx bxs-calendar-event me-2' ></i> Publish Event</Nav.Link>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="manage-events"><i className='fs-4 bx bx-calendar-event me-2' ></i> Manage Event</Nav.Link>
                      <Nav.Link as={NavLink} className="admin-menu-items" to="manage-an-admin"><i className='fs-4 bx bxs-check-shield me-2' ></i> Manage Admin</Nav.Link>
                      
                      <Nav.Link as={NavLink} className="admin-menu-items" to="/profile"><i className='fs-4 bx bxs-user-circle me-2' ></i> Profile</Nav.Link>
                      <Nav.Link variant='danger' size="sm" className='admin-menu-items mt-2 text-center fw-bold border' onClick={memberLogOut}>Log Out</Nav.Link>
                    </Offcanvas.Body>
                  </Offcanvas>
                    
                </Col>
                <Col><h4 className="styled-heading">Dashboard</h4></Col>
              </Row>
            </Col>
            <Col lg="3" xl="2" className="bg-light d-none d-lg-block profile-nav-sticky">
              <h4 className="styled-heading d-none d-lg-block">Dashboard</h4>
                <Nav.Link as={NavLink} className="admin-menu-items" to="/"><i className='fs-4 bx bxs-left-arrow-alt me-1'></i> <span>Back to Home</span></Nav.Link>
                <Nav.Link as={NavLink} className="admin-menu-items" to="overview"><i className='fs-4 bx bxs-droplet-half me-2'></i> <span>Overview</span></Nav.Link>
                <Nav.Link as={NavLink} className="admin-menu-items" to="manage-members"><i className='fs-4 bx bxs-user-detail me-2'></i> <span>Manage Members</span></Nav.Link>
                <Nav.Link as={NavLink} className="admin-menu-items" to="cr-request"><i className='fs-4 bx bxs-user-pin me-2' ></i> CR Requests</Nav.Link>
                <Nav.Link as={NavLink} className="admin-menu-items" to="manage-notice"><i className='fs-4 bx bxs-bell-plus me-2' ></i> Manage Notice</Nav.Link>
                <Nav.Link as={NavLink} className="admin-menu-items" to="publish-event"><i className='fs-4 bx bxs-calendar-event me-2' ></i> Publish Event</Nav.Link>
                <Nav.Link as={NavLink} className="admin-menu-items" to="manage-events"><i className='fs-4 bx bx-calendar-event me-2' ></i> Manage Event</Nav.Link>
                <Nav.Link as={NavLink} className="admin-menu-items" to="manage-an-admin"><i className='fs-4 bx bxs-check-shield me-2' ></i> Manage Admin</Nav.Link>
                
                <Nav.Link as={NavLink} className="admin-menu-items" to="/profile"><i className='fs-4 bx bxs-user-circle me-2' ></i> Profile</Nav.Link>
                <Nav.Link variant='danger' size="sm" className='admin-menu-items mt-2 text-center fw-bold border' onClick={memberLogOut}>Log Out</Nav.Link>
            </Col>
            <Col >
              <Outlet />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;