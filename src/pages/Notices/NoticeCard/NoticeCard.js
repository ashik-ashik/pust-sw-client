import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NoticeCard = ({notice}) => {
  const navigate = useNavigate();
  const singleNotice = (id) => {
    navigate(`/notice/${id}`);
  }
  console.log(notice)
  return (
    <>
      <Col>
        <Card className="text-start">
          <Card.Header className="notice-head py-3 text-light">
            <small className="small title-font">Published By: </small>
          <span className="fw-bold"> {notice?.publisherName}</span>
            <sup className="cr-badge ms-1 fw-normal">{notice?.isFromCR ? "CR" : "AD"}</sup>
          </Card.Header>
          <Card.Body>
            <Card.Title className="fw-bold title-font fs-2">{notice?.noticeTitle}</Card.Title>
            <Card.Text style={{textAlign:"justify"}}>
                {notice?.noticeBody?.slice(0,150)}... <br />
                <Button onClick={()=> singleNotice(notice?._id)} variant='success' className='small rounded-0' size="sm">Read More</Button>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-light bg-dark title-font"><small className="small">Published on : </small> {notice?.publishDate}</Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default NoticeCard;