import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:3000";
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState([])


    const addToCart = async (itemId) => {
        console.log("Adding item to cart:", itemId);
        // Cập nhật giỏ hàng trước
        setCartItems((prev) => {
            if (!prev[itemId]) {
                return { ...prev, [itemId]: 1 }; // Thêm mặt hàng mới
            } else {
                return { ...prev, [itemId]: prev[itemId] + 1 }; // Tăng số lượng
            }
        });

        // Gửi yêu cầu đến API
        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                console.error("Error adding item to cart:", error);
                // Hiển thị thông báo cho người dùng về lỗi
                alert("Failed to add item to cart. Please check your authentication.");
            }
        } else {
            alert("You need to log in to add items to the cart.");
        }
    };



    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCount = prev[itemId] - 1;
            if (newCount <= 0) {
                const { [itemId]: removed, ...rest } = prev; // Xóa hoàn toàn nếu số lượng bằng 0
                return rest;
            }
            return { ...prev, [itemId]: newCount }; // Giảm số lượng
        });

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                console.error("Error removing item from cart:", error);
                alert("Failed to remove item from cart. Please check your authentication.");
            }
        } else {
            alert("You need to log in to remove items from the cart.");
        }
    };


    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])

    // useEffect(() => {
    //     if (token) {
    //         localStorage.setItem("token", token);
    //     }
    // }, [token]);

    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) { // Kiểm tra itemInfo có tồn tại không
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            // console.log(response.data); // Kiểm tra phản hồi từ server
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    }

    const loadCartData = async (token) => {
        const userId = localStorage.getItem("userId"); // Lấy userId từ localStorage
        if (!token || !userId) {
            console.error("userId is missing");
            return; // Nếu không có userId, dừng hàm
        }

        try {
            const response = await axios.post(url + "/api/cart/get", { userId }, { headers: { Authorization: `Bearer ${token}` } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };


    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
    
            if (token && userId) {
                setToken(token);
                await loadCartData(token);
            } else {
                console.warn("User is not logged in or userId is missing.");
                // Thêm logic để xử lý khi userId không tồn tại, ví dụ như chuyển hướng đến trang đăng nhập
            }
        }
        loadData();
    }, []);
    

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken

    }
    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider