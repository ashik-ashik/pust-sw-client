import axios from 'axios';
import React from 'react';
import { Button, Col } from 'react-bootstrap';

const AdminCard = ({member, setReLoad}) => {
  const manageAdmin = (id, action) =>{
      axios.put(`https://warm-earth-97575.herokuapp.com/manage-admin/${id}`, {role:action})
      .then(res=>{
        if(res.status === 200){
          setReLoad(true);
        };
      })
  }
  return (
    <>
      <Col>
        <div className="text-center bg-light py-4 px-3">
          <img src={member?.profilePic} alt="" style={{width:"60px", borderRadius:"50%"}} />
          <h4 className="title-font mt-3">{member?.fullName}</h4>
          <p className='text-break' style={{fontSize:"12px"}}>{member?.email}</p>
          {
            member?.role === 'admin' ? <>
              <Button onClick={()=>manageAdmin(member?._id, '')} variant='danger' className='rounded-0 shadow-none px-4' size="sm">Remove from Admin</Button>
            </> : <>
              <Button onClick={()=>manageAdmin(member?._id, 'admin')} variant='success' className='rounded-0 shadow-none px-4' size="sm">Make as Admin</Button>            
            </>
          }
        </div>

      </Col>
    </>
  );
};

export default AdminCard;