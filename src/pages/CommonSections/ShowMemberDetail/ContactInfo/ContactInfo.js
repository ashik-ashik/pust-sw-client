import React, { useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth/useAuth';
import { useForm } from "react-hook-form";
import axios from 'axios';

const ContactInfo = ({member}) => {
  const {user} = useAuth();

  const [phones, setPhones] = useState(member?.phone);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit } = useForm();
  const addContact = data => {
    let newPhone = '';
    if(!data.phone.startsWith('+88')){
      newPhone = "+88"+data.phone;
    }else{
      newPhone = data.phone;
    }
    const updatePhone = [...member?.phone, newPhone]
    axios.put(`https://warm-earth-97575.herokuapp.com/add-contact/${member._id}`, updatePhone)
    .then(res => {
      if(res.status === 200){
        window.location.reload();
      }
    })
    
  };
  
  const removePhone = index => {
    phones.splice(index, 1);
    setPhones(phones);    
    axios.put(`https://warm-earth-97575.herokuapp.com/remove-phone/${member._id}`, {phones})
    .then(res => {
      if(res.status === 200){
        window.location.reload();
      }
    })
  }
  
  const makeWhatsApp = number => {
    axios.put(`https://warm-earth-97575.herokuapp.com/add-whatsapp/${member._id}`, {number})
    .then(res => {
      if(res.status === 200){
        window.location.reload();
      }
    })
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
            <td className='text-nowrap'>Name:</td>
            <td className='text-nowrap'>{member?.fullName}</td>
            <td className='text-nowrap'></td>
          </tr>
          <tr className='py-3'>
            <td className='text-nowrap'>Email:</td>
            <td className='text-nowrap'> <a className='text-decoration-none text-lowercase contact-link' href={`mailto:${member?.email}`}>{member?.email}</a></td>
            <td className='text-nowrap'></td>
          </tr>
          {
            phones?.map((phone, indx)=> <tr key={indx}>
                <td className='text-nowrap'>{indx === 0 ? 'Primary' : "Phone "+indx} :</td>
                <td className='text-nowrap'><a className='text-decoration-none contact-link' href={`tel:${phone}`}> {phone} </a></td>
                <td className='text-nowrap text-center'>
                  {user?.email === member?.email && <> 
                  <Button className='p-0 bg-transparent border-0 shadow-none' disabled={indx === 0 ? true : false} onClick={()=>removePhone(indx)}>
                    <i className="bx bxs-trash text-danger delete-phone fs-5"></i>
                  </Button>
                  </>}
                </td>
            </tr> 
            )
          }
          {member?.whatsApp && <tr>
            <td className='text-nowrap'>WhatsApp:</td>
            <td className='text-nowrap'> <a className='text-decoration-none text-lowercase contact-link' href={`https://api.whatsapp.com/send?phone=${member?.whatsApp}`}>{member?.whatsApp}</a></td> 
            <td className='text-nowrap text-center'><i className="bx bxl-whatsapp-square fs-5 text-success"></i></td>
          </tr>
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
                </td>
              </tr>
              {
                phones?.map((phone, indx)=> <tr key={indx}>
                    <td>{2+indx}</td>
                    <td className='small text-nowrap'>{phone}</td>
                    <td className='text-nowrap'>
                      {/* <i className="bx bx-edit me-2 test-success fs-4"></i> */}
                      <Form.Check onChange={()=> makeWhatsApp(phone)} type="radio" defaultChecked={phone === member?.whatsApp ? true : false} disabled={phone === member?.whatsApp ? true : false} label={`${phone === member?.whatsApp ? "Added" : "Make as Whats App"}`} style={{fontSize:"11px"}} name='make-whatsapp'></Form.Check>
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