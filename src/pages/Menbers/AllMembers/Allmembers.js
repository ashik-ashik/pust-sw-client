import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Hearder from '../../CommonSections/Header/Hearder';
import MemberCard from './MemberCard/MemberCard';
import { useForm } from "react-hook-form";

const Allmembers = () => {
  const {user, setUnload, isUnload} = useAuth();
  const [users, setUsers] = useState(null);
  const [data , setData] = useState('');
  // const history = 
  useEffect(()=> {
    fetch("http://localhost:5500/users")
    .then(res => res.json())
    .then(data => {
      setUsers(data)
      setUnload(false);
    });
  }, [user]);
  
  const { register, handleSubmit, reset } = useForm();
  // let searchedData = '';
  const onSubmit = ({data}) => {
    setData(data);
    reset();
  }
  useEffect(()=> {
    fetch(`http://localhost:5500/searchMember/${data}`)
    .then(res => res.json())
    .then(data => {
      data.searched = true;
      setUsers([data]);
      setUnload(false);
    })

  }, [data]);

  // go back from shearched result
  const goBack = () => {
    window.location.reload()  
  }
  if(isUnload){
    return <>
      <div className="reloading">
        <img src="https://i.ibb.co/thLH6tv/reloading.gif" alt="" />
      </div>
    </>
  }

  return (
    <>
      <Hearder />

      <section className="allMemver-header">
        <Container>
        <h3 className="styled-heading text-white fs-2">Members</h3>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          
          <Row>
            <Col></Col>
            <Col md="10">  
              <div className="member-search m4-2">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <h5>You can find member:</h5>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="search by roll or reg no."
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2" 
                      {...register("data", {required: true})}
                    />
                    <Button variant="success" className='shadow-none px-4 ' type="submit">
                      Search
                    </Button>
                  </InputGroup>
                </Form>
              </div>
              {
                users?.find(user => user.searched) && <>
                  <div className="mt-4">
                    <h5 className="styled-heading">Search Result:</h5>
                  </div>
                </>
              }         
              <Row xs={1} md={2} lg={3} className="g-4">
                  {
                    users?.map(user => <MemberCard key={user?._id} userInfo={user} />)
                  }
                </Row>

                  {
                    users?.find(user => user.searched) && <>
                      <div className="mt-4">
                        <Button onClick={goBack} className='px-4 shadow-none rounded-0' variant="primary" size="sm">Back</Button>
                      </div>
                    </>
                  }
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Allmembers;