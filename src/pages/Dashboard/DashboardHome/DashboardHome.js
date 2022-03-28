import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';

const DashboardHome = () => {
  const {members} = useMember();
  const crs = members?.filter(member => member?.CRstatus === 'verified');
  const crRequest = members?.filter(member => member?.CRstatus === "pending");
  const batch11 = members?.filter(member => member?.batchNo === "11");
  return (
    <>
      <section className="py-4">
        <Container fluid>
          <h3 className="styled-heading mb-3">Welcome to Dashboard</h3>
          <Row xs="1" md="3" lg='4' className='g-4'>
            <Col>
              <div className="bg-light text-center py-4 rounded-3 dashboard-box">
                <h3 className="mb-1 fs-2 fw-bold">{members?.length}</h3>
                <p className="small m-0">Members</p>
              </div>
            </Col>
            <Col>
              <div className="bg-light text-center py-4 rounded-3 dashboard-box">
                <h3 className="mb-1 fs-2 fw-bold">{crs?.length}</h3>
                <p className="small m-0">CRs</p>
              </div>
            </Col>
            <Col>
              <div className="bg-light text-center py-4 rounded-3 dashboard-box">
                <h3 className="mb-1 fs-2 fw-bold">{crRequest?.length}</h3>
                <p className="small m-0">CR Request(s)</p>
              </div>
            </Col>
            <Col>
              <div className="bg-light text-center py-4 rounded-3 dashboard-box">
                <h3 className="mb-1 fs-2 fw-bold">{batch11?.length}</h3>
                <p className="small m-0">From 11<sup>th</sup> Batch</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
    </>
  );
};

export default DashboardHome;