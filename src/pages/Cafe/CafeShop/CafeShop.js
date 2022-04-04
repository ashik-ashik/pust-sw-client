import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import ProductCard from '../ProductCard/ProductCard';

const CafeShop = () => {
  useEffect(()=>{
    document.title = "Central Cafetaria of PUST"
  },[]);
  const [products, setProducts] = useState(null);
  useEffect(()=>{
    fetch('https://warm-earth-97575.herokuapp.com/products')
    .then(res => res.json())
    .then(result => setProducts(result ? result : {}))
  },[]);
  
if(!products){
  return <Loading />
}
  return (
    <>
      <Hearder />
      <section className='py-4'>
        <Container>
          <Row xs={1} md={3} lg={4} className="g-3" >
            {
              products?.map(product => <ProductCard key={product?._id} product={product} />)
            }
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CafeShop;