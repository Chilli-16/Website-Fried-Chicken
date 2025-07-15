import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Card, CardBody, Container } from 'react-bootstrap';
import { storeContext } from '../../context/storeContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(storeContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {

    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    console.log(orderItems); // Kiểm tra orderItems

    const userId = localStorage.getItem("userId");

    let orderData = {
      userId: userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2000,
    };
    console.log("Order Data:", orderData);

    try {
      let response = await axios.post(url + "/api/order/place", orderData, { headers: { Authorization: `Bearer ${token}` } });
      console.log(response.data);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount === 0){
      navigate('/cart')
    }

  }, [token])


  return (
    <Form onSubmit={placeOrder} className="cart" style={{ backgroundColor: "#eee" }}>
      <Container className='place-order-container '>
        <Row className="cart-items justify-content-center align-items-center ">
          <Col>
            <Card>
              <CardBody className="p-4">
                <Row>
                  <Col lg="7" md={6} className='place-order-left'>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          required
                          name='firstName'
                          onChange={onChangeHandler}
                          value={data.firstName}
                          type="text"
                          placeholder="First name"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          required
                          name='lastName'
                          onChange={onChangeHandler}
                          value={data.lastName}
                          type="text"
                          placeholder="Last name"
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridStreet">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        required
                        name='street'
                        onChange={onChangeHandler}
                        value={data.street}
                        placeholder="1234 Main St"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        name='city'
                        onChange={onChangeHandler}
                        value={data.city}
                      />
                    </Form.Group>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          required
                          name='country'
                          onChange={onChangeHandler}
                          value={data.country}
                          placeholder="Việt Nam"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          required
                          name='phone'
                          onChange={onChangeHandler}
                          value={data.phone}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select
                          required
                          name='state'
                          onChange={onChangeHandler}
                          value={data.state}
                        >
                          <option value="">Choose...</option>
                          <option value="state1">State 1</option>
                          <option value="state2">State 2</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control
                          required
                          name='zipcode'
                          onChange={onChangeHandler}
                          value={data.zipcode}
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check required type="checkbox" label="Check me out" />
                    </Form.Group>
                  </Col>

                  <Col lg="5" md={6} className='place-order-right'>
                    <Card className="cart-bottom text-black rounded-3">
                      <CardBody>
                        <h2>Cart Totals</h2>
                        <hr />
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
                          <Button variant="primary" type='submit'>
                            PROCEED TO PAYMENT
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default PlaceOrder;
