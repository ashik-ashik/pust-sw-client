import React, { useEffect, useState, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import { useForm } from "react-hook-form";
import axios from 'axios';
import JoditEditor from "jodit-react";

const PublishEvent = () => {
  useEffect(()=>{
    document.title = "Publish a new Event";
  }, []);

  const {user} = useAuth();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  useEffect (()=>{
    const load = async ()=> {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`);
      const result = await res.json();
      setMember(result);
    }
    load();
  }, [user]);

  const editor = useRef(null)
  const [content, setContent] = useState('');
  const config = {
    buttons : ["bold", "underline", "italic", "ol", "ul", "link", "brush"]
  };



  // save event to database

  const { register, handleSubmit } = useForm();
  const publishEvent = event => {
    event.publisherName = member.fullName;
    event.publisherEmail = user.email;


      // make the date in 12 hours formate
  const startH = parseInt(event?.eventStart?.slice(0,2));
  const startM = parseInt(event?.eventStart?.slice(3,5));
  const endH = parseInt(event?.eventEnd?.slice(0,2));
  const endM = event?.eventEnd?.slice(3,5);
  let formate12Start = startH;
  let formate12End = endH;
  let startAMPM = "AM";
  let endAMPM = "AM";
  if(startH > 12){
    formate12Start = startH -12;
    startAMPM="PM"
  }
  if(endH > 12){
    formate12End = endH -12;
    endAMPM = "PM"
  }
  const startTime = formate12Start + ":" + startM + startAMPM;
  const endTime = formate12End + ":" + endM + endAMPM;
  
  event.eventStart = startTime;
  event.eventEnd = endTime;
  event.eventContent = content;


    axios.post(`https://warm-earth-97575.herokuapp.com/publish-event`, event)
    .then(res => {
      if(res.status === 200){
        navigate('/events')
      }
    })
    console.log(event)
  };

  return (
    <>
      <section className="py-4 publish-notice">
      <Container className='pt-4 pb-5'>
        <h2 className="border-start border-3 border-warning display-5 fw-bold text-white ps-3">Event</h2>
      </Container>
      <Container className='border py-3'>
          <h3 className='styled-heading text-light'>Publish A New Event:</h3>

          <Form onSubmit={handleSubmit(publishEvent)}>
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label className='small text-light'>Event Title:</Form.Label>
              <Form.Control className='shadow-none transparent-field-event' {...register("eventTitle", {required : true})} type="text" placeholder="Event title" />
            </Form.Group>

            <Row>
              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>Event Date:</Form.Label>
                <Form.Control className='shadow-none transparent-field-event' {...register("eventDate", {required : true})} type="date" placeholder="Event date" />
              </Form.Group>

              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>Event Place:</Form.Label>
                <Form.Control className='shadow-none transparent-field-event' {...register("eventPlace", {required : true})} type="text" placeholder="Event Place" />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>Start Time:</Form.Label>
                <Form.Control className='shadow-none transparent-field-event' {...register("eventStart", {required : true})} type="time" placeholder="Event start time" />
              </Form.Group>

              <Form.Group md="6" as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label className='small text-light'>End Time:</Form.Label>
                <Form.Control className='shadow-none transparent-field-event' {...register("eventEnd", {required : true})} type="time" placeholder="Event end time" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='small text-light'>Event Description:</Form.Label>
              <Form.Control className='shadow-none transparent-field-event' as="textarea" {...register("eventBody", {required : true})} rows={3} placeholder="Write Event Body" />
            </Form.Group>
            <div className="py-2">
              <p className="small text-light">Event Content/Events</p>
              <div className="transparent-field-event">
                <JoditEditor 
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={newContent => setContent(newContent)}
                  tabIndex={1} // tabIndex of textarea
                  />
              </div>
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='small text-light'>Event Image Link:</Form.Label>
              <Form.Control className='shadow-none transparent-field-event' {...register("eventImage", {required : true})} type="text" placeholder="Event image link" />
            </Form.Group>

            <Button variant="success" className='px-4 rounded-0' type="submit">
              Publish
            </Button>
          </Form>

        </Container>
      </section>
    </>
  );
};

export default PublishEvent;