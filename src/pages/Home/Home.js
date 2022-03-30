import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import useMember from '../../hooks/useMembers/useMembers';
import Hearder from '../CommonSections/Header/Hearder';
import Loading from '../CommonSections/Loading/Loading';
import Members from '../Dashboard/ManageMembers/Members/Members';
import EventCard from '../Events/EventCard/EventCard';
import NoticeCard from '../Notices/NoticeCard/NoticeCard';
import HomeBlogCard from './HomeBlogCard/HomeBlogCard';
import Slider from './Slider/Slider';


const Home = () => {
  useEffect(()=>{
    document.title = "Department of Social Work at PUST"
  }, []);
  const {user, isLoading} = useAuth();
  const navigate = useNavigate();
  const [members, setMembers] = useState(null);
  const [userLoad, setUserLoad] = useState(true);
  const [events, setEvents] = useState(null);
  const [notices, setNotices] = useState(null);
  const {currentMember} = useMember();
  const [blogs, setBlogs] = useState(null);



   useEffect (()=>{
      fetch(`https://warm-earth-97575.herokuapp.com/fearured-members`)
      .then(res => res.json())
      .then(result => setMembers(result))    
  }, [user]);

   
  
  useEffect(()=>{
    setUserLoad(true)
    fetch(`https://warm-earth-97575.herokuapp.com/events-home`)
    .then(res => res.json())
    .then(result => setEvents(result))    
    setUserLoad(false)
  },[]);
  
  useEffect(()=>{
    setUserLoad(true)
    fetch(`https://warm-earth-97575.herokuapp.com/notice-home`)
    .then(res => res.json())
    .then(result => setNotices(result))    
    setUserLoad(false)
  },[]);

  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/blogs-home`)
    .then(res => res.json())
    .then(result => setBlogs(result ? result : {}))
  },[]);


  if(isLoading || !currentMember || !blogs){
    return <>
      <Loading />
    </>
  }

  if(currentMember?.email){
    if(!currentMember?.fullName || !currentMember?.phone || !currentMember?.roll || !currentMember?.reg || !currentMember?.blood){
      navigate("/setup-information")
    }
  }
  if(currentMember.email && !currentMember?.isVerified){
    navigate("/verify-account");
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
          <h3 className="styled-heading">Newest Members:</h3>
          <Row xs={1} md={2} lg={4} className='g-4 py-4 border-bottom border-2 border-dark'>
            {
              members?.map(member => <Members key={member?._id} member={member} />)
            }
          </Row>

            <h3 className="styled-heading mt-3">Recent Notice:</h3>
          <Row xs={1} md={2} className="g-3 py-4 border-bottom border-2 border-dark">
          {
            notices?.map(notice => <NoticeCard key={notice?._id} notice={notice} />)
          }
          </Row>

            <h3 className="styled-heading my-4">Recent Events:</h3>
          {
            events?.map(event => <EventCard key={event?._id} event={event} />)
          }

          <h3 className="styled-heading py-4 border-top border-2 border-dark">Latest Blogs:</h3>
          <Row xs={1} md={2} lg={3}>
            {
              blogs?.map(blog => <HomeBlogCard key={blog?._id} blog={blog} />)
            }
          </Row>

        </Container>
      </section>
    </>
  );
};

export default Home;