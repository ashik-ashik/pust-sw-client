import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Hearder from '../CommonSections/Header/Hearder';

const Notices = () => {
  return (
    <>
      <Hearder />

      <Container >
        <h5>Notice</h5>
        <Link to="/publish-notice">Publish A Notice</Link>
      </Container>
    </>
  );
};

export default Notices;