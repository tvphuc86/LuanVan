import React from 'react'
import Logo from '../asset/img/logo.png';
export const HoaDon = React.forwardRef((props, ref) => {
   const {datahd,trangThaiDonHang} = props
    return (
        <div ref={ref} style={{}} className='hoa-don' >
        <h1>Công ty vận chuyển Uy Hoàng</h1>
        <img src={Logo} alt='logo' className='Logo-indon'/>
        <div className='thongtinct'>
        <p>Địa chỉ: Quận Ninh Kiều Thành phố Cần Thơ</p>
        <p>Hotline: 093211522</p>
        </div>
          <div>
          <span>Mã đơn</span>
          <span><strong>{datahd.maDonVanChuyen}</strong></span>
          </div>
          <div>
          <span>Mã khách hàng:</span>
          <span><strong>{datahd.maKhachHang}</strong></span>
          </div>
          <div>
          <span>Tên người nhận:</span>
          <span>{datahd.tenNguoiNhan}</span>
          </div>
          <div>
          <span>Số điện thoại người nhận:</span>
          <span>{datahd.soDienThoaiNguoiNhan}</span>
          </div>
          <div>
          <span>Số điện thoại người gửi:</span>
          <span>{datahd.soDienThoaiNguoiGui}</span>
          </div>
          <div>
          <span>Ngày tạo đơn:</span>
          <span>{new Date(Date.parse(datahd.ngayTao)).toLocaleDateString()}</span>
          </div>
          <div>
          <span>Địa chỉ gửi:</span>
          <span>{datahd.diaChiNguoiGui}</span>
          </div>
          <div>
          <span>Địa chỉ nhận:</span>
          <span>{datahd.diaChiNguoiNhan}</span>
          </div>
          <div>
          <span>Cước phí</span>
          <span>{Intl.NumberFormat('vi-Vn',{style:'currency',currency:'VND'}).format(datahd.cuocPhi)}</span>
          </div>
          <div>
          <span>Tiền thu hộ</span>
          <span>{Intl.NumberFormat('vi-Vn',{style:'currency',currency:'VND'}).format(datahd.tongTienThuHo)}</span>
          </div>
          <p> Danh sách hàng hóa</p>
              <div className='title-1'>
                  <span>
                      Tên hàng hóa
                  </span>
                  <span>
                      Số lượng
                  </span>
              </div>
              {datahd.chiTietDonVanChuyens != null ?  datahd.chiTietDonVanChuyens.map((e,i)=>{
                  return(
                      <div className='hanghoa'>
                          <span>{e.tenHangHoa}</span>
                          <span>{e.soLuong}</span>
                      </div>
                     
                  )
              }) :''}
                 {datahd.maTrangThai!=13 ? <p>Trạng thái đơn vận chuyển</p> :''}
              {datahd.maTrangThai!=13 ? <div className='title-1'>
                  
                  <span>
                      Trạng thái
                  </span>
                  <span>
                      Thời gian
                  </span>
              </div> :''}
              {datahd.maTrangThai!=13 ?  
                trangThaiDonHang.map((e,i)=>{
                  if(i==trangThaiDonHang.length-1){
                  return(
                    <div className='hanghoa'>
                   
                    <span><p>{e.tenTrangThai}</p>
                  
                    <p> ghi chú :{e.diaChi}</p></span>
                    <span><p>{new Date(Date.parse(e.thoiGian)).toLocaleTimeString()}</p>
                    <p> ngày {new Date(Date.parse(e.thoiGian)).toLocaleDateString()}</p>
                   </span>
                </div>
                  )}
                })
              
              
               
               :''}
                <sub>Thời gian xuất đơn vận chuyển: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</sub>
      </div>
    );
  });

