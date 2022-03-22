import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../../Dashboard/DashboardHeader/DashboardHeader';
import { useForm } from "react-hook-form";
import Loading from '../../CommonSections/Loading/Loading';
import axios from 'axios';

const EditEvent = () => {
  const {id} = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/event/${id}`);
      const result = await res.json();
      setEvent(result)
    };
    load();
  }, [id]);

  const { register, handleSubmit } = useForm();
  const editEvent = data => {
    axios.put(`https://warm-earth-97575.herokuapp.com/update-event/${id}`, data)
    .then(res => {
      navigate("/manage-events")
    })
  };

  useEffect(()=>{
    document.title = `Edit Event- ${event && event?.eventTitle}`
  },[event])

  console.log(event);
  if(!event){
    return <Loading />
  }
  return (
    <>
      <DashboardHeader />
      <section className="py-4 publish-notice">
      <Container className='pt-4 pb-5'>
        <h2 className="border-start border-3 border-warning display-5 fw-bold text-white ps-3">Event</h2>
      </Container>
      <Container className='border py-3'>
          <h3 className='styled-heading text-light'>Publish A New Event:</h3>

          <Form onSubmit={handleSubmit(editEvent)}>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label className='small text-light'>Event Title:</Form.Label>
              <Form.Control className='shadow-none transparent-field text-light' defaultValue={event?.eventTitle} autoFocus {...register("eventTitle", {required : true})} type="text" placeholder="Event title" />
            </Form.Group>

            <Row>
              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>Event Date:</Form.Label>
                <Form.Control className='shadow-none transparent-field text-light' defaultValue={event?.eventDate} autoFocus {...register("eventDate", {required : true})} type="text" placeholder="Event date" />
              </Form.Group>

              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>Event Place:</Form.Label>
                <Form.Control className='shadow-none transparent-field text-light' defaultValue={event?.eventPlace} autoFocus {...register("eventPlace", {required : true})} type="text" placeholder="Event Place" />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>Start Time:</Form.Label>
                <Form.Control className='shadow-none transparent-field text-white' defaultValue={event?.eventStart} autoFocus {...register("eventStart", {required : true})} type="text" placeholder="Event start time" />
              </Form.Group>

              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>End Time:</Form.Label>
                <Form.Control className='shadow-none transparent-field text-white' defaultValue={event?.eventEnd} autoFocus {...register("eventEnd", {required : true})} type="text" placeholder="Event end time" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='small text-light'>Event Description:</Form.Label>
              <Form.Control className='shadow-none transparent-field text-light' defaultValue={event?.eventBody} autoFocus as="textarea" {...register("eventBody", {required : true})} rows={3} placeholder="Write Event Body" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='small text-light'>Event Content:</Form.Label>
              <p className="small text-white">
                Write the event content here. And write Each content separate by double pype (||) sign.
              </p>
              <Form.Control className='shadow-none transparent-field text-light' defaultValue={event?.eventContent} autoFocus as="textarea" {...register("eventContent", {required : true})} rows={3} placeholder="Write Event Body" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='small text-light'>Event Image Link:</Form.Label>
              <Form.Control className='shadow-none transparent-field text-light' defaultValue={event?.eventImage} autoFocus {...register("eventImage", {required : true})} type="text" placeholder="Event image link" />
            </Form.Group>

            <Button variant="success" className='px-4 rounded-0' type="submit">
              Save
            </Button>
          </Form>

        </Container>
      </section>
    </>
  );
};

export default EditEvent;