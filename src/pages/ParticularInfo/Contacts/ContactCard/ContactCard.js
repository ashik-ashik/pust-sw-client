import React from 'react';
import { Col } from 'react-bootstrap';

const ContactCard = ({member}) => {
  const profilePic= `data:image/png;base64,${member?.profilePic}`;
  return (
    <>
      <Col>
        <div className="d-flex align-items-center justify-content-between contact-card p-2 text-white">
          <div className="main-info d-flex align-items-center justify-content-center">
            <img src={profilePic} alt="" className="contact-img" />
            <div className='ms-2'>
            <h4 className="title-font mb-0">{member?.fullName}</h4>
            <p className='mb-0 text-muted' style={{fontSize:'13px'}}>Phone: {member?.phone}</p>
            </div>
          </div>
          <div className="call-icon">
            <a className='card-call' href={`tel:${member?.phone}`}>
              <i className="bx bxs-phone fs-4 text-white"></i>
            </a>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ContactCard;