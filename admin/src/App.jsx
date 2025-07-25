import React from 'react'
import Navbar from './component/Navbar/NavbarCustom'
import Sidebar from './component/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Order from './pages/Order/Order'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const App = () => {

const url = "http://localhost:3000";

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url= {url} />} />
          <Route path="/list" element={<List url= {url} />} />
          <Route path="/orders" element={<Order url= {url} />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
