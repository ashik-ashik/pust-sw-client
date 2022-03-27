import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import Loading from '../Loading/Loading';

const Verification = () => {
  useEffect(()=>{
    document.title = "Verify Your Account"
  }, [])
  const {user, auth, sendEmailVerification} = useAuth();
  const navigate = useNavigate();
  const continueSetup = () => {
    navigate("/setup-information");
  }
  const checkVerification = () => {
    window.location.reload();
    // navigate("/setup-information");
  }
  if(user?.emailVerified){
    navigate("/setup-information");
  }
  const [notify, setNotify] = useState(false)
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser)
        .then(() => {
          setNotify(true)
        });

  if(!user){
    return <Loading />
  }
  }
  return (
    <>
      <section className="py-4 notice-board">
        <Container>
          {
            !user?.emailVerified && "You have to verify your account"
          }
          <Alert variant={user?.emailVerified ? "success" : "danger"}>
              <Alert.Heading className="title-font">{user?.emailVerified ? "Your account has been verified" : "Verify you account"}</Alert.Heading>
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
              <Button disabled={user?.emailVerified ? true : false} onClick={sendAgain} variant="primary" size="sm" className="small rounded-0 px-4">Send Again</Button>
            </Alert>
        </Container>
      </section>

      {/* Notification Modal */}
      <Modal show={notify} onHide={()=>setNotify(false)} centered animation={true}>
        
        <Modal.Body>
          <div className="py-5 text-center">
            <h3 className="m-0">
              Verificaiton Link has been sent
            </h3>
            <i className="bx bx-check-circle display-2 text-success"></i>
          </div>
        </Modal.Body>
        <Modal.Footer className="text-start">
          <Button variant="primary" className="px-4" size='sm' onClick={()=> {setNotify(false); navigate('/')}}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default Verification;