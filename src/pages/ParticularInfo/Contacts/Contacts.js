import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import ContactCard from './ContactCard/ContactCard';

const Contacts = () => {
  useEffect(()=>{
    document.title = "Contacts Information of PUST-SW"
  },[])
  const [members, setMembers] = useState(null);
  const [searchedMembers, setSearchedMembers] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const res = await fetch("https://warm-earth-97575.herokuapp.com/users");
      const result = await res.json();
      setMembers(result);
    };
    load();
  }, []);

  const filterByBatch = (e) => {
    const searchedKey = (e.target.value);
    document.getElementById("filter-by-name").reset();
    document.getElementById("filter-only-cr").reset();
    const searched = members?.filter(member => member?.batchNo === searchedKey);
    setSearchedMembers(searched);
    if(searchedKey === "all"){
      setSearchedMembers(members);
    }
    
  };
  const filterByCR = (e) => {
    const onlyCR = e.target.checked;
    document.getElementById("filter-by-name").reset();
    document.getElementById("filter-by-batch").reset();
    if(onlyCR){
      const searched = members?.filter(member => member?.CRstatus === 'verified');
      setSearchedMembers(searched);
    }
    else{
      setSearchedMembers(null);
    }
  };

  const filterByName = e => {
    document.getElementById("filter-by-batch").reset();
    document.getElementById("filter-only-cr").reset();
    const searchedKey = e.target.value;
    const searched = members?.filter(member => member?.fullName?.toLowerCase().includes(searchedKey?.toLowerCase()));
    setSearchedMembers(searched);
  }

  if(!members){
    return <>
      <Loading />
    </>
  }
  return (
    <>
      <Hearder ></Hearder>
      <section className="pb-4">
          <div className="border-bottom py-4 mb-3 publish-notice">
            <Container className="text-white text-center">
              <h3 className="mb-0 styled-heading">Contacts :</h3>
              <span className="fitle-font">{members?.length} Contacts available</span>
            </Container>
          </div>
        <Container>
          <div className="py-3">
            <Row>
              <Col xs="12" className='mt-3 mt-md-0'>
                <p className='mb-1 small'>Filter by batch:</p>
                <form id="filter-by-batch">
                  <Form.Select size="sm" name="batch" onChange={filterByBatch} id="batch">
                    <option value='no'>Select Batch</option>
                    <option value='8'>8th</option>
                    <option value='9'>9th</option>
                    <option value='10'>10th</option>
                    <option value='11'>11th</option>
                    <option value='12'>12th</option>
                    <option value='13'>13th</option>
                    <option value='14'>14th</option>
                    <option value='all'>All Batch</option>
                  </Form.Select>
                </form>
              </Col>
              <Col>
                <p className="mb-1 small">CR only:</p>
                <form id="filter-only-cr">
                  <Form.Check 
                    onChange={filterByCR}
                    type="switch"
                    id="cr-only"
                    label="Only CR?"
                    className='small'
                  />
                </form>
              </Col>
              <Col>
              <p className='mb-1 small'>Filter by name:</p>
                <form id='filter-by-name'>
                  <Form.Control 
                    type="text"
                    placeholder='Search name'
                    onChange={filterByName}
                    size="sm"
                  />
                </form>
              </Col>
            </Row>
          </div>
          <Row xs={1} md={2} lg={3} className="g-2">
          {
           (!searchedMembers) && members?.map(member => <ContactCard key={member?._id} member={member} />)
          }
          {
           ( !searchedMembers || (searchedMembers?.length > 0)) ? searchedMembers?.map(member => <ContactCard key={member?._id} member={member} />) : <>
            <p className="text-danger title-font">Not Found</p>
           </>
          }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contacts;