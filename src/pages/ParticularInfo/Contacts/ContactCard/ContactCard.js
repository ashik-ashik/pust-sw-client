import React from 'react';
import { Accordion, Col, Table } from 'react-bootstrap';

const ContactCard = ({member}) => {
  let profilePic = "";  
  if(!member?.profilePic?.includes("http")){
  profilePic = `data:image/png;base64,${member?.profilePic}`;
  };
  const phone = member?.phone;
  console.log(member)
  return (
    <>
      <Col>
        <Accordion className='contact-accordion'>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <img className='contact-img me-3' src={profilePic ? profilePic : member?.profilePic} alt="" />
              <div>
              <h4 className="d-flex align-items-center mb-0"><a className='text-light title-font' href={`tel:${phone}`}><i className="bx bxs-phone "></i> {phone}</a></h4>
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