import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ReviewCard from './ReviewCard/ReviewCard';

const ManageReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [reviewReLoad, setReviewReLoad] = useState(false);
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/reviews`)
    .then(res=>res.json())
    .then(result => setReviews(result ? result : []));
    setReviewReLoad(false)
  },[reviewReLoad]);

  const needToReview = reviews?.filter(review => review.status === 'pending');
  console.log(reviews);
  return (
    <>
      <section className="py-4">
        <Container>
          <h2 className="title-font border-bottom pb-1">Manage user reviews:</h2>
          <h4 className="title-font text-dark">Pending Status:</h4>
          {
            needToReview?.length === 0 && <small>There is no panding review.</small>
          }
          <Row xs={1} md={2} lg={3} className='g-3 mb-4'>
            {needToReview?.map(review => <ReviewCard key={review?._id} review={review} setReviewReLoad={setReviewReLoad} />)}
          </Row>

          <h4 className="title-font text-dark mt-3">Manage Review:</h4>
          <Row xs={1} md={2} lg={3} className='g-3'>
          {reviews?.map(review => <ReviewCard key={review._id} review={review} setReviewReLoad={setReviewReLoad} />)}
          </Row>

        </Container>
      </section>
    </>
  );
};

export default ManageReviews;