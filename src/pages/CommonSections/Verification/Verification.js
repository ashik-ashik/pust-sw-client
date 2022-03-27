import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../Loading/Loading';

const Verification = () => {
  useEffect(()=>{
    document.title = "Verify Your Account"
  }, [])
  const {user, auth, sendEmailVerification} = useAuth();
  const navigate = useNavigate();
  const [getUser, setGetUser] = useState(null);
  const [notify, setNotify] = useState(false);
  const [matching, setMatching] = useState(true);

  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
      const result = await res.json();
      setGetUser(result);
    }
    load();
  },[user]);
  if(!user){
    return <Loading />
  }

  const verifyCode = () => {
      const code = document.getElementById("code").value;
      if(code === getUser?.verificationCode){
        setMatching(true);
        axios.put(`https://warm-earth-97575.herokuapp.com/verify/${getUser?._id}`, {isVerified:true})
        .then(res => {
          if(res.status === 200){
            setMatching(true);
            setNotify(true)
          }
        }).catch(err => {
          setMatching(false);
        })
      }else{
        setMatching(false);

      }

    };

      
  return (
    <>
      <section className="py-4 notice-board">
        <Container>
          {
            !user?.emailVerified && "You have to verify your account"
          }
          <Alert variant="danger">
              <Alert.Heading className="title-font">Verify you account</Alert.Heading>
              <p className='small'>
                We have sent you a verification mail to your account email [{user?.email}]. Check your inbox and Verify your account now. 
                <a href="http://mail.google.com/" rel='noreferrer' target="_blank">Click Here</a>
              </p>
            </Alert>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control id="code" size="sm" type="text" placeholder="Verification Code" />
                <Form.Text className={matching ? "d-none" : "d-block text-danger"}>
                  Verification Code did not match.
                </Form.Text>
              </Form.Group>
              <div className="py-3 text-center">
                <Button onClick={verifyCode} className="px-4 rounded-0" variant="primary"  >Verify</Button>
              </div>
            </Form>
        </Container>
      </section>

      {/* Notification Modal */}
      <Modal show={notify} onHide={()=>setNotify(false)} centered backdrop="static" animation={true}>
        
        <Modal.Body>
          <div className="py-5 text-center">
            <h3 className="m-0">
              Your Account Verified Successfully
            </h3>
            <i className="bx bx-check-circle display-2 text-success"></i>
          </div>
        </Modal.Body>
        <Modal.Footer className="text-start">
          <Button variant="primary" className="px-4" size='sm' onClick={()=> {setNotify(false); navigate('/setup-information')}}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Verification;