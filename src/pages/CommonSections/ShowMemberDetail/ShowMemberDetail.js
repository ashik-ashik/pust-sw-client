import React, { useState } from 'react';
import { Button, Col, Row, Modal, Form, Tab, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import axios from 'axios';
import BasicInfo from './BasicInfo/BasicInfo';
import ContactInfo from './ContactInfo/ContactInfo';
import AddressInfo from './AddressInfo/AddressInfo';
import useMember from '../../../hooks/useMembers/useMembers';
import MyReviews from '../../Profile/Review/MyReviews/MyReviews'
import WriteReview from '../../Profile/Review/WriteReview/WriteReview'

const ShowMemberDetail = ({member, setReLoad}) => {
  const {memberLogOut} = useAuth();
  const [primaryPhone] = member?.phone || [];
  const {currentMember} = useMember();


  const {user, deleteAccount} = useAuth();
  const navigate = useNavigate();
  const [largeImg, setLargeImg] = useState('');
  const [deleteConfirmModal, setDeleteComfirmModal] = useState(false);
  const [deleteSuccessModal, setDeleteSuccessModal] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [reviewLoad, setReviewLoad] = useState(false)


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
      setReLoad(true);
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
      setReLoad(true);
    });
  };

  let imageURL = "";  
  if(!member?.profilePic?.includes("http")){
  imageURL = `data:image/png;base64,${member?.profilePic}`;
  }  

  // view profile in large
  const classa = document.getElementById("large-view");
  const viewLarge = () => {
    setLargeImg(member?.profilePic);
    classa.style.display = "flex";
  };
  const closeLarge = (e) => {
    if(e.target.className !== "img-large-view"){
      setLargeImg('');
      classa.style.display = "none";
    }
  }



  const deleteUserDate = id => {
    axios.delete(`https://warm-earth-97575.herokuapp.com/delete-member/${id}`)
    .then(res => {
      if(res?.status === 200){
          setDeleteSuccessModal(true)
      }
    })
  }
  
  const handleDeleteAccount = () => {
    setDeleteComfirmModal(true)
  }
  const deleteAccountConfirm = id => {
      deleteAccount();
      deleteUserDate(id);
      setDeleteComfirmModal(false)
  }

  const isSocialWork = currentMember?.roll?.slice(2,4) === '15';

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
          {/* side bar large screen */}
          <div className="pt-4 pb-3 text-center border-bottom brder-2 mb-3">
            <img className='profile-pic' src={(member?.email === 'mdashika989@gmail.com' ? "https://i.ibb.co/k3f5CR6/ashik.jpg" : member.profilePic)} alt="" />
            <h4 className='mt-2 text-danger styled-heading'>{member?.fullName} {member?.CRstatus === "verified" && <sup className="cr-badge">CR</sup>}</h4>
            <p className="text-light small m-0">{member?.batchNo}<sup>th</sup> Batch</p>
            <small style={{fontSize:"12px"}} className="text-light text-break">{member?.email}</small>
            <div className="quick-contact py-3">
                <ul className="list-unstyled d-flex justify-content-center">
                  <li className='quick-contact-item'>
                    <a className='quick-phone' href={`tel:${isSocialWork ? primaryPhone : '+8801700000000'}`}><i className='bx bxs-phone'></i></a>
                  </li>
                  <li className='quick-contact-item'>
                    <a href={`sms:${isSocialWork ? primaryPhone : '+8801700000000'}`}><i className='bx bxs-message-rounded-detail'></i></a>
                  </li>
                  {member?.whatsApp ? <li className='quick-contact-item'>
                    <a  href={`https://api.whatsapp.com/send?phone=${isSocialWork ? member?.whatsApp : '+88017'}`}><i className='bx bxl-whatsapp'></i></a>
                  </li> : <>
                  </>
                  }
                  <li className='quick-contact-item'>
                    <a href={isSocialWork ? (member?.messengerLink || member?.facebookLink) : "https://facebook.com"}><i className='bx bxl-messenger'></i></a>
                  </li>
                  
                </ul>
            </div>
          </div>

          {/* custom toggle mobile menu */}
          <div onClick={()=>setMenuShow(true)} className="my-side-toggle-menu-icon d-md-none">
            <i className='bx bxs-chevron-right text-white  bx-tada fs-1'></i>
          </div>
            
            {/* mobile menu */}
          <div className={`my-side-toggle-menu-items ${menuShow ? "active" : ""}`}>
            <i onClick={()=>setMenuShow(false)} className='bx bxs-chevron-left text-white menu-close fs-1 bx-tada'></i>
            <h5 className="text-light mb-3 border-bottom pb-2">Menu</h5>
            <Nav  onClick={()=>setMenuShow(false)} variant="pills" className="flex-column">
            <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="basic"><i className='bx bx-info-circle me-2 fs-5'></i>Basic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="contact"><i className='bx bxs-contact me-2 fs-5' ></i>Contact</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="address"><i className='bx bx-map me-2 fs-5'></i>Address</Nav.Link>
              </Nav.Item>
              
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="review"><i className='bx bx-message-alt-dots me-2 fs-5'></i>Reviews</Nav.Link>
              </Nav.Item>

              {
                user?.email === member?.email && <>
                  <Nav.Item>
                  <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="write-review"><i className='bx bx-plus me-2 fs-5'></i>Write Reviews</Nav.Link> 
                  </Nav.Item>
              
                  <Nav.Item>
                    <Nav.Link as={Link} to="/todo" className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center'><i className='bx bx-list-plus me-2 fs-5'></i>To Do App</Nav.Link>
                  </Nav.Item>
                </>
              }
              
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="myblog"><i className='bx bx-book-bookmark me-2 fs-5'></i>My Blog</Nav.Link>
              </Nav.Item>
              {
                user?.email === member?.email && <>
              <Nav.Item>
                <Nav.Link onClick={memberLogOut} className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center'> <i className="bx bx-power-off me-2 fs-5"></i> Log Out</Nav.Link>
              </Nav.Item>
              </>
            }
            </Nav>
          </div>

        {/* large screen menu */}
          <div className="d-md-block d-none pb-md-5">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="basic"><i className='bx bx-info-circle me-2 fs-5'></i>Basic</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="contact"><i className='bx bxs-contact me-2 fs-5' ></i>Contact</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="address"><i className='bx bx-map me-2 fs-5'></i>Address</Nav.Link>
              </Nav.Item>
              {
                user?.email === member?.email && <>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/todo" className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center'><i className='bx bx-list-plus me-2 fs-5'></i>To Do App</Nav.Link>
                  </Nav.Item>
                </>
              }
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="review"><i className='bx bx-message-alt-dots me-2 fs-5'></i>Reviews</Nav.Link>
              </Nav.Item>
              
              {
                user?.email === member?.email && <>
              <Nav.Item>
              <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="write-review"><i className='bx bx-plus me-2 fs-5'></i>Write Reviews</Nav.Link> 
              </Nav.Item>
                </>
                }
              <Nav.Item>
                <Nav.Link className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center' eventKey="myblog"><i className='bx bx-book-bookmark me-2 fs-5'></i>Blogs</Nav.Link>
              </Nav.Item>
              {
                user?.email === member?.email && <>
              <Nav.Item>
                <Nav.Link onClick={memberLogOut} className='rounded-0 small cursor-pointer mb-2 bg-light d-flex align-items-center'> <i className="bx bx-power-off me-2 fs-5"></i> Log Out</Nav.Link>
              </Nav.Item>
              </>
            }
            </Nav>
          </div>

        </Col>
        <Col md="9">
          <div className={`profilePic text-center ${member?.email !== user?.email ? "py-5" : "py-4"} d-none d-md-block`} style={{backgroundImage:`url(${imageURL ? imageURL : (member?.email === 'mdashika989@gmail.com' ? "https://i.ibb.co/k3f5CR6/ashik.jpg" : member.profilePic)})`}}>
            
            {
              member?.profilePic ?
              <img onClick={viewLarge} className='profile-pic to-large-view' src={imageURL ? imageURL : (member?.email === 'mdashika989@gmail.com' ? "https://i.ibb.co/k3f5CR6/ashik.jpg" : member.profilePic)} alt="" /> : 
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
            member?.email === 'mdashika989@gmail.com' && <>
            <div className="pb-2">
              <h5 className="title-font text-center">
                MERN Stack Junior Developer
              </h5>
              <h6 className="text-center title-font">
                Student of Department of Social Work <br />
                at Pabna University of Science and Technology
              </h6>
            </div>
            </>
          }
          {
            user?.email === member?.email && !member?.isCR && <>
              <p>Are you CR of your class? <span className='cr-ship' onClick={()=> updateCR(member?._id)}>Set CRship</span></p>
            </>
          }
          
                <Tab.Content>
                  <Tab.Pane eventKey="basic">
                    <h5 className="title-font"><span className="text-danger">||</span> Basic Information</h5>
                    <BasicInfo member={member} />
                  </Tab.Pane>

                  <Tab.Pane eventKey="contact">
                    <h5 className="title-font"><span className="text-danger">||</span> Contact Information</h5>
                    <ContactInfo member={member} setReLoad={setReLoad} />
                  </Tab.Pane>

                  <Tab.Pane eventKey="address">
                    <h5 className="title-font"><span className="text-danger">||</span> Address</h5>
                    <AddressInfo member={member} />
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="review">
                    <h5 className="title-font"><span className="text-danger">||</span> Reviews</h5>
                    <MyReviews member={member} setReviewLoad={setReviewLoad} reviewLoad={reviewLoad} />
                  </Tab.Pane>
                  
                  <Tab.Pane eventKey="write-review">
                    <h5 className="title-font"><span className="text-danger">||</span> Write A Reviews</h5>
                    <WriteReview member={member} setReviewLoad={setReviewLoad} />
                  </Tab.Pane>

                  <Tab.Pane eventKey="myblog">
                    <h5 className="title-font"><span className="text-danger">||</span> Blogs</h5>
                  </Tab.Pane>
                </Tab.Content>

                {
                  member?.email === 'mdashika989@gmail.com' && <>
                    <div className="py-2">
                      <h5 className="title-font">Developer Say:</h5>
                      <p className="small text-muted">
                        Hey there, This is our unofficial website. I have build this website for our Social Work Department. I have created this with a simple purpose, to collect and store basic data about the student of Department of Social work at Pabna University of Science and Technology. Here all of your information will be secured. No one can access you important information such as your phone number, your whatsApp number, your social media profile links. These all of your important information is protected by secrec thing. If someone register with wrong information even he/she can not access these protected information. <br /> <br />
                        The actual purpose behind this website is practice.
                      </p>
                    </div>
                  </>
                }

                <div className="socital-media py-4">
                  <ul className='list-unstyled member-social-media w-75 mx-auto'>
                    <li><a href={member?.facebookLink || "#"} rel='noreferrer' target='_blank'><i className='bx bxl-facebook'></i></a></li>
                    <li><a href={member?.instagramLink || "#"} rel='noreferrer' target='_blank'><i className='bx bxl-instagram'></i></a></li>
                    <li><a href={member?.twitterLink || "#"} rel='noreferrer' target='_blank'><i className='bx bxl-twitter'></i></a></li>
                    <li><a href={member?.linkedinLink || "#"} rel='noreferrer' target='_blank'><i className='bx bxl-linkedin'></i></a></li>
                    <li><a href={member?.messengerLink || "#"} rel='noreferrer' target='_blank'><i className='bx bxl-messenger'></i></a></li>
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
          
          {/* {user?.email === member?.email && <>
            <div className="py-4 text-center">
              <Button onClick={()=>handleDeleteAccount()} variant='danger' className="small px-4 rounded-0 shadow-none">Delete Account</Button>
            </div>
          </>} */}
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


      {/* Delete My Account */}
      <Modal show={deleteConfirmModal} onHide={()=>setDeleteComfirmModal(false)} centered animation={true}>
        <Modal.Body>
          <div className="py-5 text-center">
            <i className="bx bx-trash display-2 text-danger"></i>
            <p className="m-0">
              Do you want to <span className="text-danger fw-bold">delete</span> your account parmanently?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className='px-4' size='sm' onClick={()=>deleteAccountConfirm(member?._id)}>
            Confirm
          </Button>
          <Button variant="dark" className='px-4' size='sm' onClick={()=>setDeleteComfirmModal(false)}>
            Cancel
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

      {/* Deleted My Account successfully */}
      <Modal show={deleteSuccessModal} onHide={()=>setDeleteSuccessModal(false)} centered animation={true}>
        
        <Modal.Body>
          <div className="py-5 text-center">
            <h3 className="m-0">
              Your Account Deleted Successfully
            </h3>
            <i className="bx bx-check-circle display-2 text-success"></i>
          </div>
        </Modal.Body>
        <Modal.Footer className="text-start">
          <Button variant="primary" className="px-4" size='sm' onClick={()=> {setDeleteSuccessModal(false); navigate('/register')}}>
            Okay
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