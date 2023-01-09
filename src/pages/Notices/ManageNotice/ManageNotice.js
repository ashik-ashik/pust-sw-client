import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../../CommonSections/Loading/Loading';
import ManageNoticeCard from './ManageNoticeCard/ManageNoticeCard';

const ManageNotice = () => {
  const {user} = useAuth();
  const [member, setMember] = useState(null);
  const [notices, setNotices] = useState(null);

  useEffect(()=>{
    document.title = "Manage Notices";
  }, []);

  useEffect (()=>{
    fetch(`https://pust-sw-server.vercel.app/currentUser/${user?.email}`)
      .then(res => res.json())
      .then(result => setMember(result))
  }, [user]);


  useEffect(()=>{
      fetch('https://pust-sw-server.vercel.app/notices')
      .then(res => res.json())
      .then(result => setNotices(result))
    
  }, []);

  if(!notices){
    return <>
      <Loading />
    </>
  }
  return (
    <>
      <section className='py-4 publish-notice'>
        <Container>
          <h2 className="display-5 border-start text-light styled-heading mb-4 border-3 border-warning ps-2">Manage Notice:</h2>
          {
            notices?.map(notice => <ManageNoticeCard key={notice?._id} notice={notice} member={member} />)
          }
        </Container>
      </section>
    </>
  );
};

export default ManageNotice;