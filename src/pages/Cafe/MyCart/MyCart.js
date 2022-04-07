import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
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
    setUpdate(0);
    console.log(isUpdate, subTotal);

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
            <Table striped bordered responsive size="sm">
              <thead>
                <tr className='text-nowrap'>
                  <th>Photo</th>
                  <th>Title</th>
                  <th>Product Price</th>
                  <th>QTY</th>
                  <th>Sub-Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  carts?.map(cart => <CartItem key={cart?._id}  cart={cart} setUpdate={setUpdate} removeCartItem={removeCartItem} />)
                }
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Sub Total:</td>
                  <td>{subTotal} ৳</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <Link to="/cafeteria"><Button size="sm" className="px-3 rounded-0" >Add More</Button></Link>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td> 
                    {/* disabled={!isUpdate} */}
                    <Button size="sm" className="px-3 rounded-0" disabled={!isUpdate} onClick={updateCart}>Update Cart</Button>
                  </td>
                </tr>
              </tbody>
            </Table>
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