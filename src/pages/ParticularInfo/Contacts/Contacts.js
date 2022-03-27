import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import ContactCard from './ContactCard/ContactCard';

const Contacts = () => {
  useEffect(()=>{
    document.title = "Contacts Information of PUST-SW"
  },[])
  const members = useMember();
  const [searchedMembers, setSearchedMembers] = useState(null);


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
    if(searchedKey){
      const searched = members?.filter(member => member?.fullName?.toLowerCase()?.includes(searchedKey?.toLowerCase()));
      setSearchedMembers(searched);
    }
    else{
      setSearchedMembers(null);
    }
  }
  const showAll = () => {
    document.getElementById("filter-by-batch").reset();
    document.getElementById("filter-only-cr").reset();
    document.getElementById("filter-by-name").reset();
    setSearchedMembers(null);
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
              <Col>
                <p className='mb-1 small'>Filter by batch:</p>
                <form id="filter-by-batch" onSubmit={e => e.preventDefault()}>
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
                <form id="filter-only-cr" onSubmit={e => e.preventDefault()}>
                  <Form.Check 
                    onChange={filterByCR}
                    type="switch"
                    id="cr-only"
                    label="Only CR?"
                    className='small'
                  />
                </form>
              </Col>
              <Col xs="12" md="4" className='mt-2 mt-md-0'>
              <p className='mb-1 small'>Filter by name:</p>
                <form id='filter-by-name' onSubmit={e => e.preventDefault()}>
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
          {
            searchedMembers?.length > 0 && <>
              <div className="py-3">
                <h5 className="title-font">{searchedMembers?.length} result found</h5>
              </div>
            </>
          }
          <Row xs={1} md={2} lg={3} className="g-2">
          {
           (!searchedMembers) && members?.map(member => <ContactCard key={member?._id} member={member} />)
          }
          {
           ( !searchedMembers || (searchedMembers?.length > 0)) ? searchedMembers?.map(member => <ContactCard key={member?._id} member={member} />) : <>
            <h3 className="text-danger title-font">Result Not Found</h3>
           </>
          }
          </Row>
          {
            searchedMembers?.length > 0 && <>
              <div className="border-top pt-2 mt-3">
                <Button variant="success" size="sm" className='rounded-0 px-4' onClick={showAll}>Show All</Button>
              </div>
            </>
          }
        </Container>
      </section>
    </>
  );
};

export default Contacts;