import React from 'react'
import './List.css'
import { Table } from 'react-bootstrap'
import axios from "axios"
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const responsen = await axios.post(`${url}/api/food/remove`, { _id: foodId });
    await fetchList();
    if (responsen.data.success) {
      toast.success(responsen.data.message)
    } else {
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col '>
      <p>All Foods List</p>
      <Table className='list- table hover'>
        <thead className='list-table-format title'>
          <tr>
            <th scope='col'>Image</th>
            <th scope='col'>Name</th>
            <th scope='col'>Category</th>
            <th scope='col'>Price</th>
            <th scope='col'>Action</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index} className='list-table-format'>
                <td>
                  <img src={`${url}/images/` + item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{formatPrice(item.price)}</td>
                <td onClick={() => removeFood(item._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </td>
              </tr>
            )
          })}
        </tbody>

      </Table>
    </div>
  )
}

export default List
