import React, {
  useState
} from 'react';
import {
  Button,
  Col,
  Row,
  Table,
  Modal,
  Form
} from 'react-bootstrap';
import {
  useNavigate
} from 'react-router-dom';
import useAuth from '../../../hooks/useAuth/useAuth';
import axios from 'axios';

const ShowMemberDetail = ({
    member
  }) => {
    const {
      user
    } = useAuth();
    const navigate = useNavigate();

    const updateProfile = id => {
      navigate(`/update-profile/${id}`);
    };

    // update CR-ship
    const [showCR, setShowCR] = useState(false);
    const handleCloseCR = () => setShowCR(false);
    const updateCR = (id) => {
      setShowCR(true)
    }
    const submitCRship = (e) => {
      const isCR = document.getElementById("CRship").checked;
      console.log(isCR)
      axios.put(`https://warm-earth-97575.herokuapp.com/upload-cr-ship/${member?._id}`, {
          isCR,
          CRstatus: 'pending'
        })
        .then(res => {
          setShow(false);
          window.location.reload();
        })
    }

    // upload profile picture
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const clickFile = () => {
      setShow(true);
    };
    const submitFile = (e) => {
      const file = document.getElementById("file").files[0];
      const formData = new FormData();
      formData.append("image", file)
      axios.put(`https://warm-earth-97575.herokuapp.com/upload-profile/${member?._id}`, formData)
        .then(res => {
          setShow(false);
          window.location.reload();
        });
    }
    const imageURL = `data:image/png;base64,${member?.profilePic}`
    if (!member) {
      return < >
        <
        Row >
        <
        Col > < /Col> <
        Col md = "5"
      className = "styled-heading" > Loading.... < /Col> <
        Col > < /Col> <
        /Row> <
        />
    }
    return ( <
        >
        <
        Row >
        <
        Col > < /Col> <
        Col md = "9" >
        <
        div className = "profilePic text-center py-4"
        style = {
          {
            backgroundImage: `url(${imageURL})`
          }
        } >

        {
          member ? .profilePic ?
          <
          img className = 'profile-pic'
          src = {
            imageURL
          }
          alt = "" / > :
          <
          img className = 'profile-pic'
          src = "https://i.ibb.co/17b0X70/profile-avatar.jpg"
          alt = "" / >
        } <
        div className = "mt-3" >
        <
        Button onClick = {
          clickFile
        }
        variant = "success"
        size = "sm"
        className = "px-4 rounded-0" > < i className = 'bx bxs-camera fs-6' > < /i> Upload Profile</Button >
        <
        /div> <
        /div> <
        h2 className = 'mb-3 mt-2 text-center styled-heading' > {
          member ? .fullName
        } {
          member ? .isCR && < sup className = "cr-badge" > CR < /sup>}</h2 > {
              user ? .email === member ? .email && !member ? .isCR && < >
              <
              p > Are you CR of your class ? < span className = 'cr-ship'
              onClick = {
                () => updateCR(member ? ._id)
              } > Set CRship < /span></p >
              <
              />
            } <
            Table responsive striped bordered size = "sm" >
            <
            thead >
            <
            tr >
            <
            th > Title < /th> <
            th > Information : < /th> <
            /tr> <
            /thead> <
            tbody className = 'text-capitalize' > {
              /* <tr>
                                    <td>Name:</td>
                                    <td>{member?.fullName}</td>
                                  </tr> */
            } <
            tr >
            <
            td > Email: < /td> <
            td > < a className = 'text-decoration-none text-lowercase'
          href = {
              `mailto:${member?.email}`
            } > {
              member ? .email
            } < /a></td >
            <
            /tr> <
            tr >
            <
            td > Phone: < /td> <
            td > < a className = 'text-decoration-none'
          href = {
              `tel:${member?.phone}`
            } > {
              member ? .phone
            } < /a></td >
            <
            /tr> <
            tr >
            <
            td > Blood Group: < /td> <
            td > {
              member ? .blood ? .toUpperCase()
            } < /td> <
            /tr> <
            tr >
            <
            td > Reg: < /td> <
            td > {
              member ? .reg
            } < /td> <
            /tr> <
            tr >
            <
            td > Roll: < /td> <
            td > {
              member ? .roll
            } < /td> <
            /tr> {
              member ? .isCR && < tr >
                <
                td > Roll : < /td> <
                td > {
                  member ? .roll
                } < /td> <
                /tr>} <
                tr >
                <
                td > Dept. < /td> <
                td > {
                  member ? .dept
                } < /td> <
                /tr> <
                tr >
                <
                td > Session. < /td> <
                td > {
                  member ? .session
                } < /td> <
                /tr>

                <
                tr >
                <
                td > < /td> <
                td className = 'text-danger' > Present Address < /td> <
                /tr> <
                tr >
                <
                td > In Hall ? < /td> <
                td > {
                  member ? .isHall ? "Yes" : "No"
                } < /td> <
                /tr> {
                  member ? .isHall ? < >
                    <
                    tr >
                    <
                    td > Hall Name < /td> <
                    td > {
                      member ? .hallName
                    } < /td> <
                    /tr> <
                    tr >
                    <
                    td > Block < /td> <
                    td > {
                      member ? .hallBlock.toUpperCase()
                    } < /td> <
                    /tr> <
                    tr >
                    <
                    td > Room No < /td> <
                    td > {
                      member ? .hallRoom
                    } < /td> <
                    /tr> 

                    <
                    /> : <>

                    <
                    tr >
                    <
                    td > Mess Name < /td> <
                    td > {
                      member ? .messName
                    } < /td> <
                    /tr> <
                    tr >
                    <
                    td > Mess Address < /td> <
                    td > {
                      member ? .messAddress
                    } < /td> <
                    /tr> <
                    />
                } <
                tr >
                <
                td > < /td> <
                td className = 'text-danger' > Parmanent Address < /td> <
                /tr> <
                tr >
                <
                td > Village < /td> <
                td > {
                  member ? .village
                } < /td> <
                /tr> <
                tr >
                <
                td > District < /td> <
                td > {
                  member ? .district
                } < /td> <
                /tr> <
                tr >
                <
                td > Division < /td> <
                td > {
                  member ? .division
                } < /td> <
                /tr> <
                tr >
                <
                td > Registred At < /td> <
                td > {
                  member ? .registerDate
                } < small className = 'text-uppercase fw-bold'
              style = {
                  {
                    fontSize: "11px"
                  }
                } > (mm / dd / yy) < /small></td >
                <
                /tr>

                <
                /tbody> <
                /Table> <
                div className = "socital-media py-4 bg-light" >
                <
                ul className = 'list-unstyled member-social-media w-75 mx-auto' >
                <
                li > < a href = {
                  member ? .facebookLink || "#"
                } > < i className = 'bx bxl-facebook' > < /i></a > < /li> <
                li > < a href = {
                  member ? .instagramLink || "#"
                } > < i className = 'bx bxl-instagram' > < /i></a > < /li> <
                li > < a href = {
                  member ? .twitterLink || "#"
                } > < i className = 'bx bxl-twitter' > < /i></a > < /li> <
                li > < a href = {
                  member ? .linkedinLink || "#"
                } > < i className = 'bx bxl-linkedin' > < /i></a > < /li> <
                /ul> <
                /div> {
                  user ? .email === member ? .email && < >
                    <
                    div className = "mt-4" >
                    <
                    p className = "small mb-2" >
                    You can add your social media links so that people can connect with you easily. <
                    /p> <
                    Button onClick = {
                      () => updateProfile(member ? ._id)
                    }
                  variant = 'success'
                  className = 'rounded-0 px-4' > Edit Profile < /Button> <
                    /div> <
                    />
                } <
                /Col> <
                Col > < /Col> <
                /Row>

                <
                Modal show = {
                  show
                }
              onHide = {
                handleClose
              }
              centered animation = {
                  true
                } >
                <
                Modal.Header className = 'fs-5 shadow-none' >
                <
                Modal.Title > Upload Profile Picture < /Modal.Title> <
                /Modal.Header> <
                Modal.Body >
                <
                Form >
                <
                Form.Group className = "mb-3" >
                <
                Form.Label > Select your photo < /Form.Label> <
                Form.Control id = 'file'
              type = "file"
              size = "sm" / >
                <
                /Form.Group> <
                Button variant = "success"
              className = 'shadow-none rounded-1 px-4'
              size = "sm"
              onClick = {
                  submitFile
                } >
                Upload <
                /Button> <
                /Form> <
                /Modal.Body> <
                Modal.Footer >
                <
                Button variant = "secondary"
              onClick = {
                  handleClose
                } >
                Cancel <
                /Button> {
                  /* <Button variant="primary" onClick={handleClose}>
                              Save Changes
                            </Button> */
                } <
                /Modal.Footer> <
                /Modal>

              {
                /* update CR-ship */ } <
              Modal show = {
                showCR
              }
              onHide = {
                handleClose
              }
              centered animation = {
                  true
                } >
                <
                Modal.Header className = 'fs-5 shadow-none' >
                <
                Modal.Title > Update your CR - ship < /Modal.Title> <
                /Modal.Header> <
                Modal.Body >
                <
                Form >

                <
                Form.Group className = "mb-3" >
                <
                Form.Label > Are you CR of your class ? < /Form.Label> <
                Form.Check
              type = "switch"
              id = "CRship"
              label = "Yes, I'm CR" /
                >
                <
                /Form.Group> <
                Button variant = "success"
              className = 'shadow-none rounded-1 px-4'
              size = "sm"
              onClick = {
                  submitCRship
                } >
                Update <
                /Button> <
                /Form> <
                /Modal.Body> <
                Modal.Footer >
                <
                Button variant = "secondary"
              onClick = {
                  handleCloseCR
                } >
                Cancel <
                /Button> {
                  /* <Button variant="primary" onClick={handleClose}>
                              Save Changes
                            </Button> */
                } <
                /Modal.Footer> <
                /Modal>

                <
                />
            );
        };

        export default ShowMemberDetail;