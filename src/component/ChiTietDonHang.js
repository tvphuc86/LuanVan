import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

function ChiTietDonHang(props) {
    const {modeChiTiet, setMoDelChiTiet,
        info,
        NVGH,
        trangThaiDonHang,
    } = props
  return (
    <div
    className={
      modeChiTiet ? 'modal-duyetdon' : 'modal-duyetdon nonactive'
    }>
    <AiOutlineClose
      className="close"
      onClick={() => {
        setMoDelChiTiet(!modeChiTiet);
      }}
    />
    <span>Mã vận đơn:</span>
    <span>{info.maVanDon}</span>
    <span>Địa chỉ gửi:</span>
    <span>{info.diaChiNguoiGui}</span>
    <span>Địa chỉ nhận:</span>
    <span>{info.diaChiNguoiNhan}</span>
    <span>Cước phí</span>
    <span>
      {Intl.NumberFormat('vi-Vn', {
        style: 'currency',
        currency: 'VND',
      }).format(info.cuocPhi)}
    </span>

    {info.maNhanVienGiaoHang != null ? <p>Nhân viên giao hàng</p> : ''}
    {info.maNhanVienGiaoHang != null ? (
      <div>
        <span>Tên nhân viên</span>
        <span>Số điện thoại</span>
      </div>
    ) : (
      ''
    )}
    {info.maNhanVienGiaoHang != null
      ? NVGH.map((e, i) => {
          return (
            <div className="hanghoa">
              <span>{e.hoTen}</span>
              <span>{e.sdt}</span>
            </div>
          );
        })
      : ''}
    <p> Danh sách hàng hóa</p>
    <div className="title-1">
      <span>Tên hàng hóa</span>
      <span>Số lượng</span>
    </div>
    {info.chiTietDonVanChuyens.map((e, i) => {
      return (
        <div className="hanghoa">
          <span>{e.tenHangHoa}</span>
          <span>{e.soLuong}</span>
        </div>
      );
    })}
    {info.maTrangThai != 13 ? <p>Trạng thái đơn vận chuyển</p> : ''}
    {info.maTrangThai != 13 ? (
      <div>
        <span>Trạng thái</span>
        <span>Thời gian</span>
      </div>
    ) : (
      ''
    )}
    {info.maTrangThai != 13
      ? trangThaiDonHang.map((e, i) => {
          return (
            <div className="hanghoa">
              <span>
                <p>{e.tenTrangThai}</p>

                <p>{e.diaChi}</p>
              </span>
              <span>
                <p>
                  {new Date(Date.parse(e.thoiGian)).toLocaleTimeString()}
                </p>
                <p>
                  {' '}
                  ngày{' '}
                  {new Date(Date.parse(e.thoiGian)).toLocaleDateString()}
                </p>
              </span>
            </div>
          );
        })
      : ''}
  </div>
  )
}

export default ChiTietDonHang
