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
    const load = async ()=> {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`);
      const result = await res.json();
      setMember(result);
    }
    load();
  }, [user]);


  useEffect(()=>{
    const load = async ()=>{
      const res = await fetch('https://warm-earth-97575.herokuapp.com/notices');
      const result = await res.json();
      setNotices(result)
    }
    load();
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