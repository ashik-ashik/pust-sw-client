import React from 'react';
import { Accordion, Col, Table } from 'react-bootstrap';

const ContactCard = ({member}) => {
  let profilePic = "";  
  if(!member?.profilePic.includes("http")){
  profilePic = `data:image/png;base64,${member?.profilePic}`;
  } 
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
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <img className='contact-img me-3' src={profilePic ? profilePic : member?.profilePic} alt="" />
              <div>
              <h3 className="title-font mb-0">{member?.phone?.toUpperCase()}</h3>
              <p className="mb-0 text-light blood-name">{member?.fullName}, {member?.batchNo}<sup>th</sup></p>
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
                  
                  <tr>
                    <td>Phone:</td>
                    <td> <a href={`tel:${member?.phone}`}>{member?.phone}</a> </td>
                  </tr>
                  {
                    member?.phone2 && <>
                      <tr>
                        <td>Phone 2:</td>
                        <td> <a href={`tel:${member?.phone2}`}>{member?.phone2}</a> </td>
                      </tr>
                    </>
                  }
                  {
                    member?.phone3 && <>
                      <tr>
                        <td>Phone 3:</td>
                        <td> <a href={`tel:${member?.phone3}`}>{member?.phone3}</a> </td>
                      </tr>
                    </>
                  }
                  {
                    member?.phone4 && <>
                      <tr>
                        <td>Phone 4:</td>
                        <td> <a href={`tel:${member?.phone4}`}>{member?.phone4}</a> </td>
                      </tr>
                    </>
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