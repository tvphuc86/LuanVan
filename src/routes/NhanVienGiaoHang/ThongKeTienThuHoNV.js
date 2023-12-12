import React from 'react'
import TienThuHo from '../../component/TienThuHo'

function ThongKeTienThuHoNV() {
  return (
    <div>
      <TienThuHo maTaiKhoan = {localStorage.getItem("maTaiKhoan")} loaiTaiKhoan= {1} khachHang={2} />
    </div>
  )
}

export default ThongKeTienThuHoNV