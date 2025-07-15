import React, { useState, useEffect } from 'react';
import './Order.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      // Kiểm tra URL
      if (!url) {
        console.error("URL is not defined");
        return; // Hoặc xử lý theo logic của bạn
      }
      console.log("Fetching orders from:", url + "/api/order/list");

      const response = await axios.get(url + "/api/order/list");

      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      if (error.response) {
        toast.error("Error: " + (error.response.data.message || "Unknown error from server"));
      } else if (error.request) {
        toast.error("Error: No response from server");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]); // Thêm url vào dependency array nếu cần

  return (
    <div className="order-add">
      <h1>Order Page</h1>
      <div className="container">
        {orders.map((order, index) => {
          return ( // Sửa từ 'retur' thành 'return'
            <div key={index} className='order-item-food'>
              <FontAwesomeIcon icon={faBox} className="fa-icon" />
              <p>{order.items.map((item, itemIndex) => {
                if (itemIndex === order.items.length - 1) {
                  return item.name + " x " + item.quantity; // Sửa 'lenght' thành 'length'
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}</p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <p className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </p>
              <p className="order-item-phone">
                {order.address.phone}
              </p>
              <p>Amount: {formatPrice(order.amount)} </p>
              <p>Items: {order.items.length}</p>
              <select>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          );
        }
        )}
      </div>
    </div>
  )
};

export default Order;
