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
  const {user, isLoading} = useAuth();
  const navigate = useNavigate();
  const [getUser, setGetUser] = useState(null);
  const [notify, setNotify] = useState(false);
  const [matching, setMatching] = useState(true);

  useEffect(()=>{    
      fetch(`https://warm-earth-97575.herokuapp.com/currentUser/${user?.email}`)
      .then(res => res.json())
      .then(result => setGetUser(result))
  },[user, isLoading]);
  
  if(isLoading){
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

    const verifySuccess = () => {
      setNotify(false);
      document.location.reload();
    };
    const backToHome = () => {
      navigate("/")
    }
      
  return (
    <>
      <section className="py-4 notice-board">
        <Container>

         { getUser?.isVerified ? <>
         
          <Alert variant="success">
              <Alert.Heading className="title-font">Verification Successful!</Alert.Heading>
              <p className='small'>
                We have Successfully verified your account.
              </p>
              <Button onClick={backToHome} variant="success" size="sm" className="px-4 rounded-0"><i className="bx bx-left-arrow-alt"></i> Back to Home</Button>
            </Alert>
         </> : <>
         
          <Alert variant="danger">
              <Alert.Heading className="title-font">You have to verify your account</Alert.Heading>
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
         </>}
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
          <Button variant="primary" className="px-4" size='sm' onClick={verifySuccess}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Verification;