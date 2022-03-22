import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const EventCard = ({event, user}) => {
  let eventDate = [];
  eventDate = event.eventDate.split("-");
  const months = ['',"Jan", "Feb","Mar","April","May","June","July",'Aug','Sep',"Oct","Nov","Dec"]

  const navigate = useNavigate();

  // delete modal control
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  
  const deleteModal = () => setShow(true);
  const doDelete = id => {
    axios.delete(`https://warm-earth-97575.herokuapp.com/event-delete/${id}`)
    .then(res => {
      window.location.reload();
    })
  };

  const doEdit = id => {
    navigate(`/event-edit/${id}`)
  }
  
  return (
    <>
    <div className=' shadow-sm mb-4'>
      <Row className='pt-3 px-3 px-md-0 g-2 align-items-center'>
        <Col md="3" lg="2">
          <div className="text-lg-center text-start">
            <h2 className="display-5 fw-bold mb-0 text-danger">
              {eventDate[2]} 
            </h2>
            <span className='fw-bold text-success'>{months[parseInt(eventDate[1])]}, {eventDate[0]}</span>
            </div>
        </Col>
        <Col md="5" lg="6">
          <h3 className="m-0 p-0"><Link className='title-font event-title' to={`/event/${event?._id}`}>{event?.eventTitle}</Link></h3>
          <div className="py-2">
            <span className="text-muted small me-2"><i className="bx bx-time me-1"></i>{event?.eventStart} - {event?.eventEnd}</span>
            <span className="text-muted small"><i className="bx bxs-map me-1"></i>{event?.eventPlace}</span>
          </div>
          <p className="mb-1">
            {event?.eventBody?.split(" ").slice(0,30).join(" ")}...
          </p>
        </Col>
        <Col md="4" lg="4">
          <Link className='title-font event-title' to={`/event/${event?._id}`}>
            <img src={event?.eventImage} alt="" className="event-card-img" />
          </Link>
        </Col>
      </Row>
      {
        user === "admin" && <>
          <div className="py-3 mt-2 border-top text-center">
            <Button onClick={deleteModal} variant="danger" className='px-4 rounded-0 me-2' size="sm"><i className="bx bx-trash me-2"></i>Delete</Button>
            <Button onClick={()=> doEdit(event?._id)} variant="success" className='px-4 rounded-0' size="sm"><i className="bx bx-edit me-2"></i>Edit</Button>
          </div>
        </>
      }
    </div>

      {/* delete modal */}
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><h3 className='fs-5 text-center text-danger'>Delete</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="display-2 bx bx-trash text-danger"></i>
            <h5 className='m-0 fw-bold'>Are you Sure?</h5>
            <p className="small"><span className="text-danger">{event?.eventTitle}</span> Event</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="danger" onClick={() => doDelete(event?._id)}>
            Delete
          </Button>
          <Button size="sm" variant="dark" onClick={handleClose}>
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default EventCard;