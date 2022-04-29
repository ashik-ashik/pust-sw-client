import React, { useEffect, useState } from 'react';
import Loading from "../../CommonSections/Loading/Loading";
import Header from "../../CommonSections/Header/Hearder";
import { Container, Form, InputGroup, Row, Button, Accordion } from 'react-bootstrap';
import BloodCard from './BloodCard/BloodCard';
import useMember from '../../../hooks/useMembers/useMembers';
import { useNavigate } from 'react-router-dom';

const FindBlood = () => {
  useEffect(()=>{
    document.title = "Find Blood Group"
  },[])
  const {members, currentMember} = useMember();
  const navigate = useNavigate();
  if(!currentMember?.isVerified){
    navigate("/verify-account")
  }
  const allMembers = members?.filter(memb => memb.roll && memb.email !== 'socialwork.pust2008@gmail.com')

  // search blood group
  const [blood, setBlood] = useState(null);
  const getBlood = () => {
    const searchKey = document.getElementById("blood").value;
    const searched = allMembers.filter(member => member.blood.toLowerCase() === searchKey.toLowerCase())
    setBlood(searched)
  }

  
  if(!allMembers || !currentMember){
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
            <InputGroup size="sm" className="mb-3">
              <Form.Select size="sm" name="blood-group" id="blood">
              <option value="none">Select Group</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="o+">O+</option>
              <option value="o-">O-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
            </Form.Select>
            <Button onClick={getBlood} variant="success" className="px-4">
              Search
            </Button>
              {/* <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" /> */}
            </InputGroup>          
          </Form>
        </div>
        <Accordion className='blood-accordion'>

        <Row xs={1} md={2} lg={3} className="g-2">
          {
         !blood ? allMembers?.map((member, index) => <BloodCard key={member._id} member={member} index={index} />) : <>
            {
             blood.length > 0 ? blood?.map((member, index) => <BloodCard key={member._id} member={member} index={index} />) : <h3 className="title-font text-danger">No result found...</h3>}
          </>
          }
        </Row>
        </Accordion>
        </Container>
      </section>
    </>
  );
};

export default FindBlood;