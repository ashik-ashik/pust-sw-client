import axios from 'axios';
import React, {useState} from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import useMember from '../../../../hooks/useMembers/useMembers';

const AdminCard = ({member, setReLoad}) => {
  const {currentMember} = useMember();
  const [showConfirmModal, setConfirmModal] = useState(false);
  const manageAdmin = (id, action) =>{
      axios.put(`https://warm-earth-97575.herokuapp.com/manage-admin/${id}`, {role:action})
      .then(res=>{
        if(res.status === 200){
          setReLoad(true);
        };
      });
      
  }
  const handelManageAdmin = (id, action)=>{
    setConfirmModal(false);
    manageAdmin(id, action);
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
              <Button disabled={member?._id === currentMember?._id && true} onClick={()=>setConfirmModal(true)} variant='danger' className='rounded-0 shadow-none px-4' size="sm">Remove from Admin</Button>
            </> : <>
              <Button onClick={()=>setConfirmModal(true)} variant='success' className='rounded-0 shadow-none px-4' size="sm">Make as Admin</Button>            
            </>
          }
        </div>

      </Col>

      <Modal show={showConfirmModal} onHide={()=>setConfirmModal(false)} centered animation={true}>
        <Modal.Header className='fs-5 shadow-none'>
          <Modal.Title>Make <span className="title-font text-danger fw-bold">{member?.fullName}</span> as Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            member?.role !== 'admin' ? <p className="text-danger small" style={{textAlign:'justify'}}>
            If you make him as admin he can access all of components and can manage all everything link edit, delete, providing permission to CR and many more.
          </p>
          :
          <p>
            If you remove his <strong>Admin</strong> status he will loss all the controlling power!
          </p>  
        }
          <Form >
              
              <Button onClick={()=>handelManageAdmin(member?._id, member?.role !== "admin" ? 'admin' : '')} variant={member?.role === "admin" ? 'danger' : 'success'} className='shadow-none rounded-0 px-4' size="sm" >
                {member?.role === 'admin' ? "Remove Admin" : 'Make Admin'}
              </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" className='rounded-1 px-3' size='sm' onClick={()=>setConfirmModal(false)}>
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