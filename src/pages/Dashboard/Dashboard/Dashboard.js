import React, { useEffect } from 'react';
import { Col, Container, Nav, Row} from 'react-bootstrap';
import CRrequests from '../CRrequest/CRrequests';
import Loading from '../../CommonSections/Loading/Loading';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import ManageMembers from '../ManageMembers/ManageMembers';
import useMember from '../../../hooks/useMembers/useMembers';

const Dashboard = () => {
  useEffect(()=>{
    document.title = "Dashboard";
  },[])
  const {memberLogOut} = useAuth()
  const members = useMember();

  const CR_requests = members?.filter(ceReq => ceReq?.CRstatus === "pending");
  
  if(!members){
    return <>
    <Loading />
    </>
  }
  return (
    <>
      <DashboardHeader />
      <section className="pb-4">
        <Container fluid>
          <Row className="profile-sticky">
            <Col lg="3" xl="2" className="bg-light d-none d-lg-block sticky-top profile-nav-sticky">
              <h4 className="styled-heading">Dashboard</h4>
                <Nav.Link as={Link} className="admin-menu-items" to="/"><i className='fs-4 bx bxs-left-arrow-alt me-1'></i> <span>Back to Home</span></Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="overview"><i className='fs-4 bx bxs-droplet-half me-2'></i> <span>Overview</span></Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="manage-members"><i className='fs-4 bx bxs-user-detail me-2'></i> <span>Manage Members</span></Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="cr-request"><i className='fs-4 bx bxs-user-pin me-2' ></i> CR Requests</Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="manage-notice"><i className='fs-4 bx bxs-bell-plus me-2' ></i> Manage Notice</Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="publish-event"><i className='fs-4 bx bxs-calendar-event me-2' ></i> Publish Event</Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="manage-events"><i className='fs-4 bx bx-calendar-event me-2' ></i> Manage Event</Nav.Link>
                
                <Nav.Link as={Link} className="admin-menu-items" to="/profile"><i className='fs-4 bx bxs-user-circle me-2' ></i> Profile</Nav.Link>
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