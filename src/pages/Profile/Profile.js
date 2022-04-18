import React, { useEffect } from 'react';
import Hearder from '../CommonSections/Header/Hearder';
import { Container } from 'react-bootstrap';
import ShowMemberDetail from '../CommonSections/ShowMemberDetail/ShowMemberDetail';
import useMember from '../../hooks/useMembers/useMembers';

const Profile = () => {
  const {currentMember, setReLoad} = useMember();
  useEffect(()=>{
    document.title = currentMember ? currentMember?.fullName+ " Profile" : "Profile";
  }, [currentMember]);



  return (
    <>
    <Hearder />
      <section className="pb-4 add-profile-bg">
        <Container fluid>
          <ShowMemberDetail member={currentMember} setReLoad={setReLoad} />
          
        </Container>
      </section>
    </>
  );
};

export default Profile;