import React from 'react'
import './Navbar.css'
import { Container, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { assets } from '../../../../admin/src/assets/assets';

const NavbarCustom = () => {
  return (
    <>
      <div className='navbar'>
        <Navbar expand="lg" className="bg-body">
          <Container fluid>
            <div className='navbar-left'>
              <div className='navbar-nav'>
                <Navbar.Brand>
                  <img src={assets.logo} alt="KFC" className='logo' />
                </Navbar.Brand>
              </div>
            </div>
            <div className='navbar-right'>
              <FontAwesomeIcon icon={faUser}/>
              <p>Admin</p>
            </div>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default NavbarCustom
