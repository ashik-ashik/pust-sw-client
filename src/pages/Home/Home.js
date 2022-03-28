import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import Hearder from '../CommonSections/Header/Hearder';
import Loading from '../CommonSections/Loading/Loading';
import Members from '../Dashboard/ManageMembers/Members/Members';
import EventCard from '../Events/EventCard/EventCard';
import NoticeCard from '../Notices/NoticeCard/NoticeCard';
import Slider from './Slider/Slider';


const Home = () => {
  useEffect(()=>{
    document.title = "Department of Social Work at PUST"
  }, []);
  const {user, isLoading} = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [userLoad, setUserLoad] = useState(true);
  const [events, setEvents] = useState(null);
  const [notices, setNotices] = useState(null);


   useEffect (()=>{
      fetch(`https://warm-earth-97575.herokuapp.com/fearured-members`)
      .then(res => res.json())
      .then(result => setMembers(result))    
  }, [user]);

   useEffect (()=>{
    setUserLoad(true)
      fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
      .then(res => res.json())
      .then(result => setCurrentMember(result))
      setUserLoad(false)    
  }, [user]);
  
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/events-home`)
    .then(res => res.json())
    .then(result => setEvents(result))    
  },[]);
  
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/notice-home`)
    .then(res => res.json())
    .then(result => setNotices(result))    
  },[]);

  console.log(notices)

  if(isLoading || userLoad){
    return <>
      <Loading />
    </>
  }

  if(currentMember){
    if(!currentMember?.fullName || !currentMember?.phone || !currentMember?.roll || !currentMember?.reg || !currentMember?.blood){
      navigate("/setup-information")
    }
  }
  // if(!currentMember?.isVerified){
  //   navigate("/verify-your-account")
  // }
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
          <h3 className="styled-heading mb-4">Newest Members:</h3>
          <Row xs={1} md={2} lg={4} className='g-4'>
            {
              members?.map(member => <Members key={member?._id} member={member} />)
            }
          </Row>

            <h3 className="styled-heading my-4">Recent Notice:</h3>
          <Row md={2} className="g-3">
          {
            notices?.map(notice => <NoticeCard key={notice?._id} notice={notice} />)
          }
          </Row>

            <h3 className="styled-heading my-4">Recent Events:</h3>
          {
            events?.map(event => <EventCard key={event?._id} event={event} />)
          }
        </Container>
      </section>
    </>
  );
};

export default Home;