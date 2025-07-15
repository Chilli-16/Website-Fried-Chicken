import React, { useContext } from 'react'
import './Cart.css'
import { storeContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(storeContext);

  const navigate = useNavigate();

  return (
    <section className="cart " style={{ backgroundColor: "#eee" }}>
      <MDBContainer>
        <MDBRow className="cart-items  ">
          <MDBCol>
            <MDBCard>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol >
                    <div>
                      <h1 style={{ color: "black" }}>GIỎ HÀNG CỦA TÔI</h1>
                    </div>

                    <MDBCard className="cart-item-left">
                      {food_list.map((item, index) => {
                        if (cartItems[item._id] > 0) {
                          return (
                            <MDBCardBody key={item._id}>
                              <div className="cart-product ">
                                  
                                    <MDBCardImage src={url + "/images/" + item.image} alt="Shopping item" className="rounded-3" style={{ width: "5rem" }} />
                                  
                                  
                                    <MDBTypography tag="h6">
                                      {item.name}
                                    </MDBTypography>
                                  
                                  <MDBTypography tag="h6" >
                                    {formatPrice(item.price)}
                                  </MDBTypography>
                                
                                  <MDBTypography tag="h6" >
                                    {cartItems[item._id]}
                                  </MDBTypography>
                                
                                  <MDBTypography tag="h6" >
                                    {formatPrice(item.price * cartItems[item._id])}
                                  </MDBTypography>

                                  <a style={{ color: "black" }} onClick={() => removeFromCart(item._id)} className='cross'>
                                  <FontAwesomeIcon icon={faTrash} />
                                </a>
                              </div>

                            </MDBCardBody>
                          )
                        }
                      })}
                    </MDBCard>
                  </MDBCol>

                  <MDBCol lg="5">
                    <MDBCard className="cart-bottom  text-black rounded-3">
                      <MDBCardBody>
                        <h2>Cart Totals</h2>
                        <hr />
                        <div className="cart-promocode">
                          <div>
                            <h6> Bạn có mã giảm giá ?</h6>
                            <div className="cart-promocode-input">
                              <div>
                              <input type="text" placeholder=' Mã giảm giá*' />
                              <hr />
                              </div>
                              <button>Áp dụng</button>
              
                            </div>
                          </div>
                          <hr />
                        </div>
                        <div className="cart-total">
                          <div>
                            <div className="cart-total-details">
                              <h6>Tổng đơn hàng: </h6>
                              <p>{formatPrice(getTotalCartAmount())}</p>
                            </div>
                            <div className="cart-total-details">
                              <h6>Tổng cộng giảm giá: </h6>
                              <p style={{ color: "red" }}>{formatPrice(getTotalCartAmount() === 0 ? 0 : 2000)}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                              <b>Tổng thanh toán: </b>
                              <b>{formatPrice(getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2000)}</b>
                            </div>
                          </div>
                          <button onClick={() => navigate('/Order')}>Thanh toán</button>
                        </div>


                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

        </MDBRow>
      </MDBContainer>


    </section>

  )
}

export default Cart
