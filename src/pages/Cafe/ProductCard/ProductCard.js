import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useMember from '../../../hooks/useMembers/useMembers';

const ProductCard = ({product, index, setIsAddNew}) => {

  const {currentMember} = useMember();
  const [addingCart, setAddingCart] = useState(false);
  const [added, setAdded] = useState(false)
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
    if(val < 100) {
      val += 1;
    }
    cc.value = val;
  };

  const addToCart = () => {
    setAddingCart(true);
    const qty = parseInt(document.getElementById(`qty${index}`).value);
    const {detail,tag, ...toCart} = product;
    toCart.customerId = currentMember?._id;
    toCart.productId = product?._id
    toCart.qty= parseInt(qty);
    

    axios.put('https://pust-sw-server.vercel.app/addtocart', toCart)
    .then(res=>{
      setAddingCart(false);
      setAdded(true);
      setIsAddNew(product?._id)
    })
  }

  return (
    <>
      <Col>
        <div className=" bg-light">
          <div className="img">
            <img src={product?.imgUrl} style={{height:"200px", width:"100%"}} alt="" className="img-fluid" />
          </div>
          <div className="p-2">

            <Link to={`/product/${product?._id}`}>
              <h4 className="title-font home-blog-title">{product?.title}</h4>
            </Link>
            <div className="d-flex justify-content-between align-items-center py-3">
              <div className="item-qty">
                <i onClick={qtyMinus} className="bx bxs-minus-circle qty-minus fs-3"></i>
                <input type="number" name="countqty" id={`qty${index}`} readOnly defaultValue={1} />
                <i onClick={qtyPlus} className="bx bxs-plus-circle qty-plus fs-3"></i>
              </div>
              <p className="small text-danger fw-bold mb-0">{product?.price} ৳</p>
            </div>
            <div className="d-flex mt-2">
              <Button onClick={()=> addToCart()} variant='primary' className='rounded-1 px-3 d-flex align-items-center' size='sm'>
                <i className='bx bx-cart-add me-2 fs-5' ></i>
                {
                  added ? "Already Added" :<>
                  {addingCart ? <Spinner animation="border" variant="light" /> : "Add to cart"}
                  </>

                }                 
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductCard;