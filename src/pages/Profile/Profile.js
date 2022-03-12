import React, { useEffect, useState } from 'react';
import Hearder from '../CommonSections/Header/Hearder';
import useAuth from '../../hooks/useAuth/useAuth';
import { Col, Container, Row, Table } from 'react-bootstrap';

const Profile = () => {
  const {user} = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    fetch(`http://localhost:5500/currentUser/${user?.email}`)
    .then(res => res.json())
    .then(data => setCurrentUser(data))
  }, [user]);
  console.log(currentUser)
  return (
    <>
    <Hearder />
      <section className="py-4">
        <Container>
            <Row>
              <Col></Col>
              <Col md="7">
                <div className="profilePic text-center pb-4">
                  <img className='profile-pic' src={currentUser?.profilePic || "https://i.ibb.co/17b0X70/profile-avatar.jpg"} alt="" />
                </div>
                <h2 className='mb-3 text-center styled-heading'>{currentUser?.fullName}</h2>

                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Information:</th>
                    </tr>
                  </thead>
                  <tbody  className='text-capitalize'>
                    {/* <tr>
                      <td>Name:</td>
                      <td>{currentUser?.fullName}</td>
                    </tr> */}
                    <tr>
                      <td>Email:</td>
                      <td> <a className='text-decoration-none' href={`mailto:${currentUser?.email}`}>{currentUser?.email}</a></td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td><a className='text-decoration-none' href={`tel:${currentUser?.phone}`}> {currentUser?.phone} </a></td>
                    </tr>
                    <tr>
                      <td>Blood Group:</td>
                      <td>{currentUser?.blood.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td>Reg:</td>
                      <td>{currentUser?.reg}</td>
                    </tr>
                    <tr>
                      <td>Roll:</td>
                      <td>{currentUser?.roll}</td>
                    </tr>
                    <tr>
                      <td>Dept.</td>
                      <td>{currentUser?.dept}</td>
                    </tr>
                    <tr>
                      <td>Session.</td>
                      <td>{currentUser?.session}</td>
                    </tr>
                    
                    <tr>
                      <td></td>
                      <td className='text-danger'>Present Address</td>
                    </tr>
                    <tr>
                      <td>In Hall ?</td>
                      <td>{currentUser?.isHall ? "Yes" : "No"}</td>
                    </tr>
                    {
                      currentUser?.isHall ? <>
                      <tr>
                       <td>Hall Name</td>
                       <td>{currentUser?.hallName}</td>
                     </tr>
                     <tr>
                       <td>Block</td>
                       <td>{currentUser?.hallBlock.toUpperCase()}</td>
                     </tr>
                     <tr>
                       <td>Room No</td>
                       <td>{currentUser?.hallRoom}</td>
                     </tr> 
                     
                     </> : <>

                     <tr>
                      <td>Mess Name</td>
                      <td>{currentUser?.messName}</td>
                    </tr>
                     <tr>
                      <td>Mess Address</td>
                      <td>{currentUser?.messAddress}</td>
                    </tr>
                    </>
                    }
                     <tr>
                      <td></td>
                      <td className='text-danger'>Parmanent Address</td>
                    </tr>
                     <tr>
                      <td>Village</td>
                      <td>{currentUser?.village}</td>
                    </tr>
                     <tr>
                      <td>District</td>
                      <td>{currentUser?.district}</td>
                    </tr>
                     <tr>
                      <td>Division</td>
                      <td>{currentUser?.division}</td>
                    </tr>
                     <tr>
                      <td>Registred At</td>
                      <td>{currentUser?.registerDate} <small className='text-uppercase fw-bold' style={{fontSize:"11px"}}>(mm/dd/yy)</small></td>
                    </tr>

                  </tbody>
                </Table>

              </Col>
              <Col></Col>
            </Row>
          
        </Container>
      </section>
    </>
  );
};

export default Profile;