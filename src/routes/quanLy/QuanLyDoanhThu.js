import React, { useEffect, useState } from 'react';
import BarChart1 from '../../component/Bar';
import NavControl from '../../component/NavControl';
import SearchBar from '../../component/SearchBar';
import ThongKeQuanLyService from '../../service/ThongKeQuanLyService';
import ExportDoanhThu from './ExportDoanhThu';
import navlinkQuanLy from './linkquanly';
import './QuanLyDoanhThu.css';
import TongTienThuVao from './TongTienThuVao';
function addDays(date, days) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - days);
  return dateCopy;
}
const ngayHienTai = new Date();
const initFilter = {
  filter: '',
  ngayKetThuc: new Date().toISOString().substring(0, 10).toString(),
  ngayBatDau: addDays(ngayHienTai, 7)
    .toISOString()
    .substring(0, 10)
    .toString(),
};
const doanhThuInit = {
  tienThuVao: 0,
  tienChuaChuyenKhoanChoKhach: 0,
  tienDaChuyenKhoanChoKhach: 0,
  tienKhachHangConNo: 0,
  tienNhanVienConNo: 0,
  tienLuongNhanVienDaThanhToan: 0,
  tienLuongNhanVienChuaThanhToan: 0,
  doanhThu: 0,
};

function QuanLyDoanhThu() {
  const [trang, setTrang] = useState(0);
  const [filters, setFilters] = useState(initFilter);
  const [doanhThu, setDoanhThu] = useState(doanhThuInit);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [thongKe,setThongKe] = useState([]);
  useEffect(()=>{
    ThongKeQuanLyService.getThongKeThang()
    .then(rs =>setThongKe(rs.data))
  },[])
  useEffect(() => {
    ThongKeQuanLyService.getDoanhThu(
      filters.ngayBatDau,
      filters.ngayKetThuc
    ).then((rs) => setDoanhThu(rs.data));
  }, [filters]);
  useEffect(() => {
    switch (trang) {
      case 0:
        ThongKeQuanLyService.getTienThuVao(
          filters.ngayBatDau,
          filters.ngayKetThuc
        ).then((rs) => setData(rs.data));
        setTitle('Chi tiết tiền thu vào');
        break;
      case 1:
        ThongKeQuanLyService.getTienChuaChuyenChoKhachHang(
          filters.ngayBatDau,
          filters.ngayKetThuc
        ).then((rs) => setData(rs.data));
        setTitle('Chi tiết tiền chưa chuyển cho khách hàng');
        break;
      case 2:
        ThongKeQuanLyService.getTienDaChuyenChoKhachHang(
          filters.ngayBatDau,
          filters.ngayKetThuc
        ).then((rs) => setData(rs.data));
        setTitle('Chi tiết tiền đã chuyển cho khách hàng');
        break;
      case 3:
        ThongKeQuanLyService.getTienNhanVienGiaoHangConNo(
          filters.ngayBatDau,
          filters.ngayKetThuc
        ).then((rs) => setData(rs.data));
        setTitle('Chi tiết tiền nhân viên giao hàng còn nợ');
        break;
      case 4:
        ThongKeQuanLyService.getTienKhachHangConNo(
          filters.ngayBatDau,
          filters.ngayKetThuc
        ).then((rs) => setData(rs.data));
        setTitle('Chi tiết tiền cước khách hàng còn nợ');
        break;
      case 5:
        ThongKeQuanLyService.getTienLuongNhanVienChuaThanhToan(
          filters.ngayBatDau,
          filters.ngayKetThuc
        ).then((rs) => setData(rs.data));
        setTitle('Chi tiết tiền lương nhân viên chưa thanh toán');
        break;
      case 6:
        ThongKeQuanLyService.getTienLuongNhanVienDaThanhToan(
          filters.ngayBatDau,
          filters.ngayKetThuc
        ).then((rs) => setData(rs.data));
        setTitle('Chi tiết tiền lương nhân viên đã thanh toán');
        break;
      default:
        setData([]);
        break;
    }
  }, [trang, filters]);
  const handleChangeFilter = (e) => {
    let { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  return (
    <div>
      <NavControl links={navlinkQuanLy} />
      <SearchBar />
      <div className="content">
        <h1>Thống kê doanh thu công ty</h1>
        <div className="filter">
          <div>
            <label>Từ ngày</label>
            <input
              name="ngayBatDau"
              value={filters.ngayBatDau}
              onChange={handleChangeFilter}
              type={'date'}
            />
            <label>Đến ngày</label>
            <input
              name="ngayKetThuc"
              value={filters.ngayKetThuc}
              onChange={handleChangeFilter}
              type={'date'}
            />
          </div>
          <ExportDoanhThu filter={filters} />
        </div>
        <div className="doanhthu">
          <span>
            Tổng tiền thu vào:{' '}
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.tienThuVao)}
            </strong>{' '}
            <i onClick={() => setTrang(0)}>Xem chi tiết</i>
          </span>
          <span>
            Tiền chưa chuyển cho khách hàng:{' '}
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.tienChuaChuyenKhoanChoKhach)}
            </strong>
            <i onClick={() => setTrang(1)}>Xem chi tiết</i>
          </span>
          <span>
            Tiền đã chuyển cho khách hàng
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.tienDaChuyenKhoanChoKhach)}
            </strong>
            <i onClick={() => setTrang(2)}>Xem chi tiết</i>
          </span>
          <span>
            Tiền nhân viên giao hàng còn nợ:
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.tienNhanVienConNo)}
            </strong>
            <i onClick={() => setTrang(3)}>Xem chi tiết</i>
          </span>
          <span>
            Tiền khách hàng còn nợ
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.tienKhachHangConNo)}
            </strong>
            <i onClick={() => setTrang(4)}>Xem chi tiết</i>
          </span>
          <span>
            Tiền lương nhân viên chưa thanh toán:
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.tienLuongNhanVienChuaThanhToan)}
            </strong>
            <i onClick={() => setTrang(5)}>Xem chi tiết</i>
          </span>
          <span>
            Tiền lương nhân viên dã thanh toán:
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.tienLuongNhanVienDaThanhToan)}
            </strong>
            <i onClick={() => setTrang(6)}>Xem chi tiết</i>
          </span>
          <span>
            <h2>Doanh thu: </h2>{' '}
            <strong>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(doanhThu.doanhThu)}
            </strong>{' '}
          </span>
        </div>
        <BarChart1 data={thongKe} lable='lable' keybars='tongCuoc' />
          <p>Biểu đồ số lượng đơn hàng theo trạng thái</p>
        {<TongTienThuVao abc={title} data={data} />}
      </div>
    </div>
  );
}

export default QuanLyDoanhThu;
