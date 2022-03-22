import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Hearder from '../../CommonSections/Header/Hearder';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PublishNotice = () => {
  useEffect(()=>{
    document.title = "Publish a Notice";
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

  const { register, handleSubmit } = useForm();
  const publishNotice = notice => {
    notice.publisherName = member.fullName;
    notice.publisherEmail = user.email;
    notice.isFromCR = member.isCR;
    axios.post(`https://warm-earth-97575.herokuapp.com/publish-notice`, notice)
    .then(res => {
      if(res.status === 200){
        navigate('/notice-board')
      }
    })
  };

  return (
    <>
      <Hearder />
      <section className="py-4 publish-notice">
        <Container className='border py-3'>
          <h3 className='styled-heading text-light'>Publish A Notice:</h3>

          <Form onSubmit={handleSubmit(publishNotice)}>
            {/* <Row xs={1} md={2}>
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label><span className='small text-light'>Publisher Name:</span></Form.Label>
                <Form.Control className='shadow-none' {...register("fullName",  {required: true})} type="text" placeholder="Publisher name" value={member?.fullName} readOnly />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formBasicPassword">
                <Form.Label className='small text-light'>Publisher Email</Form.Label>
                <Form.Control className='shadow-none' {...register("email")} autoFocus type="email"  value={member?.email} placeholder="Publisher email" readOnly />
              </Form.Group>
            </Row> */}

            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
              <Form.Label className='small text-light'>Notice Title:</Form.Label>
              <Form.Control className='shadow-none transparent-field text-light' {...register("noticeTitle")} type="text" placeholder="Notice title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='small text-light'>Notice Body</Form.Label>
              <Form.Control className='shadow-none transparent-field text-light' as="textarea" {...register("noticeBody")} rows={3} placeholder="Write Notice" />
            </Form.Group>

            <Button variant="success" type="submit">
              Publish
            </Button>
          </Form>

        </Container>
      </section>
    </>
  );
};

export default PublishNotice;