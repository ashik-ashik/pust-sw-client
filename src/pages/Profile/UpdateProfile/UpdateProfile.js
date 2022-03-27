import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';

const UpdateProfile = () => {
  const {id} = useParams();
  const [user, setUser]= useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/getUser/${id}`)
    .then(res => res.json())
    .then(data => setUser(data))
  }, [id]);

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    axios.put(`https://warm-earth-97575.herokuapp.com/add-social/${id}`, data)
    .then(res => {
      if(res.status === 200){
        navigate("/profile");
      }
    })
  }
  return (

    <>
    <Hearder />
      <section className="py-2">
        <Container>
          <h4 className="text-success styled-heading">Hey! {user?.fullName }</h4>
          <p>
          Hello <span className='text-success'>{user?.fullName}</span>! You can customize your profile. So that anyone can find you easier. Let's add your social media links.
          </p>


          <Form  onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className="mb-3">
              <Form.Label> <i className="bx bxl-messenger"></i> Messenter Link</Form.Label>
              <Form.Control {...register("messengerLink")} type="url" placeholder='Add your messenger link' />                
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> <i className="bx bxl-facebook"></i> FaceBook Link</Form.Label>
              <Form.Control {...register("facebookLink")} type="url" placeholder='Add your facebook link' />                
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> <i className="bx bxl-twitter"></i> Twitter Link</Form.Label>
              <Form.Control {...register("twitterLink")} type="url" placeholder='Add your twitter link'/>                
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> <i className="bx bxl-instagram"></i> Instagram Link</Form.Label>
              <Form.Control {...register("instagramLink")} type="url" placeholder='Add your instagram link'/>                
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> <i className="bx bxl-linkedin"></i> Linkedin Link</Form.Label>
              <Form.Control {...register("linkedinLink")} type="url" placeholder='Add your linkedin link'/>                
            </Form.Group>

            <Button variant="success" className='shadow-none rounded-1 px-5' type="submit">
              Save Change
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default UpdateProfile;