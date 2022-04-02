import React, { useEffect, useState } from 'react';
import Hearder from '../CommonSections/Header/Hearder';
import useAuth from '../../hooks/useAuth/useAuth';
import { Container } from 'react-bootstrap';
import ShowMemberDetail from '../CommonSections/ShowMemberDetail/ShowMemberDetail';

const Profile = () => {
  const {user} = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    document.title = currentUser ? currentUser?.fullName+ " Profile" : "Profile";
  }, [currentUser]);
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
    .then(res => res.json())
    .then(data => setCurrentUser(data))
  }, [user]);


  return (
    <>
    <Hearder />
      <section className="pb-4">
        <Container fluid>
          <ShowMemberDetail member={currentUser} />
          
        </Container>
      </section>
    </>
  );
};

export default Profile;