import React, { useContext, useState } from 'react';
import './Siderbar.css'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { assets } from '../../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrumstickBite, faFire, faMapLocationDot, faGift, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';
import { storeContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu); 
  };

  const [menu, setMenu] = useState("menu");
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Thêm trạng thái cho slide menu


  const handleSetMenu = (newMenu) => {
    console.log(newMenu);
    setMenu(newMenu);
    if (isPanelOpen) {
      setIsPanelOpen(false); // Đóng menu khi chọn một mục
    }
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); // Chuyển đổi trạng thái của slide menu
  };

  const { token, setToken } = useContext(storeContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }



  return (
    <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
      <div
        className={
          closeMenu === false
            ? "logoContainer"
            : "logoContainer active"
        }
      >
        <Link to="/" onClick={() => handleSetMenu("Home")}>
          <img src={assets.logo} alt="KFC" className='logo' />
        </Link>
        <h2 className="title">KFC</h2>
      </div>
      <div
        className={
          closeMenu === false
            ? "burgerContainer"
            : "burgerContainer active"
        }
      >
        <div
          className="burgerTrigger"
          onClick={() => {
            handleCloseMenu();
          }}
        ></div>
        <div className="burgerMenu"></div>
      </div>
      <div
        className={
          closeMenu === false
            ? "profileContainer"
            : "profileContainer active"
        }
      >
        <img src={assets.profile} alt="profile" className='profile' />
        <div className="profileContents">
          <p className="name">Hello👋</p>
          <p>Chào mừng bạn đến với KFC!</p>
        </div>
      </div>
      <div
        className={
          closeMenu === false
            ? "contentsContainer"
            : "contentsContainer active"
        }
      >
        <ul>
          <li onClick={() => handleSetMenu("Thực đơn")} className={menu === "Thực đơn" ? "active" : ""} >
            <FontAwesomeIcon icon={faDrumstickBite} className="fa-icon"/>
            <a href="#explore-menu">Thực đơn</a>
          </li>
          <li
              onClick={() => handleSetMenu("Khuyến mãi")}
              className={menu === "Khuyến mãi" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faFire} className="fa-icon"/>
            <a href="#hot-deals">Khuyến mãi</a>
          </li>
          <li
                      onClick={() => handleSetMenu("Dịch vụ tiệc")}
                      className={menu === "Dịch vụ tiệc" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faGift}className="fa-icon" />
            <a href="#book-party">Dịch vụ tiệc</a>
          </li>
          <li
            onClick={() => handleSetMenu("shop-map")}
            className={menu === "shop-map" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faMapLocationDot}className="fa-icon" />
            <a href="#shop-map">Cửa hàng</a>
          </li>
          <li
            className={
              location.pathname === "/settings" ? "active" : ""
            }
          >
            <FontAwesomeIcon icon={faGear} className="fa-icon" />
            <a href="/">settings</a>
          </li>
          <li
            onClick={() => handleSetMenu("footer")}
            className={menu === "footer" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faHouse} className="fa-icon" />
            <a href="#footer">Về KFC</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
