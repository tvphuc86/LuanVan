import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineRollback,
} from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { GrPrint, GrReturn } from 'react-icons/gr';
import { MdCancel, MdChangeCircle, MdDelete, MdInfoOutline, MdOutlineDownloading } from 'react-icons/md';
import { useReactToPrint } from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import ChiTietDonHang from '../../component/ChiTietDonHang';
import NavControl from '../../component/NavControl';
import { NhanGoiHang } from '../../component/NhanGoiHang';
import Pagination from '../../component/Pagination';
import SearchBar from '../../component/SearchBar';
import AccountService from '../../service/AccountService';
import QuanLyDonNVGHService from '../../service/QuanLyDonNVGHService';
import QuanLyDonVanChuyenKHService from '../../service/QuanLyDonVanChuyenKHService';
import QuanLyDonVanChuyenQLService from '../../service/QuanLyDonVanChuyenQLService';
import navlinkQuanLy from './linkquanly';
function addDays(date, days) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + days);
  return dateCopy;
}
const initFilter = {
  ngay: 0,
  thang: 0,
  nam: new Date(Date.now()).getFullYear(),
  filter: '',
  maTrangThaiDonVanChuyen: 0,
};
const initInfo = {
  diaChiNguoiNhan: '',
  diaChiNguoiGui: '',
  cuocPhi: '',
  maNhanVienGiaoHang: null,
  tongTrongLuong: '',
  chiTietDonVanChuyens: [],
  maTrangThai: 0,
};

function limit(c) {
  return this.filter((x, i) => {
    if (i <= c - 1) {
      return true;
    }
  });
}

