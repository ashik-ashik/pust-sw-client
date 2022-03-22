import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <footer className='py-3 bg-light'>
        <Container>
          <div className="footer-links">
            <ul className="list-unstyled d-flex mb-0">
              <li className='me-2 pe-2 border-end border-2'><a className='footer-link ' href="/mission-vision">Mission & Vision</a></li>
              {/* <li className='me-2'><a className='footer-link ' href="/about-us">About Us</a></li> */}
              <li className='me-2 pe-2 border-end border-2'><a className='footer-link ' href="/faqs">FAQs</a></li>
            </ul>
          </div>
        </Container>
      </footer>
        <p className="small text-center text-white bg-dark m-0 py-2">Wishes to Depatrment of Social Work</p>
    </>
  );
};

export default Footer;