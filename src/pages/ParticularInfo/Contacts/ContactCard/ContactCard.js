import React from 'react';
import { Accordion, Col, Table } from 'react-bootstrap';
import useMember from '../../../../hooks/useMembers/useMembers';

const ContactCard = ({member, index}) => {
  const {currentMember} = useMember();
  let profilePic = "";  
  if(!member?.profilePic?.includes("http")){
  profilePic = `data:image/png;base64,${member?.profilePic}`;
  };
  const [phone] = member?.phone || [];
  const isSocialWork = currentMember?.roll?.slice(2,4) === '15';
  return (
    <>
      <Col>
        
          <Accordion.Item eventKey={index} style={{border:"none", boxShadow: '#00000017 2px 2px 12px'}}>
            <Accordion.Header>
              <img className='contact-img me-3' src={profilePic ? profilePic : member?.profilePic} alt="" />
              <div>
              <h4 className="d-flex align-items-center mb-0"><a className='text-light title-font' href={`tel:${phone}`}><i className="bx bxs-phone "></i> {phone}</a></h4>
              <p className="mb-0 text-light blood-name">{member?.fullName} {member?.CRstatus === 'verified' &&<sup className='border border-white rounded-circle' style={{padding:"2px"}}>CR</sup>}, {member?.batchNo}<sup>th</sup></p>
              </div>
            </Accordion.Header>
            <Accordion.Body className='p-0'>
              <Table striped bordered responsive className="m-0">
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
                    <td> <a href={`tel:${isSocialWork ? phone : "+88017..."}`}>{isSocialWork ? phone : "+88017 XX-XXXXXX"}</a> </td>
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

export default ContactCard;