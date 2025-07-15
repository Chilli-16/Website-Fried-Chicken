import React, { useState } from 'react'
import './Home.css'
import CarouselsCustom from '../../components/Carousels/CarouselsCustom'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/foodDislay/FoodDisplay.jsx'
import Hotdeals from '../../components/Hotdeals/Hotdeals.jsx'
import Party from '../../components/party/party.jsx'
import Map from '../../components/Map/Map.jsx'

const Home = () => {

  const [category, setCategory] = useState("All");
  return (
    <div>
      <CarouselsCustom />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <Hotdeals category={category} />
      <Party category={category}/>
      <Map category={category}/>
    </div>
  )
}

export default Home
