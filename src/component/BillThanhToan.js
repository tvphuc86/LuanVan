import React from 'react'
import Logo from '../asset/img/logo.png';
export const BillThanhToan = React.forwardRef((props, ref) => {
   const {datahd,trangThaiDonHang,loaiTaiKhoan, filters} = props
    return (
        <div ref={ref} style={{}} className='hoa-don' >
        <h1>Công ty vận chuyển Uy Hoàng</h1>
        <img src={Logo} alt='logo' style={{'right':0}} className='Logo-indon'/>
        <div className='thongtinct'>
        <p>Địa chỉ: Quận Ninh Kiều Thành phố Cần Thơ</p>
        <p>Hotline: 093211522</p>
        </div>
          <div>
          <span>{(loaiTaiKhoan==0 || loaiTaiKhoan ==2) ? "Mã khách hàng" : 'Mã nhân viên'}:</span>
          <span><strong>{(loaiTaiKhoan==0 || loaiTaiKhoan==2) ? datahd.maKhachHang : datahd.maNhanVienGiaoHang}</strong></span>
          </div>
          <div>
          <span>{(loaiTaiKhoan==0 || loaiTaiKhoan==2) ? "Tên khách hàng" : 'Tên nhân viên'}:</span>
          <span><strong>{datahd.hoTen}</strong></span>
          </div>
          <div>
          <span>Nội dung thanh toán:</span>
          <span>{loaiTaiKhoan == 0 ? "Thanh toán tiền thu hộ cho khách hàng": loaiTaiKhoan == 1 ? "Xác nhận thanh toán tiền thu hộ nhân viên" : loaiTaiKhoan==3? 'Xác nhận thanh toán lương khách hàng' : "Xác nhận thanh toán tiền cước khách hàng" }</span>
          </div>
          <div>
          <span>Khoảng thời gian thanh toán: </span>
          <span>{ new Date(Date.parse(filters.ngayBatDau)).toLocaleDateString() + ' - '+ new Date(Date.parse(filters.ngayKetThuc)).toLocaleDateString()}</span>
          </div>
          <div>
          <span>Số tiền:</span>
          <span>{Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(trangThaiDonHang)}</span>
          </div>
          <div>
          <span>Quản lý chịu trách nhiệm</span>
          <span>{localStorage.getItem('maTaiKhoan') + ' - ' + localStorage.getItem('userName')}</span>
          </div>
         
        
       
        
        
          <p> Ký tên</p>
              <div className='title-1'>
                  <span>
                      Quản lý 
                      </span>
                  <span>
                      {(loaiTaiKhoan==0 || loaiTaiKhoan==2) ?'Khách hàng':'Nhân viên'}
                  </span>
              </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <sub>Thời gian xuất : {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</sub>
      </div>
    );
  });

