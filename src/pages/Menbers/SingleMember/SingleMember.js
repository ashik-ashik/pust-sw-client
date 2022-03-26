import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';
import ShowMemberDetail from '../../CommonSections/ShowMemberDetail/ShowMemberDetail';

const SingleMember = () => {
  const {id} = useParams();
  const [member, setMember] = useState(null);
  useEffect(()=>{
    document.title = member ? member?.fullName+ " Profile" : "Profile";
  }, [member])
  
  useEffect(()=> {
    fetch(`https://warm-earth-97575.herokuapp.com/getUser/${id}`)
    .then(res => res.json())
    .then(data => setMember(data))
  }, [id]);
  return (
    <>
     <Hearder /> 
     <section className="">
        <Container>
            <ShowMemberDetail member={member} />
          
        </Container>
      </section>
    </>
  );
};

export default SingleMember;