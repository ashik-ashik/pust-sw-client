import axios from 'axios';
import React, {useState} from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';

const AdminCard = ({member, setReLoad}) => {
  const [showConfirmModal, setConfirmModal] = useState(false);
  const manageAdmin = (id, action) =>{
      axios.put(`https://warm-earth-97575.herokuapp.com/manage-admin/${id}`, {role:action})
      .then(res=>{
        if(res.status === 200){
          setReLoad(true);
        };
      });
      
  }
  const handelManageAdmin = ()=>{

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
              <Button onClick={()=>setConfirmModal(true)} variant='success' className='rounded-0 shadow-none px-4' size="sm">Make as Admin</Button>            
            </>
          }
        </div>

      </Col>

      <Modal show={showConfirmModal} onHide={()=>setConfirmModal(false)} centered animation={true}>
        <Modal.Header className='fs-5 shadow-none'>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
              
              <Button variant="success" className='shadow-none rounded-1 px-4' size="sm" >
                Make Admin
              </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setConfirmModal(false)}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>


    </>
  );
};

export default AdminCard;