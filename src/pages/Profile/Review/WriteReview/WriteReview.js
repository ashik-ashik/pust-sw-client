import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";

const WriteReview = ({member, setReviewLoad}) => {
  
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating ] = useState(0);
  const [reviewPosted, setReviewPosted] = useState(false);


  const startRating = {
    size: 50,
    count: 5,
    color: "#333",
    activeColor: "darkorange",
    value: 0,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="bx bx-star" />,
    halfIcon: <i className="bx bxs-star-half" />,
    filledIcon: <i className="bx bxs-star" />,
    onChange: newValue => {
      setRating(newValue);
    }
  };

  const postReview = data =>{
    data.userEmail = member.email;
    data.userName = member.fullName;
    data.userId = member._id;
    data.postDate = new Date().toDateString().split(' ');
    data.status = 'pending';
    data.rating = rating;
    data.userPhoto = member.profilePic;
    data.userBatch = member.batchNo;
    console.log(data);
    axios.post(`https://warm-earth-97575.herokuapp.com/review-post`, data)
    .then(res=>{
      console.log(res);
      setRating(0);
      setReviewLoad(true);
      setReviewPosted(true)
    })
    reset();
  }
  
  return (
    <>
      <Form onSubmit={handleSubmit(postReview)}>
        <h3 className="text-dark text-center mt-3">Rate the Website:</h3>
        <div className="d-flex justify-content-center">
          <ReactStars {...startRating} />
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Write your Opinion:</Form.Label>
          <Form.Control {...register("review", { required: true})} as="textarea" rows={3} placeholder='Write a review' />
        </Form.Group>
        <div className="py-3 text-center">
          <Button type='submit' variant='success' className='rounded-0 shadow-none' >Submit</Button>
        </div>
      </Form>

      {/* review post complete */}
      <Modal show={reviewPosted} onHide={()=>setReviewPosted(false)} centered animation={true}>
        <Modal.Body>
          <div className="py-5 text-center">
            <i className="bx bxs-check-circle display-2 text-success"></i>
            <h3 className="title-font text-success">Thank You <strong className="title-font">{member.fullName}</strong></h3>
            <p className="m-0">
              Your Review posted successfully!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" className='px-4' size='sm' onClick={()=>setReviewPosted(false)}>
            Okay
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WriteReview;