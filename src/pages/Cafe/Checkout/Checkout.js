import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';

const Checkout = () => {
  useEffect(()=>{document.title="Checkout Order"}, [])
  return (
    <>
      <Hearder />
      <section className="py-4">
        <Container>
          <h5>Checkout:</h5>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Checkout;