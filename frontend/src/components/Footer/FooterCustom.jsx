import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
const FooterCustom = () => {
  return (
    <footer className='footer bg-dark text-white' id= 'footer'>

      <section className='contact'>
        <Container className='text-center text-md-start mt-5'>
          <Row className='mt-3'>
            <Col md='3' lg='4' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Danh Mục Món Ăn</h6>
              <p><a href='#!' className='text-reset'>Ưu Đãi</a></p>
              <p><a href='#!' className='text-reset'>Món Mới</a></p>
              <p><a href='#!' className='text-reset'>Combo 1 Người</a></p>
              <p><a href='#!' className='text-reset'>Combo Nhóm</a></p>
              <p><a href='#!' className='text-reset'>Gà Rán - Gà Quay</a></p>
              <p><a href='#!' className='text-reset'>Burger - Cơm - Mì Ý</a></p>
              <p><a href='#!' className='text-reset'>Thức Ăn Nhẹ</a></p>
              <p><a href='#!' className='text-reset'>Thức Uống & Tráng Miệng</a></p>
            </Col>

            <Col md='2' lg='2' xl='2' className='mx-auto mb-8'>
              <h6 className='text-uppercase fw-bold mb-4'>Về KFC</h6>
              <p><a href='#!' className='text-reset'>Câu Chuyện Của Chúng Tôi</a></p>
              <p><a href='#!' className='text-reset'>Tin Tức Khuyến Mãi</a></p>
              <p><a href='#!' className='text-reset'>Tin Tức KFC</a></p>
              <p><a href='#!' className='text-reset'>Tuyển Dụng</a></p>
              <p><a href='#!' className='text-reset'>Đặt Tiệc Sinh Nhật</a></p>
            </Col>

            <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Liên Hệ KFC</h6>
              <p><a href='#!' className='text-reset'>Theo Dõi Đơn Hàng</a></p>
              <p><a href='#!' className='text-reset'>Hệ Thống Nhà Hàng</a></p>
              <p><a href='#!' className='text-reset'>Liên Hệ  KFC</a></p>
            </Col>

            <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Chính sách</h6>
              <p><a href='#!' className='text-reset'>Chính sách hoạt động</a></p>
              <p><a href='#!' className='text-reset'>Chính sách qui định</a></p>
              <p><a href='#!' className='text-reset'>Chính sách bảo mật thông tin</a></p>
            </Col>

            <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p><FontAwesomeIcon icon={faHome} className="me-2" /> New York, NY 10012, US</p>
              <p><FontAwesomeIcon icon={faEnvelope} className="me-3" /> info@example.com</p>
              <p><FontAwesomeIcon icon={faPhone} className="me-3" /> + 01 234 567 88</p>
              <p><FontAwesomeIcon icon={faPrint} className="me-3" /> + 01 234 567 89</p>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="heading-line"></div>

      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <Container className='text-center-right text-md-start mt-2'>
          <Row className='mt-3'>
            <Col md='6' lg='6' xl='6' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                CÔNG TY LIÊN DOANH TNHH KFC VIỆT NAM
              </h6>
              <p>Số 292 Bà Triệu, P. Lê Đại Hành, Q. Hai Bà Trưng, TP. Hà Nội.</p>
              <p>Điện thoại: (028) 38489828</p>
              <p>Email: lienhe@kfcvietnam.com.vn</p>
              <p>Mã số thuế: 0100773885</p>
              <p>Ngày cấp: 29/10/1998 - Nơi cấp: Cục Thuế Thành Phố Hà Nội</p>
            </Col>

            <Col md='6' lg='6' xl='6' className='mx-auto mb-8'>
              <a href='/' className='me-4 text-reset'>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href='/' className='me-4 text-reset'>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href='/' className='me-4 text-reset'>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href='/' className='me-4 text-reset'>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href='/' className='me-4 text-reset'>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href='/' className='me-4 text-reset'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <img src={assets.logo_foodter} alt="logo_foodter" className='logo_foodter' />
            </Col>
          </Row>

          <div>

          </div>
        </Container>

      </section>
      <div className='text-center p-4' style={{ backgroundColor: 'black' }}>
        Copyright © 2023 KFC Vietnam
      </div>
    </footer>
  );
};

export default FooterCustom;
