import React from 'react';
import { Accordion, Col, Container, Row } from 'react-bootstrap';
import Hearder from '../CommonSections/Header/Hearder';

const Faqs = () => {
  return (
    <>
      <Hearder />
      <section className="py-4">
        <Container>
          <Row className='g-2'>
            <Col md="6">
              <Accordion className='faq-accordion'>
                <Accordion.Item eventKey="0" className='mb-2'>
                  <Accordion.Header>Is there my info secure?</Accordion.Header>
                  <Accordion.Body>
                    Yes! Here all of your information will safe and secure.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col md="6">
              <Accordion className='faq-accordion'>
                <Accordion.Item eventKey="0" className='mb-2'>
                  <Accordion.Header>How can it will help me?</Accordion.Header>
                  <Accordion.Body>
                    Here you will save some of your basic informaion such as email, phone number, your current mess address/ where you are in, your blood group. Similarly others will do same. So, here you can easily find anyone's detail, find one's phone number/contact info, connect with others through social media, you also can know better about others who are also member(student) of Department of Social Work at PUST. Thus it will help you.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Faqs;