import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import Hearder from '../CommonSections/Header/Hearder';
import Loading from "../CommonSections/Loading/Loading";
import NoticeCard from './NoticeCard/NoticeCard';

const Notices = () => {
  const {user} = useAuth();
  const [member, setMember] = useState(null);
  const [notices, setNotices] = useState(null);


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
  }, [])

  if(!notices){
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <>
      <Hearder />

      <section className="py-4 publish-notice">
        <Container>
          <h2 className="styled-heading text-light mb-4">Notice Board:</h2>
          {
            ((member?.CRstatus === "verified") || (member?.role === "admin")) && <Link className='py-2 px-4 bg-warning text-light' to="/publish-notice"><i className='bx bx-plus me-1'></i>Publish A Notice</Link>
          }
          <Row xs={1} md={1} lg={2} className='g-4 mt-3'>
            {
              notices?.map(notice => <NoticeCard key={notice?._id} notice={notice} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Notices;