import React from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const ReviewSlider = ({review}) => {
  const startRating = {
    size: 20,
    count: 5,
    color: "#333",
    activeColor: "darkorange",
    value: review?.rating,
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
  return (
    <>
      <div className="p-3">
        <div className="p-3 shadow text-center">
        <p className="small mb-2">
          {review?.review.split(' ').slice(0,100).join(' ')}
        </p>
        <div className="d-flex justify-content-center mb-1">
        <ReactStars {...startRating} />
        </div>
        <h5 className="title-font"><Link to={`/member/${review?.userId}`}><span className="title-font">{review?.userName}</span></Link></h5>
        <Link to={`/member/${review?.userId}`}>
          <img className='d-inline-block mx-auto' style={{height:'60px', width:'auto'}} src={review?.userPhoto} alt="" />
        </Link>
        </div>
      </div>
    </>
  );
};

export default ReviewSlider;