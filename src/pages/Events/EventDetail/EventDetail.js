import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useMember from '../../../hooks/useMembers/useMembers';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';

const EventDetail = () => {
 
  const [event, setEvent] = useState(null);
  const [reFetch, setFetch] = useState(false)
  const {id} = useParams();
  const {currentMember} = useMember();
  useEffect(()=>{
      fetch(`https://pust-sw-server.vercel.app/event/${id}`)
      .then(res => res.json())
      .then(result => setEvent(result));
      setFetch(false);
  },[id, reFetch]);
  const eventContent = event?.eventContent

  let date = ['','','']
   if(event){
    date = event?.eventDate?.split('-');
   }
  const [yy, mm, dd ] = date;
  const months = ['',"January", "February","March","April","May","June","July",'August','September',"October","November","December"];
  const month = months[parseInt(mm)]

  useEffect(()=>{
    document.title = `Event- ${event?.eventTitle ? event?.eventTitle : ''}`;
  },[event]);

 

  if(!event){
    return <Loading />
  }

  const likes = [...event?.likes];
  const isLiked = likes?.find(like => like === currentMember?._id);
  const likesAdd = (likerId) => {
    if(!isLiked){
      likes.push(likerId);
    }
    axios.put(`https://pust-sw-server.vercel.app/event-like/${id}`, {likes : likes})
    .then(res => {
      setFetch(true)
    })
  }

  return (
    <>
      <Hearder />
      <section className="py-5 publish-notice">
        <Container>
          <h2 className="border-start border-3 border-warning display-5 fw-bold text-white ps-3">Event</h2>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          <h2 className="title-font">{event?.eventTitle}</h2>
          <img className='event-detail-img' src={event?.eventImage} alt="" />
          <div className="pt-3 d-flex align-items-center">
            <i onClick={()=>likesAdd(currentMember?._id)} className={`bx ${isLiked ? 'bxs' : 'bx'}-heart ${isLiked && 'text-danger'}`} style={{cursor:'pointer'}}></i> 
            <small className="text-danger title-font fw-bold ms-1">{event?.likes?.length} Likes</small>
          </div>
          <Row className="mt-3">
            <Col>
              <h3 className="styled-heading">EVENT DESCRIPTION:</h3>
              <p className="mb-4" style={{textAlign:"justify"}}>
                {event?.eventBody}
              </p>

              <h3 className="styled-heading">EVENT CONTENT:</h3>
              <ul className='text-dark event-content-list m-0 p-0'>
                <span dangerouslySetInnerHTML={{ __html : eventContent }} />
              </ul>
            </Col>
            <Col md="3" className='border-start'>
                <div className="py-3 border-bottom">
                  <h5 className='title-font fw-bold'><i className='bx me-2 bx-time text-warning'></i>Start Time:</h5>
                  <p className="mb-0">{event?.eventStart}</p>
                  <p className="">
                    {month} {dd}, {yy}
                  </p>
                </div>
                <div className="py-3 border-bottom">
                  <h5 className='title-font fw-bold'><i className='bx me-2 bxs-flag-alt text-warning'></i>End Time:</h5>
                  <p className="mb-0">
                    {event?.eventEnd}
                  </p>
                  <p className="">
                    {month} {dd}, {yy}
                  </p>
                </div>
                <div className="py-3">
                  <h5 className='title-font fw-bold'><i className='bx me-2 bxs-map text-warning'></i>Location:</h5>
                  <p className="mb-0">
                    {event?.eventPlace}
                  </p>
                  <p className="">
                    {month} {dd}, {yy}
                  </p>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default EventDetail;