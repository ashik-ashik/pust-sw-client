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
import SliderHome from './Slider/Slider';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewSlider from './ReviewSlider/ReviewSlider';


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
  const [reviews, setReviews] = useState(null)



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

  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/approved-review`)
    .then(res => res.json())
    .then(result => setReviews(result ? result : {}))
  },[]);

  const reviewSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive:[ 
      { 
        breakpoint: 768, 
        settings: { slidesToShow: 1 } }, 
        { breakpoint: 991, 
          settings: { slidesToShow: 2 } }, 
        { breakpoint: 1100, 
          settings: { slidesToShow: 2 } } ]
  };


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
          <SliderHome />
        </Container>
      </section>

      <section className="bg-light py-4">
        <Container>
          <Row className="align-items-center">
            <Col md="7" className='mb-3'>
              <h3 className="styled-heading">A Few Words About the University</h3>
              <p style={{textAlign:"justify"}}>
              The government passed the Act in 15 July 2001 to establish a science and technology university in Pabna. The university will be located in the district head quarter of Pabna. Pabna is a central district town in northern Bangladesh having long historical and cultural heritage. The academic curriculum of the Pabna University of Science and Technology was started on 05 June 2008. This university will play an innovative role in providing need-based higher education, training and research. Also the university will be committed to maintain and raise the quality and standard of higher education for the students as in international standards. This practical and need-based curricula will produce highly qualified trained scientists and technologists for the needs of Bangladesh as well as the world employment market. The university offers education in science- and technology-based subjects for undergraduate and post graduate levels. This newly established university will occupies an area of about 30 acres, with a number of multi-storied buildings. Because of its location, it has already drawn the attention of brilliant students for admission and scholarly faculty members for teaching and research.
              </p>
            </Col>
            <Col>
            <img className='img-fluid' src="https://i.ibb.co/1Gy8Q93/1642572606maxresdefault.jpg" alt="Jonok" />
            </Col>
          </Row>
        </Container>        
      </section>

      <section className="py-4">
        <Container>
          <h3 className="styled-heading"><span className="text-danger fw-bolder">||</span> Newest <span className="text-danger fw-bolder styled-heading">Members</span>  :</h3>
          <Row xs={1} md={2} lg={4} className='g-4 py-4 border-bottom border-2 border-dark'>
            {
              members?.map(member => <Members key={member?._id} member={member} />)
            }
          </Row>

            <h3 className="styled-heading mt-3"><span className="text-danger fw-bolder">||</span> Recent <span className="text-danger fw-bolder styled-heading">Notice</span> :</h3>
          <Row xs={1} md={2} className="g-3 py-4 border-bottom border-2 border-dark">
          {
            notices?.map(notice => <NoticeCard key={notice?._id} notice={notice} />)
          }
          </Row>

            <h3 className="styled-heading my-4"><span className="text-danger fw-bolder">||</span> Recent <span className="text-danger fw-bolder styled-heading">Events</span> :</h3>
          {
            events?.map(event => <EventCard key={event?._id} event={event} />)
          }

          <h3 className="py-4 styled-heading border-top fw-bold border-secondary"><span className="text-danger fw-bolder">||</span> Latest <span className="text-danger fw-bolder styled-heading">Blogs</span>:</h3>
          <Row xs={1} md={2} lg={3} className="g-3">
            {
              blogs.length > 0 ? blogs?.map(blog => <HomeBlogCard key={blog?._id} blog={blog} />):<>
              <h5 className="title-font">There is no blogs available.</h5>
              </>
            }
          </Row>

          <h2 className="mt-4 text-center display-4">Students Say About This</h2>
          <Slider {...reviewSettings}>
            {
              reviews?.map(review => <ReviewSlider key={review?._id} review={review} />)
            }
          </Slider>
        </Container>
      </section>
    </>
  );
};

export default Home;