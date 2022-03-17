import React, { useEffect, useState } from 'react';
import Loading from "../../CommonSections/Loading/Loading";
import Header from "../../CommonSections/Header/Hearder";
import { Container, Form, FormSelect, Row } from 'react-bootstrap';
import BloodCard from './BloodCard/BloodCard';

const FindBlood = () => {
  useEffect(()=>{
    document.title = "Find Blood Group"
  },[])
  const [members, setMembers] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const res = await fetch("https://warm-earth-97575.herokuapp.com/users");
      const result = await res.json();
      setMembers(result);
    };
    load();
  }, []);

  // search blood group
  const [blood, setBlood] = useState(null);
  const getBlood = e => {
    setBlood(e.target.value);
  }
  
  if(!members){
    return <>
      <Loading />
    </>
  }
  return (
    <>
      <Header />
      <section className="py-4">
        <Container>
        <h3 className="styled-heading text-danger mb-4">Find Blood Group:</h3>
        <div className="py-3">
          <p>Find a specific blood group:</p>
          <Form>
            <Form.Select size="sm" onChange={getBlood} name="blood-group" id="">
              <option value="">Select Group</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="o+">O+</option>
              <option value="o-">O-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
            </Form.Select>
          </Form>
        </div>
        <Row xs={1} md={2} lg={3} className="g-4">
          {
             members?.map(member => <BloodCard key={member._id} member={member} />) 
          }
        </Row>

        </Container>
      </section>
    </>
  );
};

export default FindBlood;