import React from 'react';
import { Accordion, Col, Table } from 'react-bootstrap';

const BloodCard = ({member}) => {
  let profilePic = "";
  
  if(!member?.profilePic.includes("http")){
   profilePic = `data:image/png;base64,${member?.profilePic}`;
  }
  
  return (
    <>
      <Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <img className='blood-card-img me-3' src={profilePic ? profilePic : member?.profilePic} alt="" />
              <div>
              <h3 className="title-font mb-0">{member?.blood?.toUpperCase()}</h3>
              <p className="mb-0 text-light blood-name">{member?.fullName}, {member?.batchNo}<sup>th</sup></p>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Table striped bordered responsive>
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
                  <tr>
                    <td>Phone:</td>
                    <td> <a href={`tel:${member?.phone}`}>{member?.phone}</a> </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </>
  );
};

export default BloodCard;