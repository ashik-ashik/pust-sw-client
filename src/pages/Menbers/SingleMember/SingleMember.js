import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';
import ShowMemberDetail from '../../CommonSections/ShowMemberDetail/ShowMemberDetail';

const SingleMember = () => {
  const {email} = useParams();
  const [member, setMember] = useState(null);
  useEffect(()=> {
    fetch(`http://localhost:5500/currentUser/${email}`)
    .then(res => res.json())
    .then(data => setMember(data))
  }, [email]);
  console.log(member)
  return (
    <>
     <Hearder /> 
     <section className="py-4">
        <Container>
            <ShowMemberDetail member={member} />
          
        </Container>
      </section>
    </>
  );
};

export default SingleMember;