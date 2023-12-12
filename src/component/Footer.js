import React from 'react'
import './Footer.css'
import Logo from '../asset/img/logo.png'
import {
    AiOutlineFacebook,
    AiOutlineInstagram,
    AiOutlineTwitter
} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
function Footer() {
  return (
    <div className='footer'>
      <div className='social'>
           <img className='logo-footer' src={Logo} alt='Logo footer' />
           <div className='title-icon'>
                <h2 className='title-footer'>uy hoang express</h2>
                <div className='icon-social'>
                    <a href='/#'><AiOutlineTwitter /></a>
                    <a href='/#'><AiOutlineInstagram/></a>
                    <a href='/#'>< AiOutlineFacebook/></a>
                </div>
           </div>
      </div>
      <div className='address'>
        <h1 className='title-footer'>Địa chỉ</h1>
        <ul>
            <li><GoLocation/>Đường 3/2 Quận Ninh Kiều, TP Cần Thơ</li>
            <li><GoLocation/>Phường 6, Huyện Cao Lãnh, Tình Đồng Tháp</li>
        </ul>
      </div>
      <div className='recieve-new'>
          <h1 className='title-footer'>Đăng ký nhận tin mới</h1>
          <input type={'email'} placeholder='Nhập email của bạn' />
          <button className='btn-recive-new'>Gửi</button>
      </div>
    </div>
  )
}

export default Footer
