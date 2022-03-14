import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../../CommonSections/Loading/Loading';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import Members from './Members/Members';

const ManageMembers = () => {
  const {user} = useAuth();
  const [users, setUsers] = useState(null);
  const [data , setData] = useState('');
  // const history = 
  useEffect(()=> {
    fetch("https://warm-earth-97575.herokuapp.com/users")
    .then(res => res.json())
    .then(data => {
      setUsers(data)
    });
  }, [user]);
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
          <Row xs={1} md={2} lg={4} className="g-4">
            {
              users?.map(single => <Members key={single?._id} member={single} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ManageMembers;