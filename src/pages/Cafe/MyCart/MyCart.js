import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useMember from '../../../hooks/useMembers/useMembers';
import Hearder from '../../CommonSections/Header/Hearder';

const MyCart = () => {
  const [cart, setCart] = useState(null);
  const {currentMember} = useMember();
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/my-cart/${currentMember?._id}`)
    .then(res=>res.json())
    .then(result => console.log(result))
  },[currentMember]);

  console.log(currentMember)
  return (
    <>
      <Hearder />
      <section className="py-4">
        <Container>
          my cart
        </Container>
      </section>
    </>
  );
};

export default MyCart;