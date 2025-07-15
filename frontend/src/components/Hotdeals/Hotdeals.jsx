import React from 'react'
import './Hotdeals.css'
import Carousel from 'react-bootstrap/Carousel';
import { assets } from '../../assets/assets';


const Hotdeals = () => {
  return (
    <div className='hot-deals' id='hot-deals'>
      <hr />
      <div className="heading-hotdeals">
        <h1>KHUYẾN MÃI HOT</h1>
      </div>
      <div className="container-fluid">
      <Carousel className='hotdeals'>
        <Carousel.Item>
          <img src={assets.hotdeals1} alt="hotdeals1" className='hotdels-img'/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={assets.hotdeals2} alt="hotdeals2" className='hotdels-img'/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={assets.hotdeals3} alt="hotdeals3" className='hotdels-img'/>
        </Carousel.Item>
      </Carousel>
    </div>
    </div>
  )
}

export default Hotdeals
