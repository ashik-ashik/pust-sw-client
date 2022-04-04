import React from 'react';
import { Col } from 'react-bootstrap';

const ProductCard = ({product}) => {
  const minus = document.querySelector(".qty-minus");
  const plus = document.querySelector(".qty-plus");
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
        <div className="p-2 bg-light">
          <div className="img">
            <img src={product?.imgUrl} style={{height:"200px", width:"100%"}} alt="" className="img-fluid" />
          </div>
          <h4 className="title-font">{product?.title}</h4>
          <div className="d-flex justify-content-between align-items-center">
            <div className="item-qty">
              <i onClick={qtyMinus} className="bx bxs-minus-circle qty-minus"></i>
              <input type="number" name="countqty" id="" defaultValue={1} />
              <i onClick={qtyPlus} className="bx bxs-plus-circle qty-plus"></i>
            </div>
            <p className="small text-danger fw-bold mb-0">{product?.price} ৳</p>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProductCard;