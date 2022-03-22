import React, { useEffect, useState } from 'react';
import Loading from "../../CommonSections/Loading/Loading";
import Header from "../../CommonSections/Header/Hearder";
import { Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
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
  const getBlood = () => {
    const searchKey = document.getElementById("blood").value;
    const searched = members.filter(member => member.blood.toLowerCase() === searchKey.toLowerCase())
    setBlood(searched)
    console.log(searchKey, members);
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
        <Row xs={1} md={2} lg={3} className="g-2">
          {
         !blood ? members?.map(member => <BloodCard key={member._id} member={member} />) : <>
            {
             blood.length > 0 ? blood?.map(member => <BloodCard key={member._id} member={member} />) : <h3 className="title-font text-danger">No result found...</h3>}
          </>
          }
        </Row>

        </Container>
      </section>
    </>
  );
};

export default FindBlood;