import React from 'react';
import { Button, Col } from 'react-bootstrap';

const AdminCard = ({member}) => {
  return (
    <>
      <Col className='mb-3'>
        <div className="text-center bg-light py-4 px-3">
          <img src={member?.profilePic} alt="" style={{width:"60px", borderRadius:"50%"}} />
          <h4 className="title-font mt-3">{member?.fullName}</h4>
          <p className='text-break' style={{fontSize:"12px"}}>{member?.email}</p>
          {
            member?.role === 'admin' ? <>
              <Button variant='danger' className='rounded-0 shadow-none px-4' size="sm">Remove from Admin</Button>
            </> : <>
              <Button variant='success' className='rounded-0 shadow-none px-4' size="sm">Make as Admin</Button>            
            </>
          }
        </div>

      </Col>
    </>
  );
};

export default AdminCard;