import React, { useState } from 'react'
import './Header.css';
import Logo from '../asset/img/logo.png';
import { 
    AiOutlineBars,
    AiOutlineCloseSquare } from 'react-icons/ai';
import navlink from './Navlink';

function Header() {
    const [mobile, setMobile] = useState(true);
    const [logined, setLogined] = useState(false);
    const [userRole, setUserRole]=useState('');
  return (
    <div className='navbar'>
        <div className='navbar-logo'>
            <a href='/trang-chu'>
                <img
                    src={Logo}
                    alt="logo" />
            </a>
            <h1>UY HOANG <sub>EXPRESS</sub></h1>
        </div>
        <nav className='navbar-menu'>
            <ul className={ mobile ? 'nav-item': 'nav-item active'}>
                {navlink.map((item,index) => {
                        return(
                            <a href={item.href} className='nav-link' key={index}>
                           <li> <i className={item.icon} />{item.tiltle}</li>
                        </a>
                        )
                })}
                <a href='/dang-nhap'>
                    <li><button className='nav-link btn-login' onClick={()=>setLogined(!logined)}>{logined ?'Đăng xuất':'Đăng nhập'}</button></li>
                 </a>
            </ul>
        </nav>
        <div className='mobile-icon' onClick={() =>setMobile(!mobile)}>
            {mobile ? <AiOutlineBars></AiOutlineBars>:<AiOutlineCloseSquare></AiOutlineCloseSquare>}
        </div>
    </div>
  )
}

export default Header
