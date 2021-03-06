import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import useAuth from '../../../hooks/useAuth/useAuth';
import Hearder from '../../CommonSections/Header/Hearder';
import '../Register/Register.css'

const Login = () => {
  useEffect(()=>{
    document.title = "Login to Department of XYZ at PUST"
  }, []);
  const {user, setNewUser, memberLogin, errorMessage} = useAuth();
  // get values from the form
  const { register, handleSubmit } = useForm();
  const [errPass, setErrPass] = useState('');
  const navigate = useNavigate();
  const onSubmit = ({email, password}) => {
    if(password?.length < 8 ){
      setErrPass("Email or password is incorrect.");
    }
    if(email !== '' && password.length >=8){
      memberLogin(email, password)
      .then((userCredential) => {
        navigate('/')
        // Signed in 
        const user = userCredential.user;
        setNewUser(user)
        // ...
      })
      .catch((error) => {
        const loginErrorMessage = error.message;
        console.log(loginErrorMessage);
        // setErrorMessage(loginErrorMessage);
      });
    }
  };

  // Show and hide password
  const togglePassword = (isShow) => {
    const show = isShow.target.checked;
    const passField = document.getElementById("password");
    if (show){
      passField.setAttribute("type", "text");
    }else{
      passField.setAttribute("type", "password");
    }
  }
  return (
    <>
      {
        user && <Hearder />
      }
      <section className='login-page text-white'>
        <Container>
          <Row className='py-4 align-items-center'style={{"minHeight": "100vh"}}>
            <Col></Col>
            <Col md="8" lg='5' className='login-box p-4'>
              <h3 className="text-info mb-3 styled-heading text-center">{!user? 'Login Now:' : 'You have already Logged In'}</h3>
              
              {
                !user ? <Form onSubmit={handleSubmit(onSubmit)}>
                {/* show error */}
                <Form.Group>
                  <Form.Text className="text-danger small">
                    <p>{errPass} {errorMessage && "Email or Password is incorrect."}</p>
                    {/* Password should be contained at least 8 characters.  */}
                  </Form.Text>
                </Form.Group>
                {/* Enter email */}
                <h6 className="text-white small ps-4">Enter Email:</h6>
                <InputGroup className="mb-4">
                  <InputGroup.Text className="icon-pill px-3"><i className='bx bxs-envelope'></i></InputGroup.Text>
                  <Form.Control className="input-pill" {...register("email", { required: true, })} type="email" placeholder="example01@any.com" />
                </InputGroup>

                {/* Enter Password */}
                <h6 className="text-white small ps-4">Enter Password:</h6>
                <InputGroup className="mb-4">
                  <InputGroup.Text className="icon-pill px-3"><i className='bx bx-key'></i></InputGroup.Text>
                  <Form.Control className="input-pill" {...register("password", { required: true, })} type="password" placeholder="Password" id='password' />
                </InputGroup>
                {/* show and hide password */}
                <InputGroup className="mb-3">
                  <Form.Check type="checkbox" label="Show password" onChange={togglePassword} />
                </InputGroup>
                <Button variant="primary" className='rounded-0 px-4 shadow-none' type="submit">
                  Log In
                </Button>
                <div className="mt-3">
                  <p>
                    You do not have any account? <Link className='text-decoration-none text-info' to={"/register"}>Register Now</Link>
                  </p>
                </div>
              </Form> :
              ""
              }
              </Col>
              <Col></Col>
            </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;