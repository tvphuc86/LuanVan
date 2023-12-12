import React, { useEffect, useState } from 'react';
import NavControl from '../../component/NavControl';
import SearchBar from '../../component/SearchBar';
import DuyetDonVanChuyenService from '../../service/DuyetDonVanChuyenService';
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineExclamationCircle,
} from 'react-icons/ai';
import { MdCancel, MdClose, MdInfoOutline } from 'react-icons/md';
import { BsInfo, BsInfoCircle } from 'react-icons/bs';
import Pagination from '../../component/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import navlinkNVGH from './NavLinkNVGH';
import NhanDonHangService from '../../service/NhanDonHangService';
const initValues = {
  maNVGH: localStorage.getItem('maTaiKhoan'),
};
const initFilter = {
  ngay: 0,
  thang: 0,
  nam: new Date(Date.now()).getFullYear(),
  filter: '',
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

const initInfo = {
    diaChiNguoiNhan: '',
    diaChiNguoiGui: '',
    cuocPhi:'',
    tongTrongLuong:'',
    chiTietDonVanChuyens: []
}

function NhanDonHang() {
  const [values, setValues] = useState(initValues);
  const [donCanDuyets, setDonCanDuyets] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filters, setFilters] = useState(initFilter);
  const [totalRecord, setTotalRecord] = useState(0);
  const [info,setInfo] = useState(initInfo)
  const [modeChiTiet,setMoDelChiTiet] = useState(false)
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };

  useEffect(() => {
    retrieveData(
      filters.filter.toUpperCase(),
      page,
      limit,
      filters.ngay,
      filters.thang,
      filters.nam
    );
  }, [filters, page, limit]);
  const retrieveData = (filter, page, limit, ngay, thang, nam) => {
    NhanDonHangService.getDon().then((rs) => {
      let data = [];
      if (ngay == 0 && thang != 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter)  ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            new Date(Date.parse(x.ngayTao)).getMonth() + 1 == thang &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
      } else if (ngay == 0 && thang == 0) {
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam
        );
        
      } else if(ngay!=0 && thang==0) {
        data = rs.data.filter(
            (x) =>
              (x.tenNguoiGui.toUpperCase().includes(filter) ||
                x.tenNguoiNhan.toUpperCase().includes(filter)) &&
              new Date(Date.parse(x.ngayTao)).getFullYear() == nam &&
              new Date(Date.parse(x.ngayTao)).getDate() == ngay
          );
      }
      else{
        data = rs.data.filter(
          (x) =>
            (x.tenNguoiGui.toUpperCase().includes(filter) ||
              x.tenNguoiNhan.toUpperCase().includes(filter)) &&
            new Date(Date.parse(x.ngayTao)).getFullYear() == nam &&
            new Date(Date.parse(x.ngayTao)).getMonth() + 1 == thang &&
            new Date(Date.parse(x.ngayTao)).getDate() == ngay
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
  const xemChiTietDonHang = (e) =>{
        console.log(e);
        setInfo(e
        )
  }
  const handleNhanDon = (maQuanLy,maDonVanChuyen) => {
    if(window.confirm("Nhận đơn hàng này?")==true){
        NhanDonHangService.nhanDon(maDonVanChuyen,maQuanLy)
        .then( rs => {
            
            if(rs.data.result)
            {toast.success(rs.data.message)
                retrieveData(
                    filters.filter.toUpperCase(),
                    page,
                    limit,
                    filters.ngay,
                    filters.thang,
                    filters.nam
                  );
            }
            else toast.error(rs.data.message)
        })
    }
        
       
  }
 
  return (
    <div>
      <SearchBar />
      <NavControl links={navlinkNVGH} />
      <ToastContainer />
      <div className="content">
        <h1>Danh sách đơn có thể nhận</h1>
        <div className={ modeChiTiet ? 'modal-duyetdon' : 'modal-duyetdon nonactive'}>
            <AiOutlineClose className='close' onClick={()=>{setMoDelChiTiet(!modeChiTiet)}}
            />

            <span>Địa chỉ gửi:</span>
            <span>{info.diaChiNguoiGui}</span>
            <span>Địa chỉ nhận:</span>
            <span>{info.diaChiNguoiNhan}</span>
            <span>Cước phí</span>
            <span>{Intl.NumberFormat('vi-Vn',{style:'currency',currency:'VND'}).format(info.cuocPhi)}</span>
            <p> Danh sách hàng hóa</p>
                <div>
                    <span>
                        Tên hàng hóa
                    </span>
                    <span>
                        Số lượng
                    </span>
                </div>
                {info.chiTietDonVanChuyens.map((e,i)=>{
                    return(
                        <div className='hanghoa'>
                            <span>{e.tenHangHoa}</span>
                            <span>{e.soLuong}</span>
                        </div>
                       
                    )
                })}
            
        </div>
        <div className="filter">
          <input
            type={'search'}
            name="filter"
            value={filters.filter}
            placeholder="Nhập tên người nhận hoặc người gửi để tìm kiếm"
            onChange={handleChangeFilter}
          />
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
        <p> <strong>Tổng số đơn : </strong>{totalRecord}</p>
        <div className="title">
          <span>Stt</span>
          <span>Người gửi</span>
          <span>Người nhận</span>
          <span>Số điện thoại nhận</span>
          <span>Số điện thoại gửi</span>
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
                <span >{e.tenNguoiNhan}</span>
                <span >{e.soDienThoaiNguoiGui}</span>
                <span >{e.soDienThoaiNguoiNhan}</span>
                <span >
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
                  <AiOutlineCheckCircle
                    style={{ fontSize: '30px', color: 'green' }}
                    title="Nhận đơn"
                    onClick={()=>{ handleNhanDon(values.maNVGH,e.maDonVanChuyen)}}
                  />
                
                  <MdInfoOutline
                    style={{ fontSize: '30px', color: 'lightcoral' }}
                    title="Chi tiết"
                    onClick={()=>{xemChiTietDonHang(e)
                    setMoDelChiTiet(!modeChiTiet)}}
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

export default NhanDonHang;
