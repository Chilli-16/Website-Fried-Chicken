import React from 'react';
import './Carousels.css';
import Carousel from 'react-bootstrap/Carousel';
import { assets } from '../../assets/assets';


function CarouselsCustom() {
  return (
    <div className="container-fluid">
      <Carousel>
        <Carousel.Item>
          <img src={assets.poster1} alt="poster1" className='poster1'/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={assets.poster2} alt="poster2" className='poster2'/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={assets.poster3} alt="poster3" className='poster3'/>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselsCustom;
