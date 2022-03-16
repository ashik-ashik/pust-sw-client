import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';

const Verification = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const continueSetup = () => {
    navigate("/setup-information");
  }
  const checkVerification = () => {
    window.location.reload();
    // navigate("/setup-information");
  }
  if(user?.emailVerified){
    console.log("varifyed")
    navigate("/setup-information");
  }
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
              <p>
                If you verified your account? You can {
                  user?.emailVerified ? <Button onClick={continueSetup} size="sm" variant="success">Continue Setup</Button> : <>
                    <Button onClick={checkVerification} size="sm" variant="success">Reload Now</Button>
                  </>
                }
              </p>
            </Alert>
        </Container>
      </section>
    </>
  );
};

export default Verification;