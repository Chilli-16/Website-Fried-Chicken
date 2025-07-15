import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import NavbarCustom from './components/Navbar/NavbarCustom';
import FooterCustom from './components/Footer/FooterCustom';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Siderbar from './components/Siderbar/Siderbar';
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders';


function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
     {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className= 'app'>
        <NavbarCustom setShowLogin= {setShowLogin}/>
        <Siderbar setShowLogin= {setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/Home' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Order' element={<PlaceOrder />}  />
          <Route path='/verify' element={<Verify />}/>
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <FooterCustom/>
    </>
    
  )
}

export default App
