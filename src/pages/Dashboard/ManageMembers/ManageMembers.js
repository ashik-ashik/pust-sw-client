import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';
import Loading from '../../CommonSections/Loading/Loading';
import Members from './Members/Members';

const ManageMembers = () => {
  useEffect(()=>{
    document.title = "Manage Members of PUST-SW";
  }, []);
  const {members} = useMember();
  if(!members){
    return <>
      <Loading />
    </>
  }
  return (
    <>
      <section className="py-4">
        <Container fluid>
          <h3 className="styled-heading mb-4 text-success">Manage Members:</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {
              members?.map(single => <Members key={single?._id} member={single} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ManageMembers;