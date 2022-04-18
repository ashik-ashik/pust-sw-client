import React from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';

const Footer = () => {
  const {currentMember} = useMember();
  const isSocialWork = currentMember?.roll?.slice(2,4) === '15';
  return (
    <>
      <footer className='py-3 bg-light'>
          {
            !isSocialWork && <>
              <div className="p-4 bg-danger text-white" style={{zIndex:"0 !important"}}>
                <Container>
                  <h3 className='title-font border-bottom pb-2'>We have recognized that, You are not a member/Student of Department of Social Work at PUST.</h3>
                  
                  <p>
                    So you cannot enjoy some of features. Because There is some important personal imformation. These should not be accessable to others.
                  </p>
                </Container>
              </div>
            </>
          }
        <Container>
          <div className="footer-links">
            <ul className="list-unstyled d-flex mb-0">
              <li className='me-2 pe-2 border-end border-2'><a className='footer-link ' href="/mission-vision">Mission & Vision</a></li>
              {/* <li className='me-2'><a className='footer-link ' href="/about-us">About Us</a></li> */}
              <li className='me-2 pe-2 border-end border-2'><a className='footer-link ' href="/faqs">FAQs</a></li>
            </ul>
          </div>
          <Row className='align-items-center'>
            <Col>
              <h3 className="title- font">Location:</h3>
              <p><i className='bx bxs-institution me-2'></i><small>Pabna University of Science and Technology,</small></p>
              <p><i className='bx bx-map-alt me-2' ></i><small>Razapur, Pabna Sadar, Pabna-6600,</small></p>
              <p><i className='bx bx-street-view me-2' ></i><small>South side of Dhaka-Pabna Highway.</small></p>
            </Col>
            <Col md='8'>
              <iframe title='University Location Map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3644.507737452127!2d89.27752541435366!3d24.013154184606048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe84f0ec23a72b%3A0x775d6cd53cbdad8b!2sPabna%20University%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sbd!4v1649927840311!5m2!1sen!2sbd" width="100%" height="300" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Col>
          </Row>
        </Container>
      </footer>
        <p className="small d-block text-center text-white bg-dark m-0 py-2">Wishes to Depatrment of Social Work</p>
    </>
  );
};

export default Footer;