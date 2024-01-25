import React, { useState } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    
    const location = useLocation();

    return (
        <div className='navbar'>     
            

            <div className='user-info'>
                    <img style={{width: '40px', height: '40px', borderRadius: '50%'}} src='icons/Rectangle 451.png'/> 
                <div className='user-details'>
                    <div style={{color: '#000', fontSize: '14px',  fontWeight: '500'}}>Sanchit Pandey</div>
                    <div style={{color: '#929292', fontSize: '12px',  fontWeight: '500'}}>Super Admin</div>
                </div>
                
            </div>
                <div className='btns'>

                <div className='notification'><img src='./icons/notification.svg'/><span className='circle'></span></div>
                <div className='setting'><img src='./icons/setting-2.svg'/></div>
                </div>
        </div >
    )
}

export default Navbar;