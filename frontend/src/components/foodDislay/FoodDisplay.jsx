import React, { useContext } from 'react';
import './FoodDisplay.css';
import { storeContext } from '../../context/storeContext';
import FoodItems from '../foodItems/FoodItems';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(storeContext);
    console.log("Category:", category);
    console.log("Food List:", food_list);

    return (
        <div className='food-display' id='food-display'>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                        );
                    }
                    return null; // Trả về null nếu không hiển thị món ăn
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
