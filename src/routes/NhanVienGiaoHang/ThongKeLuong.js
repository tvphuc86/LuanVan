import React from 'react'
import LuongNhanVien from '../../component/LuongNhanVien'

function ThongKeLuong() {
  return (
    <div>
            <LuongNhanVien maTaiKhoan = {localStorage.getItem("maTaiKhoan")} loaiTaiKhoan= {1} khachHang={2} />

    </div>
  )
}

export default ThongKeLuong
