import React, { useEffect, useState } from 'react';
import Hearder from '../CommonSections/Header/Hearder';
import useAuth from '../../hooks/useAuth/useAuth';
import { Button, Container } from 'react-bootstrap';
import ShowMemberDetail from '../CommonSections/ShowMemberDetail/ShowMemberDetail';

const Profile = () => {
  const {user} = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    fetch(`http://localhost:5500/currentUser/${user?.email}`)
    .then(res => res.json())
    .then(data => setCurrentUser(data))
  }, [user]);
  console.log(currentUser)
  return (
    <>
    <Hearder />
      <section className="py-4">
        <Container>
          <ShowMemberDetail member={currentUser} />
          
        </Container>
      </section>
    </>
  );
};

export default Profile;