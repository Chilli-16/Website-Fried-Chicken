import React from 'react'
import './party.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const party = () => {
    return (
        <div className='book-party' id='book-party'>
            <hr />
            <div className="heading-party">
                <h1>DỊCH VỤ TIỆC</h1>
                <h2>Buổi tiệc khó quên cùng những món ngon từ KFC</h2>
                <p>Chúng tôi đã sẵn sàng để phục vụ mọi buổi bạn </p>
            </div>
            <div className="container-fluid">
                <img src={assets.party} alt=" party" className='party' />
                <img src={assets.party1} alt="party1" className=' party' />
                <img src={assets.party2} alt="hparty2" className='party' />
                <img src={assets.party4} alt="party4" className='party' />
                <img src={assets.party5} alt="party5" className='party' />
                <img src={assets.party6} alt="party6" className='party' />
            </div>
            <div className="button-container">
                <Link to='/cart'>
                    <button className="order-button">Đặt hàng ngay</button>
                </Link>
            </div>
            <hr />
        </div>
    )
}

export default party
