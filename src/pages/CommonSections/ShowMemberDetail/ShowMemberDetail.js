import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';

const ShowMemberDetail = ({member}) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const updateProfile = email => {
    navigate(`/update-profile/${email}`);
  }
  return (
    <>
      <Row>
              <Col></Col>
              <Col md="9">
                <div className="profilePic text-center pb-4">
                  <img className='profile-pic' src={member?.profilePic || "https://i.ibb.co/17b0X70/profile-avatar.jpg"} alt="" />
                </div>
                <h2 className='mb-3 text-center styled-heading'>{member?.fullName}</h2>

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
                      <td>{member?.fullName}</td>
                    </tr> */}
                    <tr>
                      <td>Email:</td>
                      <td> <a className='text-decoration-none text-lowercase' href={`mailto:${member?.email}`}>{member?.email}</a></td>
                    </tr>
                    <tr>
                      <td>Phone:</td>
                      <td><a className='text-decoration-none' href={`tel:${member?.phone}`}> {member?.phone} </a></td>
                    </tr>
                    <tr>
                      <td>Blood Group:</td>
                      <td>{member?.blood.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <td>Reg:</td>
                      <td>{member?.reg}</td>
                    </tr>
                    <tr>
                      <td>Roll:</td>
                      <td>{member?.roll}</td>
                    </tr>
                    <tr>
                      <td>Dept.</td>
                      <td>{member?.dept}</td>
                    </tr>
                    <tr>
                      <td>Session.</td>
                      <td>{member?.session}</td>
                    </tr>
                    
                    <tr>
                      <td></td>
                      <td className='text-danger'>Present Address</td>
                    </tr>
                    <tr>
                      <td>In Hall ?</td>
                      <td>{member?.isHall ? "Yes" : "No"}</td>
                    </tr>
                    {
                      member?.isHall ? <>
                      <tr>
                       <td>Hall Name</td>
                       <td>{member?.hallName}</td>
                     </tr>
                     <tr>
                       <td>Block</td>
                       <td>{member?.hallBlock.toUpperCase()}</td>
                     </tr>
                     <tr>
                       <td>Room No</td>
                       <td>{member?.hallRoom}</td>
                     </tr> 
                     
                     </> : <>

                     <tr>
                      <td>Mess Name</td>
                      <td>{member?.messName}</td>
                    </tr>
                     <tr>
                      <td>Mess Address</td>
                      <td>{member?.messAddress}</td>
                    </tr>
                    </>
                    }
                     <tr>
                      <td></td>
                      <td className='text-danger'>Parmanent Address</td>
                    </tr>
                     <tr>
                      <td>Village</td>
                      <td>{member?.village}</td>
                    </tr>
                     <tr>
                      <td>District</td>
                      <td>{member?.district}</td>
                    </tr>
                     <tr>
                      <td>Division</td>
                      <td>{member?.division}</td>
                    </tr>
                     <tr>
                      <td>Registred At</td>
                      <td>{member?.registerDate} <small className='text-uppercase fw-bold' style={{fontSize:"11px"}}>(mm/dd/yy)</small></td>
                    </tr>

                  </tbody>
                </Table>
                {
                  user?.email === member?.email && <>
                    <div className="mt-4">
                      <Button onClick={()=> updateProfile(user?.email)} variant='success' className='rounded-0 px-4' >Edit Profile</Button>
                    </div>
                  </>
                }
              </Col>
              <Col></Col>
            </Row>
    </>
  );
};

export default ShowMemberDetail;