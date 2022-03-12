import React, { useState } from 'react';
import { Button, Col, Row, Table, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import axios from 'axios';

const ShowMemberDetail = ({member}) => {
  const {user} = useAuth();
  const navigate = useNavigate();

  const updateProfile = id => {
    navigate(`/update-profile/${id}`);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const clickFile = () => {
    setShow(true);
  };

  const submitFile = (e) => {
    const file = document.getElementById("file").files[0];
    const formData = new FormData();
    formData.append("image", file)
    axios.put(`http://localhost:5500/upload-profile/${member?._id}`, formData)
    .then(res => {
      setShow(false);
        window.location.reload();
    })
  }

  return (
    <>
      <Row>
              <Col></Col>
              <Col md="9">
                <div className="profilePic text-center pb-4">
                  
                  {
                    member?.profilePic ?
                    <img className='profile-pic' src={`data:image/png;base64,${member?.profilePic}`} alt="" /> : 
                    <img className='profile-pic' src="https://i.ibb.co/17b0X70/profile-avatar.jpg" alt="" />
                    }
                  <i className='fs-2 bx bxs-camera' onClick={clickFile}></i>
                </div>
                <h2 className='mb-3 text-center styled-heading'>{member?.fullName}</h2>

                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Information:</th>
                    </tr>
                  </thead>
                  <tbody  className='text-capitalize'>
                    {/* <tr>
                      <td>Name:</td>
                      <td>{member?.fullName}</td>
                    </tr> */}
                    <tr>
                      <td>Email:</td>
                      <td> <a className='text-decoration-none text-lowercase' href={`mailto:${member?.email}`}>{member?.email}</a></td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td><a className='text-decoration-none' href={`tel:${member?.phone}`}> {member?.phone} </a></td>
                    </tr>
                    <tr>
                      <td>Blood Group:</td>
                      <td>{member?.blood?.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td>Reg:</td>
                      <td>{member?.reg}</td>
                    </tr>
                    <tr>
                      <td>Roll:</td>
                      <td>{member?.roll}</td>
                    </tr>
                    <tr>
                      <td>Dept.</td>
                      <td>{member?.dept}</td>
                    </tr>
                    <tr>
                      <td>Session.</td>
                      <td>{member?.session}</td>
                    </tr>
                    
                    <tr>
                      <td></td>
                      <td className='text-danger'>Present Address</td>
                    </tr>
                    <tr>
                      <td>In Hall ?</td>
                      <td>{member?.isHall ? "Yes" : "No"}</td>
                    </tr>
                    {
                      member?.isHall ? <>
                      <tr>
                       <td>Hall Name</td>
                       <td>{member?.hallName}</td>
                     </tr>
                     <tr>
                       <td>Block</td>
                       <td>{member?.hallBlock.toUpperCase()}</td>
                     </tr>
                     <tr>
                       <td>Room No</td>
                       <td>{member?.hallRoom}</td>
                     </tr> 
                     
                     </> : <>

                     <tr>
                      <td>Mess Name</td>
                      <td>{member?.messName}</td>
                    </tr>
                     <tr>
                      <td>Mess Address</td>
                      <td>{member?.messAddress}</td>
                    </tr>
                    </>
                    }
                     <tr>
                      <td></td>
                      <td className='text-danger'>Parmanent Address</td>
                    </tr>
                     <tr>
                      <td>Village</td>
                      <td>{member?.village}</td>
                    </tr>
                     <tr>
                      <td>District</td>
                      <td>{member?.district}</td>
                    </tr>
                     <tr>
                      <td>Division</td>
                      <td>{member?.division}</td>
                    </tr>
                     <tr>
                      <td>Registred At</td>
                      <td>{member?.registerDate} <small className='text-uppercase fw-bold' style={{fontSize:"11px"}}>(mm/dd/yy)</small></td>
                    </tr>

                  </tbody>
                </Table>
                <div className="socital-media py-4 bg-light">
                  <ul className='list-unstyled member-social-media w-75 mx-auto'>
                    <li><a href={member?.facebookLink || "#"}><i className='bx bxl-facebook'></i></a></li>
                    <li><a href={member?.instagramLink || "#"}><i className='bx bxl-instagram'></i></a></li>
                    <li><a href={member?.twitterLink || "#"}><i className='bx bxl-twitter'></i></a></li>
                    <li><a href={member?.linkedinLink || "#"}><i className='bx bxl-linkedin'></i></a></li>
                  </ul>
                </div>
                {
                  user?.email === member?.email && <>
                    <div className="mt-4">
                      <p className="small mb-2">
                        You can add your social media links so that people can connect with you easily.
                      </p>
                      <Button onClick={()=> updateProfile(member?._id)} variant='success' className='rounded-0 px-4' >Edit Profile</Button>
                    </div>
                  </>
                }
              </Col>
              <Col></Col>
      </Row>

      <Modal show={show} onHide={handleClose} centered animation={true}>
        <Modal.Header className='fs-5 shadow-none'>
          <Modal.Title>Upload Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3">
              <Form.Label>Select your photo</Form.Label>
              <Form.Control id='file' type="file" size="sm" />
            </Form.Group>
            <Button variant="success" className='shadow-none rounded-1 px-4' size="sm" onClick={submitFile}>
              Upload
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default ShowMemberDetail;