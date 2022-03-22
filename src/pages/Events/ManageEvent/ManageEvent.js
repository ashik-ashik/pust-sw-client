import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../../CommonSections/Loading/Loading';
import DashboardHeader from '../../Dashboard/DashboardHeader/DashboardHeader';
import EventCard from '../EventCard/EventCard';

const ManageEvent = () => {
  useEffect(()=>{
    document.title = "Manage Events"
  },[]);
  const {user} = useAuth();
  const [currentUser, setCurrentUser]=useState(null);
  useEffect(()=> {
    fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
    .then(res => res.json())
    .then(data => setCurrentUser(data));
  }, [user]);

  const [events, setEvents ] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/events`);
      const result = await res.json();
      setEvents(result)
    };
    load();
  },[]);
  if(!currentUser){
    return <>
      <Loading />
    </>
  }
  return (
    <>
      <DashboardHeader />
      <section className="py-5 publish-notice">
        <Container>
          <h2 className="text-white border-start border-3 border-warning ps-3">Manage Events</h2>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          {
            events?.map(event => <EventCard key={event?._id} event={event} user={currentUser?.role} />)
          }
        </Container>
      </section>
      
    </>
  );
};

export default ManageEvent;