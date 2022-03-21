import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import Hearder from '../CommonSections/Header/Hearder';
import Loading from '../CommonSections/Loading/Loading';
import Members from '../Dashboard/ManageMembers/Members/Members';
import Slider from './Slider/Slider';

const Home = () => {
  useEffect(()=>{
    document.title = "Department of Social Work at PUST"
  }, []);
  const {user} = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState(null);
  const [currentMembers, setCurrentMembers] = useState(null);

   useEffect (()=>{
    const load = async ()=> {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/fearured-members`);
      const result = await res.json();
      setMembers(result);
    }
    if(user){
      load();
    }
  }, [user]);

   useEffect (()=>{
    const load = async ()=> {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`);
      const result = await res.json();
      setCurrentMembers(result);
    }
    if(user){
      load();
    }
  }, [user]);
  

  if(!members){
    return <>
      <Loading />
    </>
  }

  if(!currentMembers?.fullName || !currentMembers?.phone || !currentMembers?.roll || !currentMembers?.reg || !currentMembers?.blood){
    navigate("/setup-information")
  }
  return (
    <>
      <Hearder />
      
      <section>
        <Container >
          <Slider />
        </Container>
      </section>

      <section className="bg-light py-4">
        <Container>
          <Row className="align-items-center">
            <Col md="7" className='mb-3'>
              <h3 className="styled-heading">A Few Words About the University</h3>
              <p style={{textAlign:"justify"}}>One of the world's premier academic and research institutions, the Pabna University of Science and Technology has driven new ways of thinking since our 2008 founding. Today, PUST is an intellectual destination that draws inspired scholars to our Hyde Park and international campuses, keeping PUST at the nexus of ideas that challenge and change the world.</p>
            </Col>
            <Col>
            <img className='img-fluid' src="https://i.ibb.co/1Gy8Q93/1642572606maxresdefault.jpg" alt="Jonok" />
            </Col>
          </Row>
        </Container>        
      </section>

      <section className="py-4">
        <Container>
          <h3 className="styled-heading mb-4">Featured Members:</h3>
          <Row xs={1} md={2} lg={4} className='g-4'>
            {
              members?.map(member => <Members key={member?._id} member={member} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;