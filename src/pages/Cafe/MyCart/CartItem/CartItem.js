import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartItem = ({cart, setUpdate, removeCartItem}) => {

  const [price, setPrice] = useState(cart?.price * cart?.qty);
  const qtyMinus = (e) => {
    const cc = e.target.nextElementSibling;
    let val = parseInt(cc.value);
    if(val > 0) {
      val -= 1;
    }
    cc.value = val;
    setPrice(val * cart?.price);
    setUpdate(true);

    axios.put(`https://warm-earth-97575.herokuapp.com/update-cart/${cart?.productId}`, {qty: val})
    .then(res=>{
    });

  }
  const qtyPlus = (e) => {
    const cc = e.target.previousElementSibling;
    let val = parseInt(cc.value);
    if(val < 20) {
      val += 1;
    }
    cc.value = val;
    setPrice(val * cart?.price)
    setUpdate(true)

    axios.put(`https://warm-earth-97575.herokuapp.com/update-cart/${cart?.productId}`, {qty: val})
    .then(res=>{
    });

  };


  
  return (
    <>
      <tr className='text-nowrap'>
        <td style={{width:'132px'}}><img src={cart?.imgUrl} className='img-fluid' style={{width:'130px ',height:"90px"}} alt="" /></td>
        <td className='text-nowrap'>
          <Link to={`/product/${cart?.productId}`}className="fs-4 title-font home-blog-title" >
            {cart?.title}
          </Link> <br />
          <Button onClick={()=>removeCartItem(cart?.productId)} variant='danger' className='px-3 rounded-0 ' size="sm"><i className="bx bx-x me-2"></i>Remove</Button>
        </td>
          
        <td>{cart?.price} ৳</td>
        <td>
          <div className="item-qty py-3">
            <i onClick={qtyMinus} className="bx bxs-minus-circle qty-minus fs-3"></i>
            <input type="number" name="countqty" id="product-qty" readOnly defaultValue={cart?.qty} />
            <i onClick={qtyPlus} className="bx bxs-plus-circle qty-plus fs-3"></i>
          </div></td>
        <td ><span className='sub-total'>{price}</span> ৳</td>
        
      </tr>
    </>
  );
};

export default CartItem;