import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth/useAuth';
import ReviewBox from './ReviewBox/ReviewBox';

const MyReviews = ({member, setReviewLoad, reviewLoad}) => {
  const {user}= useAuth()
  const [reviews, setReviews] = useState(null);
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/reviews/${member._id}`)
    .then(res=>res.json())
    .then(result => setReviews(result ? result : []))
    setReviewLoad(false)
  },[member._id, reviewLoad]);

  console.log(member);

  return (
    <>
      <h3 className="text-danger">{user.email !== member.email ? (member.gender === 'male' ? 'He' : 'She') : 'You'} {} have {reviews?.length ? reviews?.length : 'no'} Reviews.</h3>
      <div className="p-3">
      {
        reviews?.map(review => <ReviewBox key={review._id} review={review} />)
      }
      </div>
    </>
  );
};

export default MyReviews;