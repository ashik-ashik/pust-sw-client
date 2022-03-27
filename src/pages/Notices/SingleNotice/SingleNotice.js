import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';

const SingleNotice = () => {

    const {id} = useParams();
    const [notice, setNotice] = useState(null);
    useEffect(()=>{
      const load = async () => {
        const res = await fetch(`https://warm-earth-97575.herokuapp.com/notice/${id}`);
        const result = await res.json();
        setNotice(result);
      };
      load();
    },[id]);

    useEffect(()=>{
      document.title = notice?.noticeTitle || "Notice";
    }, [notice]);

    if(!notice){
      return <>
        <Loading />
      </>
    }
  return (
    <>
      <Hearder />
      <section className='py-4 publish-notice'>
        <Container className="border border-light py-3">
        <Card className="text-start border-0">
          <Card.Header className="notice-head py-3 text-light">
            <small className="small title-font">Published By: </small>
          <span className="fw-bold"> {notice?.publisherName}</span>
            <sup className="cr-badge ms-1 fw-normal">{notice.isFromCR ? "CR" : "AD"}</sup>
          </Card.Header>
          <Card.Body>
            <Card.Title className="fw-bold title-font fs-2">{notice?.noticeTitle}</Card.Title>
            <Card.Text style={{textAlign:"justify"}}>
                {notice?.noticeBody}
                
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-light bg-dark title-font"><small className="small">Published on : </small> {notice?.publishDate}</Card.Footer>
        </Card>
        </Container>
      </section>
    </>
  );
};

export default SingleNotice;