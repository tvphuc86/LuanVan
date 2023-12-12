import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Footer from '../component/Footer'
import Header from '../component/Header'
import Hero from '../component/Hero'
import QuanLyDonVanChuyenKHService from '../service/QuanLyDonVanChuyenKHService';
function Info() {

  const [data,setData] = useState({
    donVanChuyen: {},
    trangThaiDon: [],
    chiTietDon: [],
  })
  const [maVanDon, setMaVanDon] = useState('')
const [co,setCo] = useState(false)
  const handleTraCuu = (e) =>{
    e.preventDefault()
    QuanLyDonVanChuyenKHService.traCuocVanDon(maVanDon)
    .then(rs =>{
      if (rs.data == false) {toast.error("Mã vận đơn không chính xác vui lòng kiểm tra và thử lại")
    setData({
      donVanChuyen: {},
      trangThaiDon: [],
      chiTietDon: [],
    })
    setCo(false)
    
    }
      else {setData(rs.data)
      setCo(true)}
    })
  }
  return (
    <div>
    <Header />
    <ToastContainer />
    <div className="uoctinh" onSubmit={handleTraCuu}>
      <div className="formuoctinh">
        <h1>Nhập mã vận đơn</h1>
        <form>
          <input value={maVanDon} onChange={(e)=>{setMaVanDon(e.target.value) }} style={{padding:'0.5rem',marginBlock:'1rem',fontSize:'16px'}} type={'text'} required placeholder='Nhập mã vận đơn' />
          <button type = 'submit'>Tra cứu</button>
        </form>
      </div>
      <div className="listuoctinh">
        <h1>Thông tin vận đơn</h1>
        { co  &&
        <div className='ketQuaTraCuu'>
          <span>Mã vận đơn:</span>
          <span>{data.donVanChuyen.maVanDon}</span>
          <span>Tên người nhận</span>
          <span>{data.donVanChuyen.tenNguoiNhan}</span>
          <span>Địa chỉ người nhận:</span>
          <span>{data.donVanChuyen.diaChiNguoiNhan}</span>
          <span>Số điện thoại người nhận</span>
          <span>{data.donVanChuyen.soDienThoaiNguoiNhan}</span>
          <p>Thông tin hàng hóa</p>
          <div>
          <span>Tên hàng hóa</span>
          <span>Số lượng</span>
          </div>
          {
            data.chiTietDon.map((e,i)=>{
              return(
              <div key={e+i}>
              <span>{e.tenHangHoa}</span>
              <span>{e.soLuong}</span>
              </div>)
            })
          }
          <p>Trạng thái đơn hàng</p>
          <div>
          <span>Tên trạng thái</span>
          <span>Thời gian</span>
          </div>
          {
            data.trangThaiDon.map((e,i)=>{
              return(
              <div key={e+i}>
              <span>{e.trangThaiDonHang.tenTrangThai}
              
              <br/>
              ghi chú: {e.diaChi}
              </span>
              <span>{new Date(Date.parse(e.thoiGian)).toLocaleTimeString() +'-'+ new Date(Date.parse(e.thoiGian)).toLocaleDateString() }</span>
              </div>)
            })
          }
        </div>}
      </div>
    </div>
    <Footer />
  </div>
);
}

export default Info
