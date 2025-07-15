import React, { useContext } from 'react';
import './FoodItems.css';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { storeContext } from '../../context/storeContext';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const FoodItems = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(storeContext);

  return (
    <div className='foodCart'>
      <Card className='food-item' >
        <Card.Img variant="top" className='food-item-image' src={url + "/images/" + image} alt={name} />

        <Card.Body>
          <div className='container-fluid'>
            <Card.Text className='food-item-price'>{formatPrice(price)}</Card.Text>
            {!cartItems[id] ? (
              <FontAwesomeIcon className='add' icon={faCirclePlus} onClick={() => addToCart(id)} />
            ) : (
              <div className='food-item-counter'>
                <FontAwesomeIcon icon={faCircleMinus} style={{ color: 'red' }} onClick={() => removeFromCart(id)} />
                <p>{cartItems[id]}</p>
                <FontAwesomeIcon icon={faCirclePlus} style={{ color: 'green' }} onClick={() => addToCart(id)} />
              </div>
            )}
          </div>
          <Card.Title className='food-item-name'>{name}</Card.Title>
          <Card.Text className='food-item-desc'>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FoodItems;
