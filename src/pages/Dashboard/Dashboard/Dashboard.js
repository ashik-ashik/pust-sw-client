import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Nav, Row, Table } from 'react-bootstrap';
import CRrequests from '../CRrequest/CRrequests';
import Loading from '../../CommonSections/Loading/Loading';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import ManageMembers from '../ManageMembers/ManageMembers';

const Dashboard = () => {
  const {memberLogOut} = useAuth()
  const [users, setUsers] = useState(null);
  useEffect(()=>{
    const load = async ()=>{
      const res = await fetch("https://warm-earth-97575.herokuapp.com/users");
      const result = await res.json();
      setUsers(result);
    };
    load();
  }, [users]);

  const CR_requests = users?.filter(ceReq => ceReq?.CRstatus === "pending");
  
  if(!users){
    return <>
    <Loading />
    </>
  }
  return (
    <>
      <DashboardHeader />
      <section className="py-4">
        <Container>
          <Row>
            <Col lg="3" className="bg-light">
              <h4 className="styled-heading">Dashboard</h4>
              <Nav.Link as={Link} className="admin-menu-items" to="/"><i className='fs-4 bx bxs-home me-2'></i> <span>Home</span></Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="/manage-members"><i className='fs-4 bx bxs-user-detail me-2'></i> <span>Manage Members</span></Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="/cr-request"><i className='fs-4 bx bxs-user-pin me-2' ></i> CR Requests</Nav.Link>
                <Nav.Link as={Link} className="admin-menu-items" to="/manage-notice"><i className='fs-4 bx bxs-bell-plus me-2' ></i> Manage Notice</Nav.Link>
                
                <Nav.Link as={Link} className="admin-menu-items" to="/profile"><i className='fs-4 bx bxs-user-circle me-2' ></i> Profile</Nav.Link>
                <Nav.Link variant='danger' size="sm" className='admin-menu-items mt-2 text-center fw-bold border' onClick={memberLogOut}>Log Out</Nav.Link>
            </Col>
            <Col >
              <ManageMembers />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Dashboard;