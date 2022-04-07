import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useMember from '../../../hooks/useMembers/useMembers';
import Hearder from '../../CommonSections/Header/Hearder';
import Loading from '../../CommonSections/Loading/Loading';
import CartItem from './CartItem/CartItem';

const MyCart = () => {
  const [carts, setCart] = useState(null);
  const {currentMember} = useMember();
  const [subTotal, setSubTotal] = useState(0);
  const [isUpdate, setUpdate] = useState(false);
  const [itemDeleted, setDeleted] = useState(false);


  useEffect(()=>{
    fetch(`https://warm-earth-97575.herokuapp.com/my-cart/${currentMember?._id}`)
    .then(res=>res.json())
    .then(result => setCart(result ? result : [] ));    
  },[currentMember, itemDeleted]);

  // qty
  const updateCart = ()=>{
    setUpdate(false)
    const subPrices = document.querySelectorAll(".sub-total");
    let sum = 0;
    subPrices?.forEach(subP => {sum += parseInt(subP.innerText)});
    setSubTotal(sum);
  }

  useEffect(()=>{
    let sum = 0;
    if(carts?.length > 0){
      carts?.forEach(current => {sum += (current?.price * current?.qty)} )
    }
    setSubTotal(sum);
  }, [carts])



  
  // remove cart item
  const removeCartItem = id => {
    console.log(id);
    axios.delete(`https://warm-earth-97575.herokuapp.com/delete-cart/${id}`)
    .then(res => {
      if(res.status === 200){
        setCart(null)
        setDeleted(true);
      }
    })
  }

  let totalItems = 0;
  carts?.forEach((current)=> {totalItems += parseInt(current?.qty)});
  let delivery_charge = 0;
  if(currentMember?.division?.toLowerCase() === 'rajshahi') {
      delivery_charge = 10;
  } 
  else if(currentMember?.division?.toLowerCase() === 'dhaka'){
    delivery_charge = 40;
  }
  else if(currentMember?.division?.toLowerCase() === 'rangpur'){
    delivery_charge = 30;
  }
  else if(currentMember?.division?.toLowerCase() === 'chottogram'){
    delivery_charge = 70;
  }
  else if(currentMember?.division?.toLowerCase() === 'barishal'){
    delivery_charge = 60;
  }
  else if(currentMember?.division?.toLowerCase() === 'khulna'){
    delivery_charge = 50;
  }
  else if(currentMember?.division?.toLowerCase() === 'maymanshin'){
    delivery_charge = 40;
  }
  else if(currentMember?.division?.toLowerCase() === 'sylhet'){
    delivery_charge = 45;
  }
  else{
    delivery_charge = 55;
  }
 
  const totalCost = subTotal + delivery_charge;
    if(!carts){
      return <Loading />
    }


  return (
    <>
      <Hearder />
      <section className="py-4">
        <Container>
          
        <h2 className="border-start border-3 border-primary ps-3 title-font text-success mb-4">My Cart</h2>
        {
          carts?.length > 0 ? <>
            <Row className='g-3 align-items-strach'>
              <Col lg="9">
                <Table bordered responsive size="sm">
                  <thead>
                    <tr className='text-nowrap text-center'>
                      <th>Product Photo</th>
                      <th>Product Details</th>
                      <th>Price</th>
                      <th>QTY</th>
                      <th>Sub-Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      carts?.map(cart => <CartItem key={cart?._id}  cart={cart} setUpdate={setUpdate} removeCartItem={removeCartItem} />)
                    }
                    
                  </tbody>
                </Table>
                <div className="border-top border-1 mt-1 pt-2 d-flex align-items-center justify-content-between">
                  <div>
                  <Link to="/cafeteria"><Button size="sm" className="px-3 rounded-0" >Add More</Button></Link>
                  </div>
                  <div>
                  <Button size="sm" className="px-3 rounded-0" disabled={!isUpdate} onClick={updateCart}>Update Cart</Button>
                  </div>
                </div>
              </Col>
              <Col className="bg-light">
                <div className="bg-light p-3">
                  <h3 className="title-font fw-bold border-bottom pb-1 border-2 border-dark">Order Summary:</h3>
                  <Table>
                    <tbody className='small text-nowrap'>
                      <tr>
                        <th>Products</th>
                        <td>{carts?.length}</td>
                      </tr>
                      <tr>
                        <th>Total Items</th>
                        <td>{totalItems}</td>
                      </tr>
                      <tr>
                        <th>Sub Total</th>
                        <td>{subTotal} ৳</td>
                      </tr>
                      <tr>
                        <th>Delivary</th>
                        <td>{delivery_charge} ৳</td>
                      </tr>
                    </tbody>
                    <tfoot className='border-top border-2 border-dark'>
                      <tr>
                        <th className='fs-6'>Total Cost</th>
                        <td className='fs-6 text-danger fw-bold'>{totalCost} ৳</td>
                      </tr>
                    </tfoot>
                  </Table>
                  <div className="d-grid">
                    <Button variant='success' className='rounded-0 px-4 text-uppercase'>Checkout</Button>
                  </div>
                </div>
              </Col>
            </Row>
          </> : <>
            <h3 className="title-font">You have no cart Item</h3>
            <p className="small">Back to the store page and add to cart  
            <Link to="/cafeteria" className="ms-2">Back to Store</Link>
            </p>
          </>
        }
        
        </Container>
      </section>
    </>
  );
};

export default MyCart;