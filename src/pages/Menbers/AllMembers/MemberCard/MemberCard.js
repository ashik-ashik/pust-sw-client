import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth/useAuth';
import useMember from '../../../../hooks/useMembers/useMembers'
const MemberCard = ({userInfo}) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const viewProfile = id => {
    navigate(`/member/${id}`)
};
  const {currentMember} = useMember();
  const [primaryPhone] = userInfo?.phone || [];

  let profilePic = "";  
  if(!userInfo?.profilePic?.includes("http")){
    profilePic = `data:image/png;base64,${userInfo?.profilePic}`;
  }

  const isSocialWork = currentMember?.roll?.slice(2,4) === '15';
  console.log(isSocialWork);
  return (
    <>
      <Col>
        <div className="member-card">
          <div className="member-image text-center">
            {
              userInfo?.profilePic ? <>
                <img className='profile-pic' src={profilePic ? profilePic : userInfo?.profilePic} alt="" /> 
              </> : <>
                <img src="https://i.ibb.co/17b0X70/profile-avatar.jpg" alt="Member" />
              </>
            }
            
            <h5 className="styled-heading mt-3 text-light">{userInfo?.fullName} {userInfo?.CRstatus === "verified" && <sup className="cr-badge-card">CR</sup>}</h5>
          </div>
          <div className="member-info text-white small">
            <table>
              <tbody>
                <tr>
                  <td style={{width:"40%"}}>Email</td>
                  <td  style={{width:"60%"}}>: <a href={`mailto:${userInfo?.email}`}>{userInfo?.email.slice(0,7)}...com</a></td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Batch</td>
                  <td  style={{width:"60%"}}>: {userInfo?.batchNo}<sup>th</sup></td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Blood</td>
                  <td  style={{width:"60%"}}>: {userInfo?.blood?.toUpperCase()}</td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>Is in Hall?</td>
                  <td  style={{width:"60%"}}>: {userInfo?.isHall ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td style={{width:"40%"}}>District</td>
                  <td  style={{width:"60%"}}>: {userInfo?.district}</td>
                </tr>
              </tbody>
            </table>
            <div className="viewProfile text-center mt-3">
              <Button variant="danger" onClick={()=>viewProfile(userInfo?._id)} size="sm" className='px-4 small shadow-none rounded-3' >
                <i className='bx bxs-user-badge me-1'></i>
                  {
                    userInfo?.email === user?.email ? "My Profile" : "View Profile"
                  }
              </Button>
            </div>
            <div className="pt-3">
              {/* <ul className='list-unstyled member-social-media'>
                <li><a href={userInfo?.facebookLink || "#"}><i className='bx bxl-facebook'></i></a></li>
                <li><a href={userInfo?.instagramLink || "#"}><i className='bx bxl-instagram'></i></a></li>
                <li><a href={userInfo?.twitterLink || "#"}><i className='bx bxl-twitter'></i></a></li>
                <li><a href={userInfo?.linkedinLink || "#"}><i className='bx bxl-linkedin'></i></a></li>
              </ul> */}
              <ul className="list-unstyled d-flex justify-content-center">
                  <li className='quick-contact-item'>
                    <a href={`tel:${isSocialWork ? primaryPhone : '+88017...'}`}><i className='bx bxs-phone'></i></a>
                  </li>
                  <li className='quick-contact-item'>
                    <a href={`sms:${isSocialWork ? primaryPhone : '+88017...'}`}><i className='bx bxs-message-rounded-detail'></i></a>
                  </li>
                  {userInfo?.whatsApp ? <li className='quick-contact-item'>
                    <a  href={`https://api.whatsapp.com/send?phone=${isSocialWork ? userInfo?.whatsApp : '+88017...'}`}><i className='bx bxl-whatsapp'></i></a>
                  </li> : <>
                  </>
                  }
                  <li className='quick-contact-item'>
                    <a href={isSocialWork ? (userInfo?.messengerLink || userInfo?.facebookLink) : 'https://facebook.com'}><i className='bx bxl-messenger'></i></a>
                  </li>
                  
                </ul>
            </div>
          </div>
        </div>
      </Col>
        
    </>
  );
};

export default MemberCard;