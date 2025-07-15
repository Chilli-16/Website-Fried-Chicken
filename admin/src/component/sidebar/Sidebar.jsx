import React from 'react'
import './Sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faList, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to= '/add' className="sidebar-option">
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to= '/list' className="sidebar-option">
                    <FontAwesomeIcon icon={faList} /> 
                    <p>List Items</p>
                </NavLink>
                <NavLink to= '/orders' className="sidebar-option">
                    <FontAwesomeIcon icon={faCheckToSlot} />
                    <p>order</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
