import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import { useForm } from "react-hook-form";
import InfoFields from './InfoFields/InfoFields';
const axios = require('axios');

const SetInformation = () => {
  const {user, name} = useAuth();
  
  const [isHall, setHall] = useState(false);
  const navigate = useNavigate();

  // manage submited data
  const { register, handleSubmit } = useForm();
  const onSubmit = (info) => {
    let userInfo = {}
    if(info.isHall){
      const {messName, messAddress, ...inHall} = info;
      userInfo = inHall;
    }else{
      const {hallName, hallBlock, hallRoom, ...notHall} = info;
      userInfo = notHall;
    }
    // console.log(userInfo)

    axios.put("http://localhost:5500/user", userInfo)
    .then(res => {
      console.log(res.starus)
      if(res.status === 200){
        navigate("/profile");
      }
    })
  }

  const yes = e => {
    // console.log(e.target.checked);
    setHall(e.target.checked);
  }
  return (
    <>
      <section className="pt-3 pb-4 text-end bg-light">
        <Container>
        <div>
          <Link to='/' className="text-danger text-decoration-none">Skip for Now</Link>
          </div>
        </Container>
      </section>

      <section className="py-2">
        <Container>
          <h4 className="text-success styled-heading">Welcome! {user?.displayName ? user?.displayName : name}</h4>
          <p>
          Hello <span className='text-success'>{user?.displayName ? user?.displayName : name}</span>! You have successfully registred. Now you should set some basic information about you. Please sincerely fill up the below fileds.
          </p>


          <Form  onSubmit={handleSubmit(onSubmit)}>
            
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
                <Form.Control {...register("roll")} type="number" placeholder="Roll No" />
              </Form.Group>

              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Reg. No.</Form.Label>
                <Form.Control {...register("reg")} type="number" placeholder="Reg No" />
              </Form.Group>

              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Session:</Form.Label>
                <Form.Control {...register("session")} type="text" placeholder="2019-20" />
              </Form.Group>
              
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Department:</Form.Label>
                  <Form.Select {...register("dept")}>
                    <option value='none'>Select Dept.</option>
                    <option value="social-work">Social Work</option>
                    <option value="economics">Economics</option>
                    <option value="english">English</option>
                    <option value="public-add">Public Addminitration</option>
                    <option value="bangla">Bangla</option>
                    <option value="thm">THM</option>
                    <option value="hbs">HBS</option>
                    <option value="physics">Physics</option>
                    <option value="eee">EEE</option>
                    <option value="cse">CSE</option>
                    <option value="urp">URP</option>
                  </Form.Select>
              </Form.Group>              
            </Row>

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
                      <Form.Control {...register("messAddress")} type="text" placeholder="Mess Address" />
                    </Form.Group> 
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
                      <Form.Control {...register("district", {required: true})} type="text" placeholder="District" />
                    </Form.Group> 

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

            <Button variant="success" className='shadow-none rounded-1 px-5' type="submit">
              Save Change
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default SetInformation;