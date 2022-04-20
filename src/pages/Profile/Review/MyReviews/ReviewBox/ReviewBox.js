import React from 'react';
import ReactStars from "react-rating-stars-component";
import '../../Review.css'

const ReviewBox = ({review}) => {
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
  console.log(review);
  return (
    <div className="shadow mb-4 p-3">
      <div className="d-flex align-items-center">
        <div className="profile-img me-2">
          <img className='review-pic' src={review.userPhoto || 'https://i.ibb.co/NZ07KB3/admin-user.png'} alt="" />
        </div>
        <div className="">
          <ReactStars {...startRating} />
          <h6 className='mb-0'>{review.userName}</h6>
        </div>
      </div>
      <p className="mb-0 mt-3 small">
        {review.review}
      </p>
    </div>
  );
};

export default ReviewBox;