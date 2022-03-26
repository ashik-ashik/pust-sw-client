import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Table } from 'react-bootstrap';

const CRrequests = ({request}) => {
  useEffect(()=>{
    document.title = "CR-ship requests";
  }, []);

  let profilePic = "";  
  if(!request?.profilePic.includes("http")){
  profilePic = `data:image/png;base64,${request?.profilePic}`;
  } 

  const [showApprovalModal, setApprovalModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  // approve cr-ship
  const approvalClose = () => setApprovalModal(false);
  const requestApproveCr = ()=>{
    setApprovalModal(true);
  }
  const approveCRship = (id) => {
    axios.put(`https://warm-earth-97575.herokuapp.com/approve-cr/${id}`, {approve: true})
    .then(res => {
      if(res?.status){
        setApprovalModal(false)
        window.location.reload();
      };
    })
  }

  // delete cr request
  const deleteModalClose = () => setDeleteModal(false);
  const requestDeleteCR = () => {
    setDeleteModal(true);
  }
  const removeCRrequest = (id) => {
    axios.put(`https://warm-earth-97575.herokuapp.com/remove-cr/${id}`, {})
    .then(res => {
      window.location.reload();
    })
  }
  console.log(request)

  return (
    <>
      <Col>
      <div className="member-card">
          <div className="member-image text-center">
            {
              request?.profilePic ? <>
                <img className='profile-pic' src={profilePic ? profilePic : request?.profilePic} alt="" /> 
              </> : <>
                <img src="https://i.ibb.co/17b0X70/profile-avatar.jpg" alt="request" />
              </>
            }
            
            <h5 className="styled-heading mt-3 text-light">{request?.fullName}</h5>
          </div>
          <div className="member-info text-white small">
            <table>
              <tbody>
                <tr>
                  <td style={{width:"40%"}}>Email</td>
                  <td  style={{width:"60%"}}>: <a href={`mailto:${request?.email}`}>{request?.email.slice(0,7)}...com</a></td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Reg</td>
                  <td  style={{width:"60%"}}>: {request?.reg}</td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Batch</td>
                  <td  style={{width:"60%"}}>: {request?.batchNo}<sup>th</sup></td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Registred</td>
                  <td  style={{width:"60%"}}>: {request?.registerDate}</td>
                </tr>
              </tbody>
            </table>
            <div className="viewProfile text-center mt-3 pb-2">
              <p className="small">{request?.fullName} has sent a CR-ship request. Is he/she CR of his/her class? Take an action about this.</p>
             
                  <Button onClick={requestApproveCr} variant="primary" size="sm" className='px-4 small shadow-none rounded-0 me-3' >Approve</Button>
              <Button onClick={requestDeleteCR} variant="danger" size="sm" className='px-4 small shadow-none rounded-0 mt-2 mt-lg-0' >Delete</Button>
            </div>
          </div>
        </div>
      </Col>


        <Modal show={showApprovalModal} onHide={approvalClose} centered animation={true}>
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
        </Modal.Footer>
      </Modal>


        {/* remove CR request */}

        <Modal show={showDeleteModal} onHide={deleteModalClose} centered animation={true}>
        <Modal.Header className='fs-5 shadow-none'>
          <Modal.Title>Do you want to reject <span className="text-danger fw-bold">{request?.fullName}</span>'s CR-ship request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Button variant="danger" className='shadow-none rounded-1 px-4' size="sm" onClick={()=>removeCRrequest(request?._id)}>
              Confirm
            </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteModalClose}>
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