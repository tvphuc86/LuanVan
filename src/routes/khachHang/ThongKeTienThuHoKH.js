import React from 'react'
import TienThuHo from '../../component/TienThuHo'

function ThongKeTienThuHoKH() {
  return (
    <div>
      <TienThuHo maTaiKhoan = {localStorage.getItem("maTaiKhoan")} loaiTaiKhoan = {0} khachHang={1} />
    </div>
  )
}

export default ThongKeTienThuHoKH
