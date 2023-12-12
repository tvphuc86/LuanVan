import React, { useState } from 'react'
import './NavControl.css'
import {BsList} from 'react-icons/bs'
import {FaRegWindowMinimize} from 'react-icons/fa'
function NavControl(props) {
  const {links} = props
  const url = window.location.pathname;
  const [mobile,setMobile] = useState(false)
  return (
    <div> 
      <div className={ mobile?'nav-control-icon-on': 'nav-control-icon-off'} onClick={()=>{setMobile(!mobile)}}> {mobile ? <FaRegWindowMinimize/>:<BsList />}</div>
     
      <div className={mobile ? 'nav-control active':'nav-control'}>
            <div className='nav-control-item'>
                <ul>
                  {links.map((items,index) => {
                    return(
                    <li key={index} className= {url===items.href ? 'active': ' '}><a href={items.href}>{items.title}</a></li>
                    )
                  })}
                    
              
                </ul>
            </div>
      </div>
    </div>
  )
}

export default NavControl
