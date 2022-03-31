import React from 'react';
import { Container, Row } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';
import AdminCard from './AdminCard/AdminCard';

const ManageAdmin = () => {
  const {members} = useMember();
  return (
    <>
      <section className="py-4">
        <Container fluid >
          <h3 className="title-font">Make a new Admin</h3>
          <div className="search-box-admin py-3">
            <p className="small">Search a user:</p>
          </div>
          <Row classNmae="mt-4" xs="1" md="3" lg="4">
            {
              members?.map(member => <AdminCard key={member?._id} member={member} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ManageAdmin;