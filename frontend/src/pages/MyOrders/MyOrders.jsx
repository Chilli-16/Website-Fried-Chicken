import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { storeContext } from '../../context/storeContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons';

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };
  

const MyOrders = () => {
    const { url, token } = useContext(storeContext);
    const [data, setData] = useState([]);
    const userId = localStorage.getItem("userId");

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", { userId: userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Response from server:", response);
            if (response.data.success) {
                setData(response.data.data); // Cập nhật data chỉ khi thành công
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error during fetchOrders:", error);
        }
    };

    useEffect(() => {
        if (token && userId) { // Kiểm tra cả token và userId
            fetchOrders();
        }
    }, [token, userId]); // Thêm userId vào dependency array

    return (
        <div className='my-orders'>
            <h1>My Orders</h1>
            <div className="container">
                {data.map((order, index) => {
                    return ( // Sửa từ 'retur' thành 'return'
                        <div key={index} className='my-orders-order'>
                            <FontAwesomeIcon icon={faBox} className="fa-icon" />
                            <p>{order.items.map((item, itemIndex) => {
                                if (itemIndex === order.items.length - 1) {
                                    return item.name + " x " + item.quantity; // Sửa 'lenght' thành 'length'
                                } else {
                                    return item.name + " x " + item.quantity + ", ";
                                }
                            })}</p>
                            <p>Amount: {formatPrice(order.amount)} </p>
                            <p>Items: {order.items.length}</p>
                            <p>Status: {order.status}</p>
                            <button>Track Order</button>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;
