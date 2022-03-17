import React from 'react';
import { Accordion, Col, Table } from 'react-bootstrap';

const BloodCard = ({member}) => {
  const profilePic= `data:image/png;base64,${member?.profilePic}`;
  return (
    <>
      <Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <img className='blood-card-img me-3' src={profilePic} alt="" />
              <h2 className="title-font">{member?.blood?.toUpperCase()}</h2>
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
                    <td> <a href={`tel:+${member?.phone}`}>{member?.phone}</a> </td>
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