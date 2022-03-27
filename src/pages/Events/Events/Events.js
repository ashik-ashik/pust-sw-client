import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import EventCard from '../EventCard/EventCard';

const Events = () => {
  useEffect(()=>{
    document.title = "Events of Department of Social Work at PUST";
  }, []);
  const [events, setEvents] = useState(null)

  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/events`);
      const result = await res.json();
      setEvents(result)
    }
    load();
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