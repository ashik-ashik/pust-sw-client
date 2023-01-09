import React, { useEffect, useState } from 'react';
import { Badge, Container, Nav, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useMember from '../../../hooks/useMembers/useMembers';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import ProductCard from '../ProductCard/ProductCard';

const CafeShop = () => {
  useEffect(()=>{
    document.title = "Central Cafetaria of PUST"
  },[]);
  const [products, setProducts] = useState(null);
  const [isAddNew, setIsAddNew] = useState('')
  useEffect(()=>{
    fetch('https://pust-sw-server.vercel.app/products')
    .then(res => res.json())
    .then(result => setProducts(result ? result : {}))
  },[]);

  const [carts, setCart] = useState(null);
  const {currentMember} = useMember();
  useEffect(()=>{
    fetch(`https://pust-sw-server.vercel.app/my-cart/${currentMember?._id}`)
    .then(res=>res.json())
    .then(result => setCart(result ? result : {} ))
  },[currentMember, isAddNew]);
  
if(!products){
  return <Loading />
}
  return (
    <>
      <Hearder><Nav.Link as={NavLink} to="/my-cart"><i className='bx bxs-shopping-bag text-white'></i><sup><Badge bg="danger">{carts?.length}</Badge></sup></Nav.Link></Hearder>
      <section className='py-4'>
        <Container>
          
          <Row xs={1} md={3} lg={4} className="g-3" >
            {
              products?.map((product, index) => <ProductCard key={product?._id} product={product} index={index} setIsAddNew={setIsAddNew} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CafeShop;