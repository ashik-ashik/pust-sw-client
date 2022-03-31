import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import { useForm } from "react-hook-form";
import Loading from '../CommonSections/Loading/Loading';
const axios = require('axios');

const SetInformation = () => {
  const {user, name} = useAuth();
  useEffect(()=>{
    document.title = "Setup Basic Information";
  }, []);
  const [isHall, setHall] = useState(false);
  const navigate = useNavigate();
  const [setupDoneModal, setSetupDoneModal] = useState(false);

  // manage submited data
  const { register, handleSubmit } = useForm();
  const onSubmit = (info) => {

    if(info.gender === 'male'){
      info.profilePic = "https://i.ibb.co/17b0X70/profile-avatar.jpg";
    }else{
      info.profilePic = "https://i.ibb.co/K5Rt8sH/femal-avatar.png";
    }
    // ensure phone number with country code
    const setCode = !info.phone.startsWith('+880') ? '+88'+info.phone : info.phone
    info.phone = [setCode];

    let userInfo = {};
    if(info.isHall){
      const {messName, messAddress, ...inHall} = info;
      userInfo = inHall;
    }else{
      const {hallName, hallBlock, hallRoom, ...notHall} = info;
      userInfo = notHall;
    }
    // save user informaiton to database
    axios.put("https://warm-earth-97575.herokuapp.com/user", userInfo)
    .then(res => {
      if(res.status === 200){
        setSetupDoneModal(true);
      }
    });
  }

  const yes = e => {
    // console.log(e.target.checked);
    setHall(e.target.checked);
  }
  if(!user){
    return <>
      <Loading />
    </>
  }

  // if(!user?.emailVerified){
  //   console.log(user?.emailVerified)
  //   navigate("/verify-account");
  // }
  return (
    <>
      

      <section className="py-4">
        <Container>
          <h4 className="text-success styled-heading">Welcome! {user?.displayName ? user?.displayName : name}</h4>

          
          <p>
          Hello <span className='text-success'>{user?.displayName ? user?.displayName : name}</span>! You have successfully registred. Now you should set some basic information about you. Please sincerely fill up the below fileds.
          </p>


          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Row className='mt-3'>
              <Form.Group as={Col} md="6" className="mb-2">
                <Form.Label>Your Full Name</Form.Label>
                <Form.Control {...register("fullName", {required: true})} type="text" defaultValue={name || user?.displayName} />                
              </Form.Group>

              <Form.Group as={Col} md="6" className="mb-2">
              <Form.Label>Email address</Form.Label>
              <Form.Control {...register("email", {required: true})} type="email" value={user?.email} readOnly /> 
              <Form.Text className="text-danger">
               You cannot change your Email
              </Form.Text>            
            </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number:</Form.Label>
              <Form.Control {...register("phone", {required: true})} type="tel" placeholder='01700000000' />                
            </Form.Group>

            <Row>
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Roll No.</Form.Label>
                <Form.Control {...register("roll", {required: true})} type="number" placeholder="Roll No" />
              </Form.Group>

              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Reg. No.</Form.Label>
                <Form.Control {...register("reg", {required: true})} type="number" placeholder="Reg No" />
              </Form.Group>

              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Session:</Form.Label>
                <Form.Control {...register("session")} type="text" placeholder="2019-20" />
              </Form.Group>
              
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>University Batch No:</Form.Label>
                  <Form.Select {...register("batchNo")}>
                    <option value={null}>Select you batch</option>
                    <option value="8">8th Batch</option>
                    <option value="9">9th Batch</option>
                    <option value="10">10th Batch</option>
                    <option value="11">11th Batch</option>
                    <option value="12">12th Batch</option>
                    <option value="13">13th Batch</option>
                    <option value="14">14th Batch</option>
                    <option value="15">15th Batch</option>
                    <option value="16">16th Batch</option>
                    <option value="17">17th Batch</option>
                    <option value="18">18th Batch</option>
                    <option value="19">19th Batch</option>
                    <option value="20">20th Batch</option>
                  </Form.Select>
              </Form.Group>              
            </Row>
          
            <Form.Group className="mb-3">
              <Form.Label>Department:</Form.Label>
                <Form.Select {...register("dept")}>
                  <option value='none'>Select Dept.</option>
                  <option value="Social Work">Social Work</option>
                  <option value="Economics">Economics</option>
                  <option value="English">English</option>
                  <option value="Public Addminitration">Public Addminitration</option>
                  <option value="bangla">Bangla</option>
                  <option value="Bangla">THM</option>
                  <option value="HBS">HBS</option>
                  <option value="Physics">Physics</option>
                  <option value="EEE">EEE</option>
                  <option value="CSE">CSE</option>
                  <option value="URP">URP</option>
                </Form.Select>
            </Form.Group>              

            <Row>
              <Col md="6">
                <Form.Group className="mb-3">
                <Form.Label>Blood Group:</Form.Label>
                <Form.Select {...register("blood", {required: true})}>
                  <option value='none'>Select Blood Group:</option>
                  <option value="a+">A+</option>
                  <option value="a-">A-</option>
                  <option value="b+">B+</option>
                  <option value="b-">B-</option>
                  <option value="o+">O+</option>
                  <option value="o-">O-</option>
                  <option value="ab+">AB+</option>
                  <option value="ab-">AB-</option>
                  <option value="unknown">Unkown</option>
                </Form.Select>
              </Form.Group>  
              </Col>  
              <Col md="6">
                <Form.Group className="mb-3">
                <Form.Label>Gender:</Form.Label>
                <Form.Select {...register("gender", {required: true})}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="thers">Others</option>
                </Form.Select>
              </Form.Group>  
              </Col>  
            </Row> 
            
            {/* Present Address */}
              <div className="py-2">
                <h5 className="mb-3">Present Address:</h5>
                <p>
                  Is your present address University Hall?
                </p>
                <Form.Group className='mb-3'>
                <Form.Check {...register("isHall")} type="switch" label="Yes" onChange={yes}/>
                </Form.Group>
                  {isHall? <Row>
                  <Form.Group as={Col} xs="12" className="mb-3">
                    <Form.Label>Hall Name:</Form.Label>
                      <Form.Control {...register("hallName")} type="text" placeholder="Hall Name" />
                    </Form.Group> 

                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Hall Block:</Form.Label>
                      <Form.Select {...register("hallBlock")}>
                        <option value='none'>Which Block</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                      </Form.Select>
                    </Form.Group>  

                    <Form.Group as={Col} md="6" className="mb-3">
                      <Form.Label>Room No.</Form.Label>
                      <Form.Control {...register("hallRoom")} type="number" placeholder="Room No" />
                    </Form.Group>
                </Row> : 
                <Row>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Mess Name:</Form.Label>
                      <Form.Control {...register("messName")} type="text" placeholder="Mess Name" />
                    </Form.Group> 
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Mess Address:</Form.Label>
                      <Form.Control list='mess-address' {...register("messAddress")} type="text" placeholder="Mess Address" />
                    </Form.Group> 
                    <datalist id='mess-address'>
                      <option value="Central Terminal, Pabna">Central Terminal, Pabna</option>
                      <option value="Chetoner Mor, Pabna">Chetoner Mor, Pabna</option>
                      <option value="Meril bypass, Pabna">Meril bypass, Pabna</option>
                      <option value="Singa, Pabna">Singa, Pabna</option>
                      <option value="Degree Bottola, Pabna">Degree Bottola, Pabna</option>
                      <option value="Dak-Bangla, Pabna">Dak-Bangla, Pabna</option>
                      <option value="Moktob Mor, Pabna">Moktob Mor, Pabna</option>
                      <option value="Radhanagar, Pabna">Radhanagar, Pabna</option>
                      <option value="Mujahid Club, Pabna">Mujahid Club, Pabna</option>
                      <option value="Bangla Clinic, Pabna">Bangla Clinic, Pabna</option>
                      <option value="Masus Bazar, Pabna">Masus Bazar, Pabna</option>
                      <option value="Mahatab Tower, Razapur, Pabna">Mahatab Tower, Razapur, Pabna</option>
                    </datalist>
                </Row>
                }
              </div>

              <div className="my-2">
                <h5 className="mb-3">Parmanent Address:</h5>
                <Row>
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>Address:</Form.Label>
                      <Form.Control {...register("village")} type="text" placeholder="Villege, Road no/ House no, upozila" />
                    </Form.Group> 
                  <Form.Group as={Col} md="6" className="mb-3">
                    <Form.Label>District:</Form.Label>
                      <Form.Control list="district-list" {...register("district", {required: true})} type="text" placeholder="District" />
                    </Form.Group> 
                    <datalist id="district-list">
                      <option value="Natore">Natore</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Bogura">Bogura</option>
                      <option value="Naogan">Naogan</option>
                      <option value="Sirajgogn">Sirajgogn</option>
                      <option value="Nawabganj">Nawabganj</option>
                      <option value="Pabna">Pabna</option>
                      <option value="Joypurhat">Joypurhat</option>
                      <option value="Dhaka">Dhaka</option>
                      <option value="Tangail">Tangail</option>
                      <option value="Kushtia">Kushtia</option>
                      <option value="Jhenaidah">Jhenaidah</option>
                      <option value="Jessore">Jessore</option>
                      <option value="Faridpur">Faridpur</option>
                      <option value="Gazipur">Gazipur</option>
                      <option value="Gopalganj">Gopalganj</option>
                      <option value="Jamalpur">Jamalpur</option>
                      <option value="Kishoreganj">Kishoreganj</option>
                      <option value="Madaripur">Madaripur</option>
                      <option value="Manikganj">Manikganj</option>
                      <option value="Munshiganj">Munshiganj</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="Narayanganj">Narayanganj</option>
                      <option value="Narsingdi">Narsingdi</option>
                      <option value="Netrokona">Netrokona</option>
                      <option value="Rajbari">Rajbari</option>
                      <option value="Shariatpur">Shariatpur</option>
                      <option value="Sherpur">Sherpur</option>
                      <option value="Dinajpur">Dinajpur</option>
                      <option value="Gaibandha">Gaibandha</option>
                      <option value="Kurigram">Kurigram</option>
                      <option value="Lalmonirhat">Lalmonirhat</option>
                      <option value="Nilphamari">Nilphamari</option>
                      <option value="Panchagarh">Panchagarh</option>
                      <option value="Rangpur">Rangpur</option>
                      <option value="Thakurgaon">Thakurgaon</option>
                      <option value="Barguna">Barguna</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Bhola">Bhola</option>
                      <option value="Jhalokati">Jhalokati</option>
                      <option value="Patuakhali">Patuakhali</option>
                      <option value="Pirojpur">Pirojpur</option>
                      <option value="Bandarban">Bandarban</option>
                      <option value="Brahmanbaria">Brahmanbaria</option>
                      <option value="Chandpur">Chandpur</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Comilla">Comilla</option>
                      <option value="Cox''s Bazar">Cox''s Bazar</option>
                      <option value="Feni">Feni</option>
                      <option value="Khagrachari">Khagrachari</option>
                      <option value="Lakshmipur">Lakshmipur</option>
                      <option value="Noakhali">Noakhali</option>
                      <option value="Rangamati">Rangamati</option>
                      <option value="Habiganj">Habiganj</option>
                      <option value="Maulvibazar">Maulvibazar</option>
                      <option value="Sunamganj">Sunamganj</option>
                      <option value="Sylhet">Sylhet</option>
                      <option value="Bagerhat">Bagerhat</option>
                      <option value="Chuadanga">Chuadanga</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Magura">Magura</option>
                      <option value="Meherpur">Meherpur</option>
                      <option value="Narail">Narail</option>
                      <option value="Satkhira">Satkhira</option>
                    </datalist>

                    <Form.Group as={Col} xs="12" className="mb-3">
                    <Form.Label>Division:</Form.Label>
                      <Form.Select {...register("division", {required: true})}>
                        <option value='none'>Select Devision</option>
                        <option value="rajshahi">Rajshahi</option>
                        <option value="rangpur">Rangpur</option>
                        <option value="maymanshing">Maymanshing</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="dhaka">Dhaka</option>
                        <option value="khulna">Khulna</option>
                        <option value="barishal">Barishal</option>
                        <option value="chottogram">Chottogram</option>
                      </Form.Select>
                    </Form.Group>  
                </Row>
              </div>

            <Button variant="success" disabled={!user?.emailVerified ? false : false} className='shadow-none rounded-1 px-5' type="submit">
              Save Change
            </Button>
          </Form>
        </Container>
      </section>

      <Modal 
        show={setupDoneModal} 
        centered
        backdrop="static"
        keyboard={false} 
        onHide={()=>setSetupDoneModal(false)}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="text-center">
            <i className="bx bxs-check-circle display-1 text-success"></i>
            <h3 className="title-font">That's Greate!</h3>
            <h2 className="title-font display-4 fw-bold text-success">Almost done</h2>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href="/">
            <Button variant="danger" className="px-4 rounded-0 d-flex align-items-center" size="sm">
              <i className="bx bx-left-arrow-alt me-2"></i>Home
            </Button>
          </a>
          <a href="/profile">
            <Button variant="success" className="px-4 rounded-0 d-flex align-items-center" size="sm">
            Profile <i className="bx bx-right-arrow-alt ms-2"></i>
            </Button>
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SetInformation;