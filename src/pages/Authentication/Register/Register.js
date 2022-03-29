import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth/useAuth';
import emailjs from 'emailjs-com';
const axios = require('axios');

const Register = () => {
  useEffect(()=>{
    document.title = "Register to Department of Social Work at PUST"
  }, []);
  
  const {user, setNewUser, memberRegister, updateProfile, auth} = useAuth();

  // get values from the form
  const { register, handleSubmit } = useForm();
  const [errPass, setErrPass] = useState('');

  const onSubmit = ({email, password, comfirmPassword, fullName}) => {
    if(password?.length < 8 ){
      setErrPass("Password Should contain at least 8 characters.");
    }else{
      setErrPass('')
    }
    if(password !== comfirmPassword){
      setErrPass("Password didn't match.")
    }
    if(email !== '' && password === comfirmPassword){
      memberRegister(email, password, fullName) // email, password,
      .then((userCredential) => {
        const verificationCode = Math.random().toString(16).slice(2,8).toUpperCase()
        const templateParams = {
          name: fullName,
          subject: "Verify your PUST-SW Account",
          userEmail: email,
          message: verificationCode
      };

      emailjs.send('service_socialwork_at', 'template_64vpsqw', templateParams, "vo222LW47_hw7gU93")
      .then(function(response) {
         
      }, function(error) {
         console.log('FAILED...', error);
      });

        const userInfo = {fullName : fullName, email : email, verificationCode: verificationCode}
        // update userName
        const user = userCredential.user;
        console.log(user)
        updateProfile(auth.currentUser, {
          displayName: fullName, 
        }).then(() => {
        // updated https://warm-earth-97575.herokuapp.com
          axios.post("https://warm-earth-97575.herokuapp.com/user", userInfo)
          .then(res => {
          })
        }).catch((error) => {
          console.log(error.message)
        });
        setNewUser(user);        
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
    }

  };



  // Show and hide password
  const togglePassword = (isShow) => {
    const show = isShow.target.checked;
    const passField = document.getElementById("password");
    const conCassField = document.getElementById("confirm-password");
    if (show){
      passField.setAttribute("type", "text");
      conCassField.setAttribute("type", "text");
    }else{
      passField.setAttribute("type", "password");
      conCassField.setAttribute("type", "password");
    }
    
  }
  return (
    <>
      { !user ? <>
      <section className='register-page text-white'>
        <Container>
          <Row className='py-4 align-items-center'style={{"minHeight": "100vh"}}>
            <Col></Col>
            <Col md="8" lg='5' className='login-box p-4'>
              <h3 className="text-info mb-3 styled-heading text-center">
                {!user? "Registration Now:" : "You have already an account."}
              </h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Enter Full Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control {...register("fullName", {required: true})} type="text" placeholder="Full Name" />
                </Form.Group>

                {/* Enter email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control {...register("email", { required: true, })} type="email" placeholder="example01@any.com" />
                </Form.Group>

                {/* Enter Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control {...register("password", { required: true, })} type="password" placeholder="Password" id='password' />
                  
                </Form.Group>

                {/* Enter Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control {...register("comfirmPassword", { required: true, })} type="password" placeholder="Password" id='confirm-password' />
                </Form.Group>
                {/* show and hide password */}
                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Show password" onChange={togglePassword} />
                </Form.Group>
                {/* show error */}
                <Form.Group>
                  <Form.Text className="text-danger small">
                    <p>{errPass}</p>
                    {/* Password should be contained at least 8 characters.  */}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" className='rounded-0 px-4 shadow-none' type="submit">
                  Register
                </Button>
                <div className="mt-3">
                  <p>
                    Do you have an account? <Link className='text-decoration-none' to={"/login"}>Login Now</Link>
                  </p>
                </div>
              </Form>
              </Col>
              <Col></Col>
            </Row>
        </Container>
      </section>
      </> : <>
      <section className="registred-done text-center py-5">
        <Container>
          <h3 className="styled-heading text-success">Well Done</h3>
          <p className="small">You have successfully registered.</p>
          <Link to='/verify-account'>
            <Button variant='success' className='rounded-0 px-4 d-flex align-items-center'>Continue <i className="bx bx-right-arrow-alt"></i></Button>
          </Link>
        </Container>
      </section>
      </>
      }
      
    </>
  );
};

export default Register;