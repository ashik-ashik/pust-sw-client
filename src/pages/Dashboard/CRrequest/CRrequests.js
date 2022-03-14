import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const CRrequests = ({request}) => {
  console.log(request)
  const profilePic = `data:image/png;base64,${request?.profilePic}`;

  const [showApproval, setApproval] = useState(false);
  // approve cr-ship
  const approvalClose = () => setApproval(false);
  const requestApproveCr = ()=>{
    setApproval(true);
  }
  const approveCRship = (id) => {
    axios.put(`http://localhost:5500/approve-cr/${id}`, {approve: true})
    .then(res => {
      if(res?.status){
        setApproval(false)
        window.location.reload();
      };
    })
  }

  // delete cr request
  const requestDeleteCR = () => {

  }
  console.log(request)

  return (
    <>
       <article className='mb-3 cr-request-list text-white'>
          <div md="3">
            <img className='CR-reques-img' src={profilePic} alt="user" />
          </div>
          <div className='cr-request-body'>
            <div className="cr-info">
            <p className='small mb-0' >Name:</p>
            <p className='mb-0' >{request?.fullName}</p>
            </div>
            <div className="cr-info">
              <p className='small mb-0' >Roll No.</p>
              <p className='mb-0' >{request?.roll}</p>
            </div>
            <div className="cr-info">
              <p className='small mb-0' >Session:</p>
              <p className='mb-0' >{request?.session}</p>
            </div>
            <div className="cr-info">
              <p className='small mb-0' >Phone:</p>
              <p className='mb-0' ><a className='text-light' href={`tel:${request?.phone}`}>{request?.phone}</a></p>
            </div>
            <div className="cr-info request-action">
              <p className='small mb-0 text-center' >Action:</p>
                <Button onClick={requestApproveCr} variant="success shadow-none rounded-0 me-3">Approve</Button>
                <Button onClick={requestDeleteCR} variant="danger shadow-none rounded-0 ">Delete</Button>
            </div>
            
            
          </div>
        </article>
        <Modal show={showApproval} onHide={approvalClose} centered animation={true}>
        <Modal.Header className='fs-5 shadow-none'>
          <Modal.Title>Do you want to approve <span className="text-danger fw-bold">{request?.fullName}</span>'s CR-ship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant="success" className='shadow-none rounded-1 px-4' size="sm" onClick={()=>approveCRship(request?._id)}>
              Confirm
            </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={approvalClose}>
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

export default CRrequests;