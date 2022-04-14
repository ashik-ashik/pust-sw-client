import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useMember from '../../../hooks/useMembers/useMembers';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';


const ProductDetails = () => {
  const {id} = useParams();
  const {currentMember} = useMember();
  const [product, setProduct] = useState(null);
  const [addingCart, setAddingCart] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
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

  const addtocart = (id) => {
    setAddingCart(true);
    const qty = document.getElementById("product-qty").value;
    const {detail,tag, ...toCart} = product;
    toCart.customerId = currentMember?._id;
    toCart.productId = product?._id
    toCart.qty= parseInt(qty);
    

    axios.put('https://warm-earth-97575.herokuapp.com/addtocart', toCart)
    .then(res=>{
      setShowAdded(true)
      setAddingCart(false);
    })
  }

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
                <input type="number" name="countqty" id="product-qty" readOnly defaultValue={1} />
                <i onClick={qtyPlus} className="bx bxs-plus-circle qty-plus fs-3"></i>
              </div>
              <div className="d-flex align-items-center">
                <Button onClick={()=>addtocart(product?._id)} variant='primary' className='rounded-1 px-3 d-flex align-items-center me-2' size="sm">
                  {addingCart ? "Adding..." : <>
                  <i className='bx bx-cart-add me-2 fs-4' ></i> Add to cart
                  </>}
                  </Button>
                  {showAdded && <Link to='/my-cart'><Button size="sm">View Cart</Button></Link>}
              </div>
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