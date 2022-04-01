import React from 'react';
import { Accordion, Col, Table } from 'react-bootstrap';

const BloodCard = ({member, index}) => {
  let profilePic = "";
  
  if(!member?.profilePic.includes("http")){
   profilePic = `data:image/png;base64,${member?.profilePic}`;
  }
  
  return (
    <>
      <Col>
          <Accordion.Item eventKey={index} style={{border:"none", boxShadow: '#00000017 2px 2px 12px'}}>
            <Accordion.Header>
              <img className='blood-card-img me-3' src={profilePic ? profilePic : member?.profilePic} alt="" />
              <div>
              <h4 className="title-font mb-0">{member?.blood?.toUpperCase()}</h4>
              <p className="mb-0 text-light blood-name">{member?.fullName}, {member?.batchNo}<sup>th</sup></p>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <Table striped bordered responsive className='m-0'>
                <thead>
                  <tr>
                    <th>Name:</th>
                    <th>{member?.fullName}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Batch:</td>
                    <td>{member?.batchNo}<sup>th</sup></td>
                  </tr>
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
      </Col>
    </>
  );
};

export default BloodCard;