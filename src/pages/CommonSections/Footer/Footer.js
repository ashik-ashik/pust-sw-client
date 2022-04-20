import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const Footer = () => {
  const {currentMember} = useMember();
  const isSocialWork = currentMember?.roll?.slice(2,4) === '15';

  const containerStyle = {
    width: '100%',
    height: '400px'
  };
  
  const center = {
    lat: 24.014136,
    lng: 89.279313
  };


  return (
    <>
      <footer className='py-3 bg-light'>
          {
            currentMember && !isSocialWork && <>
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
              <LoadScript
                googleMapsApiKey={process.env.MAP_API_KEY}
              >
                <GoogleMap
                style={{zIndex:'-1'}}
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={17}
                >
                  { /* Child components, such as markers, info windows, etc. */ }
                  <></>
                </GoogleMap>
              </LoadScript>
            </Col>
          </Row>
        </Container>
      </footer>
        <p className="small d-block text-center text-white bg-dark m-0 py-2">Wishes to Depatrment of Social Work</p>
    </>
  );
};

export default Footer;