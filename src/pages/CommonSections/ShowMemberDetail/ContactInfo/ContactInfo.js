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
    const updatePhone = [...member?.phone, data.phone]
    axios.put(`https://warm-earth-97575.herokuapp.com/add-contact/${member._id}`, updatePhone)
    .then(res => {
      console.log(res.starus)
      if(res.status === 200){
        window.location.reload();
      }
    })
    console.log(updatePhone)
  };
  const removePhone = index => {

  }


  return (
    <>
      <Table responsive striped bordered size="sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Information:</th>
            <th>Action:</th>
          </tr>
        </thead>
        <tbody  className='text-capitalize'>
          <tr>
            <td>Name:</td>
            <td>{member?.fullName}</td>
            <td></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td> <a className='text-decoration-none text-lowercase' href={`mailto:${member?.email}`}>{member?.email}</a></td>
            <td></td>
          </tr>
          {
            member?.phone?.map((phone, indx)=> <tr key={indx}>
                <td>Phone {indx === 0 ? '' : indx} :</td>
                <td><a className='text-decoration-none' href={`tel:${phone}`}> {phone} </a></td>
                <td>
                  <i onClick={removePhone} className="bx bxs-trash text-danger fs-5"></i>
                </td>
            </tr> 
            )
          }         

        </tbody>
      </Table>
      <div className="py-3">
        {
          user?.email === member?.email && <>
            <Button onClick={handleShow} size="sm" variant="success">Edit Contact</Button>
          </>
        }
      </div>

        {/* add new contact */}
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Add a new Contact </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>#</th>
                <th className='text-nowrap'>Contact Info</th>
                <th className='text-nowrap'>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className='small text-nowrap'>{member?.email}</td>
                <td className='text-nowrap'>
                  <i className="bx bx-edit me-2 test-success fs-4"></i>
                  <i className="bx bx-trash text-danger fs-4"></i>
                </td>
              </tr>
              {
                member?.phone?.map((phone, indx)=> <tr key={indx}>
                    <td>{2+indx}</td>
                    <td className='small text-nowrap'>{phone}</td>
                    <td>
                      <i className="bx bx-edit me-2 test-success fs-4"></i>
                      <i className="bx bx-trash text-danger fs-4"></i>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
          <Form onSubmit={handleSubmit(addContact)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='small'>Add new phone number:</Form.Label>
              <Form.Control {...register(`phone`, {required: true})} type="text" placeholder="017xxxxxxxx" />
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