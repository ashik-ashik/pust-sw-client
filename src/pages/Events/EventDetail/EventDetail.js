import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';

const EventDetail = () => {
 
  const [event, setEvent] = useState(null);
  const {id} = useParams();
  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/event/${id}`);
      const result = await res.json();
      setEvent(result);
    };
    load();
  },[id]);
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