Array.prototype.limit = limit;
function skip(c) {
  return this.filter((x, i) => {
    if (i > c - 1) {
      return true;
    }
  });
}
Array.prototype.skip = skip;
function QuanLyDonVanChuyenQL() {
  const [maTaiKhoan, setMaTaiKhoan] = useState(
    localStorage.getItem('maTaiKhoan')
  );
  const [donCanDuyets, setDonCanDuyets] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filters, setFilters] = useState(initFilter);
  const [trangThais, setTrangThais] = useState([]);
  const [info, setInfo] = useState(initInfo);
  const [modeChiTiet, setMoDelChiTiet] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [NVGH, setNVGh] = useState(0);
  const [trangThaiDonHang, setTrangThaiDonHang] = useState([]);
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  useEffect(() => {
    retrieveData(
      filters.maTrangThaiDonVanChuyen,
      filters.filter.toUpperCase(),
      page,
      limit,
      filters.ngay,
      filters.thang,
      filters.nam
    );
  }, [filters, page, limit]);
  useEffect(() => {
    AccountService.getTenByID(info.maNhanVienGiaoHang).then((rs) =>
      setNVGh(rs.data)
    );
  }, [info.maNhanVienGiaoHang]);

  useEffect(  () => {
      QuanLyDonVanChuyenKHService.getTrangThai().then(  (rs) =>
      setTrangThais(rs.data)
    );
    
    QuanLyDonVanChuyenKHService.getTrangThaiDonHang(info.maDonVanChuyen).then(
      (rs) => setTrangThaiDonHang(rs.data)
    );
  }, [info.maDonVanChuyen]);
  const retrieveData = (maTrangThai, filter, page, limit, ngay, thang, nam) => {
    QuanLyDonVanChuyenQLService.getDon().then((rs) => {
      let data = [];
      if (ngay == 0 && thang != 0 && maTrangThai == 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            new Date(Date.parse(x.ngayTao)).getMonth() + 1 == thang &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
      } else if (ngay == 0 && thang == 0 && maTrangThai == 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
      } else if (ngay != 0 && thang != 0 && maTrangThai == 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam &&
            new Date(Date.parse(x.ngayTao)).getMonth() + 1 == thang &&
            new Date(Date.parse(x.ngayTao)).getDate() == ngay
        );
      } else if (ngay == 0 && thang != 0 && maTrangThai != 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            x.maTrangThai == maTrangThai &&
            new Date(Date.parse(x.ngayTao)).getMonth() + 1 == thang &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
      } else if (ngay != 0 && thang != 0 && maTrangThai != 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            x.maTrangThai == maTrangThai &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam &&
            new Date(Date.parse(x.ngayTao)).getMonth() + 1 == thang &&
            new Date(Date.parse(x.ngayTao)).getDate() == ngay
        );
      } else if (ngay != 0 && thang == 0 && maTrangThai != 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            x.maTrangThai == maTrangThai &&
            new Date(Date.parse(x.ngayTao)).getDate() == ngay &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
      } else if (ngay != 0 && thang == 0 && maTrangThai == 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            new Date(Date.parse(x.ngayTao)).getDate() == ngay &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
      } else {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            x.maTrangThai == maTrangThai &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
      }

      setDonCanDuyets(data.skip((page - 1) * limit).limit(limit));
      setTotalPage(Math.ceil(data.length / limit));
      setTotalRecord(data.length);
    });
  };

  const handleChangeFilter = (e) => {
    let { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const xemChiTietDonHang = (e) => {
    setInfo(e);
  };
  const HuyDon = (maDonVanChuyen) => {
    if (window.confirm('Bạn thật sự muốn hủy đơn này?') == true) {
      QuanLyDonNVGHService.capNhatTrangThai(maDonVanChuyen,24,"Chưa lấy hàng và Không liên lạc được với người gửi").then((rs) => {
        if (rs.data) {
          toast.success('Xóa thành công');
          retrieveData(
            filters.maTrangThaiDonVanChuyen,
            filters.filter.toUpperCase(),
            page,
            limit,
            filters.ngay,
            filters.thang,
            filters.nam
          );
        } else toast.error('Có lỗi khi xóa');
      });
    }
  };
  const XacNhanLayHangLan2 = (maDonVanChuyen) =>{
    if(window.confirm("Xác nhận giao lại đơn hàng này")==true){
      QuanLyDonNVGHService.capNhatTrangThai(maDonVanChuyen,12,"Đã liên lạc được với người gửi")
      .then( rs => {
        if(rs.data.result){
          toast.success(rs.data.message)
          retrieveData(
            filters.maTrangThaiDonVanChuyen,
            filters.filter.toUpperCase(),
            page,
            limit,
            filters.ngay,
            filters.thang,
            filters.nam
          );
        }
        else{
          toast.error('Có lỗi');
        }
      })
    }
  }
  const XacNhanChuaHoanThanh = (maDonVanChuyen) =>{
    if(window.confirm("Xác nhận lưu trữ  đơn hàng này")==true){
      QuanLyDonNVGHService.capNhatTrangThai(maDonVanChuyen,25,"Đã lấy hàng nhưng không thể giao hàng")
      .then( rs => {
        if(rs.data.result){
          toast.success(rs.data.message)
          retrieveData(
            filters.maTrangThaiDonVanChuyen,
            filters.filter.toUpperCase(),
            page,
            limit,
            filters.ngay,
            filters.thang,
            filters.nam
          );
        }
        else{
          toast.error('Có lỗi');
        }
      })
    }
  }
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle:'Nhãn đơn vận chuyển',
    removeAfterPrint: true
  })
  const  prinDonHang = async e =>{
    await setInfo(e)
    handlePrint()
  }
  return (
    <div>
      <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkQuanLy} />
      <div  style={{ display: "none"}}> <NhanGoiHang ref={componentRef} loaiTaiKhoan={0} data={info} /></div>
      <div className="content">
        <h1>Quản lý đơn vận chuyển</h1>
        <ChiTietDonHang modeChiTiet={modeChiTiet} setMoDelChiTiet={setMoDelChiTiet}
        info = {info}
        NVGH = {NVGH}
        trangThaiDonHang={trangThaiDonHang} />
        <div className="filter">
          <input
            type={'search'}
            name="filter"
            value={filters.filter}
            placeholder="Nhập tên người nhận hoặc người gửi để tìm kiếm"
            onChange={handleChangeFilter}
          />
          <select
            name="maTrangThaiDonVanChuyen"
            value={filters.maTrangThaiDonVanChuyen}
            onChange={handleChangeFilter}>
            <option value={0}>Trạng thái</option>
            {trangThais.map((e, i) => {
              return (
                <option key={i} value={e.maTrangThaiDonVanChuyen}>
                  {e.tenTrangThai}
                </option>
              );
            })}
          </select>
          <select
            name="ngay"
            value={filters.ngay}
            onChange={handleChangeFilter}>
            <option value={0}>Chọn ngày</option>
            {new Array(31).fill(true).map((e, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            name="thang"
            value={filters.thang}
            onChange={handleChangeFilter}>
            <option value={0}>Chọn tháng</option>
            {new Array(12).fill(true).map((e, i) => {
              return (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select name="nam" value={filters.nam} onChange={handleChangeFilter}>
            <option>Chọn năm</option>
            {new Array(6)
              .fill(new Date(Date.now()).getFullYear() - 5)
              .map((e, i) => {
                return (
                  <option key={i} value={e + i}>
                    {e + i}
                  </option>
                );
              })}
          </select>
        </div>
        <p>
          {' '}
          <strong>Tổng số đơn : </strong>
          {totalRecord}
        </p>
        <div className="title">
          <span>Stt</span>
          <span>Người gửi</span>
          <span>Người nhận</span>
          <span>Số điện thoại nhận</span>
          <span>Trạng thái</span>
          <span>Tiền thu hộ</span>
          <span>Thời gian yêu cầu</span>
          <span>Xử lý</span>
        </div>

        <div className="listdon">
          {donCanDuyets.map((e, i) => {
            return (
              <div key={i} className="don">
                <span>{i + 1 + (page - 1) * limit}</span>
                <span>{e.tenNguoiGui}</span>
                <span>{e.tenNguoiNhan}</span>

                <span>{e.soDienThoaiNguoiNhan}</span>
                <span
                  title={
                    trangThais.filter(
                      (m) =>  m.maTrangThaiDonVanChuyen == e.maTrangThai
                    )[0].moTaTrangThai
                  }
                  style={{ color: 'purple' }}>
                  {
                    trangThais.filter(
                      (m) => m.maTrangThaiDonVanChuyen == e.maTrangThai
                    )[0].tenTrangThai
                  }
                </span>
                <span>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.tongTienThuHo)}
                </span>
                <span key={i}>
                  {' '}
                  {new Date(Date.parse(e.ngayTao)).toLocaleDateString('vi-VN')}
                </span>
                <span key={i} className="">
                 
                  {e.maTrangThai == 14 && e.daLayHang == false? (
                    <span>
                      <MdCancel
                        onClick={()=>HuyDon(e.maDonVanChuyen)}
                        title="Hủy đơn"
                        style={{ fontSize: '30px', color: 'red' }}
                      />
                      <AiOutlineRollback
                      onClick={()=>XacNhanLayHangLan2(e.maDonVanChuyen)}
                        title="Xác nhận lấy hàng lại lần 2"
                        style={{ fontSize: '30px', color: 'green' }}
                      />
                    </span>
                  ) : (
                    ''
                  )}
 {e.maTrangThai == 14 && e.daLayHang == true? (
                    <span>
                      <MdCancel
                        onClick={()=>HuyDon(e.maDonVanChuyen)}
                        title="Hủy đơn"
                        style={{ fontSize: '30px', color: 'red' }}
                      />
                      <AiOutlineRollback
                      onClick={()=>XacNhanLayHangLan2(e.maDonVanChuyen)}
                        title="Xác nhận lấy hàng lại lần 2"
                        style={{ fontSize: '30px', color: 'green' }}
                      />
                        <MdOutlineDownloading
                      onClick={()=>XacNhanChuaHoanThanh(e.maDonVanChuyen)}
                        title="Xác nhận chưa hoàn thành"
                        style={{ fontSize: '30px', color: 'blue' }}
                      />
                    </span>
                  ) : (
                    ''
                  )}
                  {e.maTrangThai != 11 ? (
                    <span>
                      <GrPrint
                        onClick={()=>prinDonHang(e)}
                        title="In nhãn"
                        style={{ fontSize: '30px', color: 'red' }}
                      />
                    </span>
                  ) : (
                    ''
                  )}
                  <MdInfoOutline
                    style={{ fontSize: '30px', color: 'lightcoral' }}
                    title="Chi tiết"
                    onClick={() => {
                      xemChiTietDonHang(e);
                      setMoDelChiTiet(!modeChiTiet);
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>
        <Pagination
          page={page}
          limit={limit}
          totalPage={totalPage}
          handleChangePage={handleChangePage}
          handleChangeLimitPage={handleChangeLimitPage}
          siblings={1}
        />
      </div>
    </div>
  );
}

export default QuanLyDonVanChuyenQL;
