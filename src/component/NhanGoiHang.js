import React from 'react'
export const NhanGoiHang = React.forwardRef((props, ref) => {
   const {data} = props
    return (
        <div ref={ref} style={{}} className='hoa-don' >
        <h1>Công ty vận chuyển Uy Hoàng</h1>
        <div className='thongtinct'>
        <p>Địa chỉ: Quận Ninh Kiều Thành phố Cần Thơ</p>
        <p>Hotline: 093211522</p>
        </div>
          <div>
          <span>Mã vận đơn: </span>
          <span><strong>{data.maVanDon}</strong></span>
          </div>
          <div>
          <span>Tên người nhận:</span>
          <span><strong>{data.tenNguoiNhan}</strong></span>
          </div>
          <div>
          <span>Số điện thoại người nhận</span>
          <span>{data.soDienThoaiNguoiNhan}</span>
          </div>
          <div>
          <span>Địa chỉ người nhận </span>
          <span>{data.diaChiNguoiNhan}</span>
          </div>
         
         
        
       
        
        
          
      </div>
    );
  });

