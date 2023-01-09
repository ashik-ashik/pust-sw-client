import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import EventCard from '../EventCard/EventCard';

const Events = () => {
  useEffect(()=>{
    document.title = "Events of Department of XYZ at PUST";
  }, []);
  const [events, setEvents] = useState(null)

  useEffect(()=>{
      fetch(`https://pust-sw-server.vercel.app/events`)
      .then(res => res.json())
      .then(result => setEvents(result))    
  },[]);
  if(!events){
    return <>
      <Loading />
    </>
  }
  return (
    <>
      <Hearder />
      <section className="py-5 publish-notice">
        <Container>
          <h2 className="border-start border-3 border-warning display-5 fw-bold text-white ps-3">Events</h2>
        </Container>
      </section>
      <section className="py-4">
        <Container>
          {
            events?.map(event => <EventCard key={event?._id} event={event} />)
          }
        </Container>
      </section>
    </>
  );
};

export default Events;