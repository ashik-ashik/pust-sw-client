import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({product}) => {
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
  return (
    <>
      <Col>
        <div className=" bg-light">
          <div className="img">
            {/* <img src={product?.imgUrl} style={{height:"200px", width:"100%"}} alt="" className="img-fluid" /> */}
          </div>
          <div className="p-2">

            <Link to={`/product/${product?._id}`}>
              <h4 className="title-font home-blog-title">{product?.title}</h4>
            </Link>
            <div className="d-flex justify-content-between align-items-center py-3">
              <div className="item-qty">
                <i onClick={qtyMinus} className="bx bxs-minus-circle qty-minus fs-3"></i>
                <input type="number" name="countqty" id="" defaultValue={1} />
                <i onClick={qtyPlus} className="bx bxs-plus-circle qty-plus fs-3"></i>
              </div>
              <p className="small text-danger fw-bold mb-0">{product?.price} ৳</p>
            </div>
            <div className="d-flex mt-2">
              <Button variant='primary' className='rounded-1 px-3 d-flex align-items-center' size='sm'><i className='bx bx-cart-add me-2 fs-3' ></i> Add to cart</Button>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductCard;