import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';

const ProductDetails = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/product/${id}`)
    .then(res => res.json())
    .then(result => setProduct(result ? result : {}))
  },[id]);

  const qtyMinus = (e) => {
    const cc = e.target.nextElementSibling;
    let val = parseInt(cc.value);
    if(val > 0) {
      val -= 1;
    }
    cc.value = val;
  }
  const qtyPlus = (e) => {
    const cc = e.target.previousElementSibling;
    let val = parseInt(cc.value);
    if(val < 20) {
      val += 1;
    }
    cc.value = val;
  }

  console.log(product);
  if(!product){
    return <Loading />
  }
  return (
    <>
      <Hearder />
      <section className="py-4">
        <Container>
          <Row>
            <Col md='7'>
              <div className="img mb-3">
                <img style={{maxHeight:'250px'}} src={product?.imgUrl} alt="" className="img-fluid" />
              </div>
              <h3 className="title-font">{product?.title}</h3>
              <h2 className="text-danger">{product?.price} ৳</h2>
              <div className="item-qty py-3">
                <i onClick={qtyMinus} className="bx bxs-minus-circle qty-minus fs-3"></i>
                <input type="number" name="countqty" id="" defaultValue={1} />
                <i onClick={qtyPlus} className="bx bxs-plus-circle qty-plus fs-3"></i>
              </div>
              <Button variant='primary' className='rounded-1 px-3 d-flex align-items-center' size='sm'><i className='bx bx-cart-add me-2 fs-3' ></i> Add to cart</Button>
              <p className='mt-3' style={{fontSize:"13px"}}>
                <strong>Categories: </strong>{product?.categories} <br />
                <strong>Tags: </strong>{product?.tag?.map(tt => tt + ", ")}
              </p>
              <div className="product-details">
                <h3 className="title-font">Product Details:</h3>
                {product?.detail}
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;