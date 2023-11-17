import './header.css';
import React from 'react'
import { aboutClick, logoClick } from './test';
function Site_header(){
    return(
        <div>
        <div className='site_top'>
            <p className='About_us' onClick={aboutClick}>ABOUT US</p>
            <p onClick={logoClick} className='Logo'>LMAO4REAL</p>
            <p className='contacts'onClick={aboutClick}>КОНТАКТЫ</p>
        </div>
        
        </div>
        
    )
}
export default Site_header