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

  const pendingReview = reviews?.filter(review => review.status === 'pending');
  const approvedReview = reviews?.filter(review => review.status === 'approved');
  const rejectedReview = reviews?.filter(review => review.status === 'rejected');
  return (
    <>
      <section className="py-4">
        <Container fluid>
          <h2 className="title-font border-bottom pb-1">Manage user reviews:</h2>
          <h4 className="title-font text-dark">Pending Reviews:</h4>
          {
            pendingReview?.length === 0 && <small>There is no panding review.</small>
          }
          <Row xs={1} md={2} lg={3} className='g-3 mb-4 border-bottom pb-3'>
            {pendingReview?.map(review => <ReviewCard key={review?._id} review={review} setReviewReLoad={setReviewReLoad} />)}
          </Row>

          <h4 className="title-font text-dark mt-3">Approved Reviews:</h4>
          <Row xs={1} md={2} lg={3} className='g-3 mb-4 border-bottom pb-3'>
          {approvedReview?.map(review => <ReviewCard key={review._id} review={review} setReviewReLoad={setReviewReLoad} />)}
          </Row>

          <h4 className="title-font text-dark mt-3">Rejected Reviews:</h4>
          <Row xs={1} md={2} lg={3} className='g-3'>
          {rejectedReview?.map(review => <ReviewCard key={review._id} review={review} setReviewReLoad={setReviewReLoad} />)}
          </Row>

        </Container>
      </section>
    </>
  );
};

export default ManageReviews;