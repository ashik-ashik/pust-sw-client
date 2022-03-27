import React, { useState } from 'react';
import { Button, Col, Row, Modal, Form, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import axios from 'axios';
import BasicInfo from './BasicInfo/BasicInfo';
import ContactInfo from './ContactInfo/ContactInfo';
import AddressInfo from './AddressInfo/AddressInfo';

const ShowMemberDetail = ({member}) => {
  const {user, auth} = useAuth();
  const navigate = useNavigate();


  const updateProfile = id => {
    navigate(`/update-profile/${id}`);
  };

  // update CR-ship
  const [showCR, setShowCR] = useState(false);
  const handleCloseCR = () => setShowCR(false);
  const updateCR = (id) => {
    setShowCR(true)
  }
  const submitCRship = (e) => {
    const isCR = document.getElementById("CRship").checked;
    axios.put(`https://warm-earth-97575.herokuapp.com/upload-cr-ship/${member?._id}`, {isCR, CRstatus:'pending'})
    .then(res => {
      setShow(false);
        window.location.reload();
    })
  }

  // upload profile picture
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const clickFile = () => {
    setShow(true);
  };
  // upload profile Pic
  const submitFile = (e) => {
    const file = document.getElementById("file").files[0];
    const formData = new FormData();
    formData.append("image", file)
    axios.put(`https://warm-earth-97575.herokuapp.com/upload-profile/${member?._id}`, formData)
    .then(res => {
      setShow(false);
        window.location.reload();
    });
  };

  let imageURL = "";  
  if(!member?.profilePic?.includes("http")){
  imageURL = `data:image/png;base64,${member?.profilePic}`;
  }  

  // view profile in large
  const [largeImg, setLargeImg] = useState('');
  const classa = document.getElementById("large-view");
  const viewLarge = () => {
    setLargeImg(imageURL);
    classa.style.display = "flex";
  };
  const closeLarge = (e) => {
    if(e.target.className !== "img-large-view"){
      setLargeImg('');
      classa.style.display = "none";
    }
  }
  
  
  


  if (!member){
    return <>
          <Row>
            <Col></Col>
            <Col md="5" className="styled-heading">Loading....</Col>
            <Col></Col>
          </Row>
    </>
  }


  return (
    <>
        <div  onClick={closeLarge} id="large-view">
          <img className='img-large-view' src={largeImg} alt="" />
        </div>
        
        
      <Tab.Container id="left-tabs-example" defaultActiveKey="basic">
      <Row className='profile-sticky pb-4'>
        <Col md='3' className='bg-dark profile-nav-sticky border-top border-light'>
          <div className="pt-4 pb-3 text-center border-bottom brder-2 mb-3">
          <img className='profile-pic' src="https://i.ibb.co/17b0X70/profile-avatar.jpg" alt="" />
          <h4 className='mt-2 text-danger styled-heading'>{member?.fullName} {member?.CRstatus === "verified" && <sup className="cr-badge">CR</sup>}</h4>
          <p className="text-light small m-0">{member?.batchNo}<sup>th</sup> Batch</p>
          </div>
          <h4 className="text-light title-font">Information:</h4>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light' eventKey="basic">Basic</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light' eventKey="contact">Contact</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light' eventKey="address">Address</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md="9">
          <div className={`profilePic text-center ${member?.email !== user?.email ? "py-5" : "py-4"} d-none d-md-block`} style={{backgroundImage:`url(${imageURL ? imageURL : member.profilePic})`}}>
            
            {
              member?.profilePic ?
              <img onClick={viewLarge} className='profile-pic to-large-view' src={imageURL ? imageURL : member.profilePic} alt="" /> : 
              <img className='profile-pic' src="https://i.ibb.co/17b0X70/profile-avatar.jpg" alt="" />
              }
            <div className="mt-3">
              {
               (user?.email === member?.email) && (member?.role === 'admin') && <>
                  <Button  onClick={clickFile} variant="success" size="sm" className="px-4 rounded-0"><i className='bx bxs-camera fs-6'></i> Upload Profile</Button>
                </>
              }
            </div>
          </div>
          <h2 className='mb-3 mt-2 text-center styled-heading'>{member?.fullName} {member?.CRstatus === "verified" && <sup className="cr-badge">CR</sup>}</h2>
          {
            user?.email === member?.email && !member?.isCR && <>
              <p>Are you CR of your class? <span className='cr-ship' onClick={()=> updateCR(member?._id)}>Set CRship</span></p>
            </>
          }

          
                <Tab.Content>
                  <Tab.Pane eventKey="basic">
                    <BasicInfo member={member} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="contact">
                    <ContactInfo member={member} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="address">
                    <AddressInfo member={member} />
                  </Tab.Pane>
                </Tab.Content>


                <div className="socital-media py-4 bg-light">
                  <ul className='list-unstyled member-social-media w-75 mx-auto'>
                    <li><a href={member?.facebookLink || "#"}><i className='bx bxl-facebook'></i></a></li>
                    <li><a href={member?.instagramLink || "#"}><i className='bx bxl-instagram'></i></a></li>
                    <li><a href={member?.twitterLink || "#"}><i className='bx bxl-twitter'></i></a></li>
                    <li><a href={member?.linkedinLink || "#"}><i className='bx bxl-linkedin'></i></a></li>
                    <li><a href={member?.messengerLink || "#"}><i className='bx bxl-messenger'></i></a></li>
                  </ul>
                </div>
                
                {
                  user?.email === member?.email && <>
                    <div className="mt-4">
                      <p className="small mb-2">
                        You can add your social media links so that people can connect with you easily.
                      </p>
                      <Button onClick={()=> updateProfile(member?._id)} variant='success' className='rounded-0 px-4 me-2' >Add Social Media</Button>
                    </div>
                  </>
                }
          
          
        </Col>
        <Col></Col>
      </Row>
    </Tab.Container>

      {/* profile pic upload */}
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

      {/* update CR-ship */}
      <Modal show={showCR} onHide={handleClose} centered animation={true}>
        <Modal.Header className='fs-5 shadow-none'>
          <Modal.Title>Update your CR-ship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
              
            <Form.Group className="mb-3">
              <Form.Label>Are you CR of your class?</Form.Label>
              <Form.Check 
                  type="switch"
                  id="CRship"
                  label="Yes, I'm CR"
                />
            </Form.Group>
            <Button variant="success" className='shadow-none rounded-1 px-4' size="sm" onClick={submitCRship}>
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCR}>
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