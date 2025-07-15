import React from 'react'
import './Add.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Thực đơn mới"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  // useEffect(()=>{
  //   console.log(data);
  // }, [data])

  const onSubmitHander = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Thực đơn mới"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHander}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Uploaded Preview" />
            ) : (
              <FontAwesomeIcon icon={faUpload} />
            )}
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-catogory-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Thực đơn mới">"Thực đơn mới"</option>
              <option value="Combo 1 người">Combo 1 người</option>
              <option value="Combo nhóm">Combo nhóm</option>
              <option value="Gà rán-Gà quay">Gà rán-Gà quay</option>
              <option value="Burger-Cơm-Mì Ý">Burger-Cơm-Mì Ý</option>
              <option value="Thức ăn nhẹ">Thức ăn nhẹ</option>
              <option value="Thức uống&Tráng miệng">Thức uống&Tráng miệng</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='20000' />
          </div>
        </div>
        <button type="submit" className='add-btn'>ADD</button>
      </form>

    </div>
  )
}

export default Add
