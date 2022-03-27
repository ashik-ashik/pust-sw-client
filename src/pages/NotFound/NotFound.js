import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Hearder from '../CommonSections/Header/Hearder';

const NotFound = () => {
  useEffect(()=>{
    document.title = "Page not found";
  }, []);
  return (
    <>
    <Hearder />
      <section className="not-found-page text-center bg-dark py-5 border-top ">
        <Container >
          <img src="https://i.ibb.co/TKndJCs/not-found.png" alt="" className="img-fluid" />
          <h3 className="mt-4 text-light styled-heading">OPPS! Page Not Found.</h3>
          <p className="small text-danger">
            The page you are looking for are not found.
          </p>
          <Link to='/'>
            <Button variant="danger" className='rounded-pill px-4'>Back to Home</Button>
          </Link>
        </Container>
      </section>
    </>
  );
};

export default NotFound;