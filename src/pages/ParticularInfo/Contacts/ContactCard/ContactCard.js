import React from 'react';
import { Accordion, Col, Table } from 'react-bootstrap';

const ContactCard = ({member}) => {
  let profilePic = "";  
  if(!member?.profilePic.includes("http")){
  profilePic = `data:image/png;base64,${member?.profilePic}`;
  };
  return (
    <>
      <Col>
        {/* <div className="d-flex align-items-center justify-content-between contact-card p-2 text-white">
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
        </div> */}
        <Accordion className='contact-accordion'>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <img className='contact-img me-3' src={profilePic ? profilePic : member?.profilePic} alt="" />
              <div>
              <h4 className="d-flex align-items-center mb-0"><a className='text-light title-font' href={`tel:${member?.phone[0]}`}><i className="bx bxs-phone "></i> {member?.phone[0]}</a></h4>
              <p className="mb-0 text-light blood-name">{member?.fullName} {member?.CRstatus === 'verified' &&<sup className='border border-white rounded-circle' style={{padding:"2px"}}>CR</sup>}, {member?.batchNo}<sup>th</sup></p>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <td>Batch:</td>
                    <td>{member?.batchNo}<sup>th</sup></td>
                    </tr>
                </thead>
                <tbody>
                  {
                    member?.phone?.map((phone, index )=> <tr key={index}>
                    <td>Phone {index > 0 && index}:</td>
                    <td> <a href={`tel:${phone}`}>{phone}</a> </td>
                  </tr>
                  )
                  }
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </>
  );
};

export default ContactCard;