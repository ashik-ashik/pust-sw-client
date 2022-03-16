import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth/useAuth';
import { useForm } from "react-hook-form";
import axios from 'axios';

const ContactInfo = ({member}) => {
  const {user} = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit } = useForm();
  const addContact = data => {
    data.phoneCount = member.phoneCount + 1;
    console.log(data)
    axios.put(`http://localhost:5500/add-contact/${member._id}`, data)
    .then(res => {
      console.log(res.starus)
      if(res.status === 200){
        window.location.reload();
      }
    })
    // handleClose(false)
  }


  return (
    <>
      <Table responsive striped bordered size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Information:</th>
          </tr>
        </thead>
        <tbody  className='text-capitalize'>
          <tr>
            <td>Name:</td>
            <td>{member?.fullName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td> <a className='text-decoration-none text-lowercase' href={`mailto:${member?.email}`}>{member?.email}</a></td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td><a className='text-decoration-none' href={`tel:${member?.phone}`}> {member?.phone} </a></td>
          </tr>
          {
           member?.phone2 && <tr>
            <td>Phone 2:</td>
            <td><a className='text-decoration-none' href={`tel:${member?.phone2}`}> {member?.phone2} </a></td>
          </tr>
          }
          {
           member?.phone3 && <tr>
            <td>Phone 3:</td>
            <td><a className='text-decoration-none' href={`tel:${member?.phone3}`}> {member?.phone3} </a></td>
          </tr>
          }
          {
           member?.phone4 && <tr>
            <td>Phone 4:</td>
            <td><a className='text-decoration-none' href={`tel:${member?.phone4}`}> {member?.phone4} </a></td>
          </tr>
          }

        </tbody>
      </Table>
      <div className="py-3">
        {
          user?.email === member?.email && <>
            <Button onClick={handleShow} size="sm" variant="success">Add Contact</Button>
          </>
        }
      </div>

        {/* add new contact */}
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Add a new Contact </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled">
            <li className="small">Email: {member?.email}</li>
            <li className="small">Phone 1: {member?.phone}</li>
            {member?.phone2 && <li className="small">Phone 2: {member?.phone2}</li>}
            { member?.phone3 && <li className="small">Phone 3: {member?.phone3}</li>}
            {member?.phone4 && <li className="small">Phone 4: {member?.phone4}</li>}
          </ul>
          <Form onSubmit={handleSubmit(addContact)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='small'>Add new phone number:</Form.Label>
              <Form.Control {...register(`phone${member?.phoneCount + 1}`, {required: true})} type="text" placeholder="017xxxxxxxx" />
            </Form.Group>
            <Button variant="success" size="sm" type="submit">
              Add number
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" size="sm" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default ContactInfo;