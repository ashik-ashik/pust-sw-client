import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import ContactCard from './ContactCard/ContactCard';

const Contacts = () => {
  useEffect(()=>{
    document.title = "Contacts Information of PUST-SW"
  },[])
  const [members, setMembers] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const res = await fetch("https://warm-earth-97575.herokuapp.com/users");
      const result = await res.json();
      setMembers(result);
    };
    load();
  }, []);

  if(!members){
    return <>
      <Loading />
    </>
  }
  return (
    <>
      <Hearder ></Hearder>
      <section className="py-4">
        <Container>
          <h3 className="mb-4 text-success styled-heading">Contacts:</h3>
          <Row xs={1} md={2} lg={3} className="g-3">
          {
            members?.map(member => <ContactCard key={member?._id} member={member} />)
          }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contacts;