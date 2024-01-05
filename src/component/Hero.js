import React from 'react'
import Background1 from '../asset/img/background1.jpg'
import './Hero.css'
function Hero() {
  return (
    <div className='hero'>
        <img className='img-hero' src={Background1} alt="background1" />
        <div className='text-hero'>
            <h1 className='text-title'>BẠN MUỐN GỬI HÀNG ?</h1>
            <h4 className='text-content'>Đơn vận chuyển của bạn sẽ được xử lý ngay</h4>
            <a href='/LuanVan/khach-hang/tao-don-van-chuyen' className='btn-hero'>Yêu cầu gửi hàng</a>
        </div>
    </div>
  )
}

export default Hero
