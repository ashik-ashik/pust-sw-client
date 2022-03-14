import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth/useAuth';

const Members = ({member}) => {
  console.log(member);
  const {deleteAccount} = useAuth();
  const [openDelete, setDelete] = useState(false);
  
  // remove cr ship
  const removeCR = (id) => {
    axios.put(`https://warm-earth-97575.herokuapp.com/remove-cr/${id}`, {})
    .then(res => {
      window.location.reload();
    })
  };

  // make a cr
  const makeCR = (id) => {
    axios.put(`https://warm-earth-97575.herokuapp.com/approve-cr/${id}`, {})
    .then(res => {
      window.location.reload();
    })
  };

  // delete a Account
  const handleDeleteClose = () => setDelete(false);
  const deleteMember = () => {
      setDelete(true);
  }
  const confirmDelete = (id) => {
    axios.delete(`https://warm-earth-97575.herokuapp.com/delete-member/${id}`)
    .then(res => {
      deleteAccount();
      window.location.reload();
    })
    console.log('deleteId' , id)
  }
  
  const profilePic = `data:image/png;base64,${member?.profilePic}`;
  return (
    <>
      <Col>
      <div className="member-card">
          <div className="member-image text-center">
            {
              member?.profilePic ? <>
                <img className='profile-pic' src={profilePic} alt="" /> 
              </> : <>
                <img src="https://i.ibb.co/17b0X70/profile-avatar.jpg" alt="Member" />
              </>
            }
            
            <h5 className="styled-heading mt-3 text-light">{member?.fullName} {member?.CRstatus === "verified" && <sup className="cr-badge-card">CR</sup>}</h5>
          </div>
          <div className="member-info text-white small">
            <table>
              <tbody>
                <tr>
                  <td style={{width:"40%"}}>Email</td>
                  <td  style={{width:"60%"}}>: <a href={`mailto:${member?.email}`}>{member?.email.slice(0,7)}...com</a></td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Reg</td>
                  <td  style={{width:"60%"}}>: {member?.reg}</td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>District</td>
                  <td  style={{width:"60%"}}>: {member?.district}</td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Registred</td>
                  <td  style={{width:"60%"}}>: {member?.registerDate}</td>
                </tr>
              </tbody>
            </table>
            <div className="viewProfile text-center mt-3 pb-2">
              {
                member?.CRstatus === "verified" ? <>
                  <Button onClick={()=> removeCR(member._id)} variant="danger" size="sm" className='px-4 small shadow-none rounded-0 me-3' >Remove CR</Button>
                </> : <>
                  <Button onClick={()=> makeCR(member?._id)} variant="primary" size="sm" className='px-4 small shadow-none rounded-0 me-3' >Make CR</Button>
                </>
              }
              <Button onClick={deleteMember} variant="danger" size="sm" className='px-4 small shadow-none rounded-0' >Delete</Button>
            </div>
            {/* <div className="pt-3">
              <ul className='list-unstyled member-social-media'>
                <li><a href={member?.facebookLink || "#"}><i className='bx bxl-facebook'></i></a></li>
                <li><a href={member?.instagramLink || "#"}><i className='bx bxl-instagram'></i></a></li>
                <li><a href={member?.twitterLink || "#"}><i className='bx bxl-twitter'></i></a></li>
                <li><a href={member?.linkedinLink || "#"}><i className='bx bxl-linkedin'></i></a></li>
              </ul>
            </div> */}
          </div>
        </div>
      </Col>

      {/* update CR-ship */}
      <Modal show={openDelete} onHide={handleDeleteClose} centered animation={true}>
        <Modal.Header className='fs-5 shadow-none'>
          <Modal.Title>Are You seure delete <span className="text-danger fw-bold"> {member?.fullName}</span> 's Account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="user-profile text-center mb-3">
              <img className='img-fluid w-50 rounded' src={profilePic} alt="" />
            </div>
            <Button onClick={()=> confirmDelete(member?._id)} variant="danger" className='shadow-none px-4 rounded-0' size="sm" >
              Confirm Delete
            </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
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

export default Members;