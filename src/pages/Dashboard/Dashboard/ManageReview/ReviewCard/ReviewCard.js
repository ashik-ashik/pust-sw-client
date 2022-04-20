import axios from 'axios';
import React from 'react';
import { Button, Col } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const ReviewCard = ({review, setReviewReLoad}) => {
  const startRating = {
    size: 30,
    count: 5,
    color: "#333",
    activeColor: "darkorange",
    value: review.rating,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="bx bx-star" />,
    halfIcon: <i className="bx bxs-star-half" />,
    filledIcon: <i className="bx bxs-star" />,
    edit: false,
    onChange: newValue => {
      console.log(newValue);
    }
  };
  const manageReviewStatus = (sts) => {
    axios.put(`https://warm-earth-97575.herokuapp.com/review-status-update/${review._id}`, {status : sts})
    .then(res=>{
      console.log(res);
      setReviewReLoad(true);
    })
  };

  const deleteReview = (id) => {
    axios.delete(`https://warm-earth-97575.herokuapp.com/review-delete/${id}`)
    .then(res=>{
      console.log(res);
      setReviewReLoad(true);
    })
  }
  return (
    <>
      <Col>
        <div className="shadow p-3">
          <img className='text-center d-block mx-auto mb-3' style={{width:'100px',height:'100px'}} src={review?.userPhoto || 'https://i.ibb.co/NZ07KB3/admin-user.png'} alt="" />
          <h4 className="title-font text-center"><Link to={`/member/${review?.userId}`}>{review?.userName}</Link></h4>
          
          <div className="d-flex justify-content-center mb-2">
            <ReactStars {...startRating} />
          </div>
          <p className="mb-1">
            {review?.review}
          </p>
              <Button onClick={()=>manageReviewStatus('approved')} variant='success' className='rounded-0 shadow-none px-3 me-2' size='sm'>{review?.status === 'approved' ? 'Approved' : 'Approve'}</Button>
              <Button onClick={()=>manageReviewStatus('rejected')} variant='warning' className='rounded-0 shadow-none px-3 me-2' size='sm'>{review?.status === 'rejected' ? 'Rejected' : 'Reject'}</Button>
              <Button onClick={()=>deleteReview(review?._id)} variant='danger' className='rounded-0 shadow-none px-3 me-2' size='sm'>Delete</Button>
        </div>
      </Col>
    </>
  );
};

export default ReviewCard;