import React from 'react';
import './Map.css';
import { Link } from 'react-router-dom';

const kfcLocations = [
  {
    name: "KFC Láng Hạ",
    address: "Số 173-175 tổ 8 Láng Hạ, P.Láng Hạ, Q.Đống Đa, Tp Hà Nội, HÀ NỘI",
    iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.327519761299!2d105.81546431488275!3d21.0266799860011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab41a7007a9f%3A0xf56d6d71e4d2d8a3!2sKFC!5e0!3m2!1sen!2s!4v1636614540856!5m2!1sen!2s",
  mapLink: "https://www.google.com/maps?q=KFC+Số+1+Láng+Hạ,+Hà+Nội"
},
  {
    name: "KFC Tràng Tiền",
    address: "Số 3 Tràng Tiền, Hoàn Kiếm, Hà Nội",
    iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7588871434486!2d105.85373131488391!3d21.034476185995056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab41c5f57a3f%3A0xc78151e68d940ef1!2sKFC!5e0!3m2!1sen!2s!4v1636614983187!5m2!1sen!2s",
    mapLink: "https://www.google.com/maps?q=KFC+Số+35+Tràng+Tiền,+Hà+Nội"
  }
  // Thêm các cửa hàng khác nếu cần
];

const Map = () => {
  return (
    <div className="map-container" id = "shop-map">
      <h1>HỆ THỐNG CỬA HÀNG KFC TẠI HÀ NỘI</h1>
      {kfcLocations.map((store, index) => (
        <div key={index} className="store-container">
          <div className="store-info">
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>Xem Menu và đặt món Gà Rán KFC tuyệt hảo tại Cửa hàng KFC LÁNG HẠ. Nhiều khuyến mãi hấp dẫn chỉ có tại cửa hàng và đặt hàng trực tuyến. Ghé thăm ngay!</p>
            <a href={store.mapLink} target="_blank" rel="noopener noreferrer">
              Xem dẫn đường
            </a>
            <div className="button-container">
                <Link to='/cart'>
                    <button className="order-button">Đặt hàng ngay</button>
                </Link>
            </div>
          </div>
          <div className="store-map">
            <iframe
              title={store.name}
              src={store.iframeSrc}
              width="100%"
              height="450px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Map;
