import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faCircleUser , faShoppingBag, faBars, faPerson, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { storeContext } from '../../context/storeContext';
import { useNavigate } from 'react-router-dom';

const NavbarCustom = ({ setShowLogin }) => {
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


  const { getTotalCartAmount, token, setToken } = useContext(storeContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <>
      <div className='navbar'>
        <Navbar expand="lg" className="bg-body">
          <Container fluid>
            <div className='navbar-left'>
            <Navbar.Collapse id="basic-navbar-nav">
              
                  <Nav className="navbar-menu">

                  <Nav.Link
                      href="/Home"
                      onClick={() => handleSetMenu("Home")}
                      className={menu === "Home" ? "active" : ""}
                    >
                      HOME
                    </Nav.Link>
    

                    <Nav.Link
                      href="#explore-menu"
                      onClick={() => handleSetMenu("Thực đơn")}
                      className={menu === "Thực đơn" ? "active" : ""}
                    >
                      THỰC ĐƠN
                    </Nav.Link>
                    <Nav.Link
                      href="#hot-deals"
                      onClick={() => handleSetMenu("Khuyến mãi")}
                      className={menu === "Khuyến mãi" ? "active" : ""}
                    >
                      KHUYẾN MÃI
                    </Nav.Link>
                    <Nav.Link
                      href="#book-party"
                      onClick={() => handleSetMenu("Dịch vụ tiệc")}
                      className={menu === "Dịch vụ tiệc" ? "active" : ""}
                    >
                      DỊCH VỤ TIỆC
                    </Nav.Link>
                    <Nav.Link
                      href="#shop-map"
                      onClick={() => handleSetMenu("footer")}
                      className={menu === "footer" ? "active" : ""}
                    >
                      CỬA HÀNG
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
            </div>
            <div className='navbar-right'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <div className='navbar-icons-bag'>
                <Link to='/cart'>
                  <FontAwesomeIcon icon={faShoppingBag} />
                </Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dotbag"}></div>
              </div>
              {!token ? <FontAwesomeIcon icon={faUser} onClick={() => { setShowLogin(true) }} />
                : <div className='navbar-profile'>
                  <FontAwesomeIcon icon={faCircleUser} />
                  <ul className='nav-profile-dropdown'>
                    <li onClick={()=> navigate('/myorders')}><FontAwesomeIcon icon={faPerson} /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /><p>Logout</p></li>
                  </ul>
                </div>}
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default NavbarCustom;
