import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth/useAuth';
import Hearder from '../../CommonSections/Header/Hearder';
import MemberCard from './MemberCard/MemberCard';
import { useForm } from "react-hook-form";
import Loading from '../../CommonSections/Loading/Loading';

const Allmembers = () => {
  useEffect(()=>{
    document.title = "Members of Department of Social Work at PUST"
  }, []);
  const {user} = useAuth();
  const [users, setUsers] = useState(null);
  const [searchedUser, setSearched] = useState(null);
  // const history = 
  useEffect(()=> {
    fetch("https://warm-earth-97575.herokuapp.com/users")
    .then(res => res.json())
    .then(data => {
      setUsers(data)
    });
  }, [user]);
  
  const { register, handleSubmit, reset } = useForm();
  // let searchedData = '';
  const onSubmit = ({data}) => {
    const rearch = users.filter(u => (u.roll === data) || (u.reg === data) || (u.fullName.toLowerCase().includes(data.toLowerCase())))
    setSearched(rearch);
    reset();
  }

 
  if(!users && !searchedUser){
    return <>
      <Loading />
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
                      placeholder="search by roll or reg no. or name"
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

              <Row xs={1} md={2} lg={3} className="g-4">
                  {
                   !searchedUser ? users?.map(user => <MemberCard key={user?._id} userInfo={user} />) : <>
                   {
                     searchedUser?.map(user => <MemberCard key={user?._id} userInfo={user} />)
                   }
                   </>
                  }
                </Row>

            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Allmembers;