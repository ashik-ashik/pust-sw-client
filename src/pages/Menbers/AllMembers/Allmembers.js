import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Hearder from '../../CommonSections/Header/Hearder';
import MemberCard from './MemberCard/MemberCard';

const Allmembers = () => {
  const {user} = useAuth();
  const [users, setUsers] = useState(null);
  useEffect(()=> {
    fetch("http://localhost:5500/users")
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [user]);
  console.log(users)
  return (
    <>
      <Hearder />

      <section className="allMemver-header">
        <Container>
        <h3 className="styled-heading text-white fs-2">Members</h3>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Row>
            <Col></Col>
            <Col md="9">              
              <Row xs={1} md={2} lg={3} className="g-4">
                  {
                    users?.map(user => <MemberCard key={user?._id} userInfo={user} />)
                  }
                </Row>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Allmembers;