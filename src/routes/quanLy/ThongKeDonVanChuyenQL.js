import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'

import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineRollback,
} from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { GrReturn } from 'react-icons/gr';
import { MdCancel, MdChangeCircle, MdDelete, MdInfoOutline, MdOutlineDownloading } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { Bar } from 'recharts';
import BarChart1 from '../../component/Bar';
import NavControl from '../../component/NavControl';
import Pagination from '../../component/Pagination';
import SearchBar from '../../component/SearchBar';
import AccountService from '../../service/AccountService';
import QuanLyDonNVGHService from '../../service/QuanLyDonNVGHService';
import QuanLyDonVanChuyenKHService from '../../service/QuanLyDonVanChuyenKHService';
import QuanLyDonVanChuyenQLService from '../../service/QuanLyDonVanChuyenQLService';
import ThongKeQuanLyService from '../../service/ThongKeQuanLyService';
import navlinkQuanLy from './linkquanly';
import './ThongKeQL.css'
function addDays(date, days) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - days);
  return dateCopy;
}
const ngayHienTai = new Date()
const initFilter = {
  filter :'',
  ngayKetThuc: new Date().toISOString().substring(0,10).toString(),
  ngayBatDau: addDays(ngayHienTai,7).toISOString().substring(0,10).toString()
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
const initValue = {
  tongDon : 0,
  donHoangThanh: 0,
  donThatBai: 0,
  donMoiYeuCau: 0
}
function ThongKeDonVanChuyenQL() {
  const [maTaiKhoan, setMaTaiKhoan] = useState(
    localStorage.getItem('maTaiKhoan')
  );
  const [values,setValues] = useState(initValue)
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
  const [data,setData] = useState([])
  const [trangThaiDonHang, setTrangThaiDonHang] = useState([]);
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };

  useEffect(()=>{
    retrieveData(filters.filter,filters.ngayBatDau,filters.ngayKetThuc)
    
  },[filters])
  const retrieveData = (filter,ngayBatDau,ngayKetThuc) => {
    ThongKeQuanLyService.get(filter,ngayBatDau,ngayKetThuc)
    .then( rs=> {setData(rs.data.datas)
      setValues({
        tongDon: rs.data.datas[0].soDon,
        donHoangThanh : rs.data.donHoangThanh,
        donThatBai: rs.data.donThatBai,
        donMoiYeuCau: rs.data.donMoi
      })
    })
  };
  useEffect(() => {
    QuanLyDonVanChuyenKHService.getTrangThai().then((rs) =>
      setTrangThais(rs.data)
    );
  }, []);
  const handleChangeFilter = (e) => {
    let { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div>
      <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkQuanLy} />
      <div className="content">
        <h1>Quản lý đơn vận chuyển</h1>
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
        <div className="filter">
          <input
            type={'search'}
            name="filter"
            value={filters.filter}
            placeholder="Nhập tên , mã khách hàng hoặc nhân viên giao hàng"
            onChange={handleChangeFilter}
          />
          <div>
            <label>Từ ngày</label>
            <input name='ngayBatDau' value={filters.ngayBatDau} onChange={handleChangeFilter} type={'date'}/> 
            <label>Đến ngày</label>
            <input name='ngayKetThuc' value={filters.ngayKetThuc} onChange={handleChangeFilter} type={'date'}/>
          </div>
        
          
        </div>

        <div className='list-card'>
              <span className='card'>
                <h2>Tổng đơn</h2>
                <p>{values.tongDon} đơn</p>
                <p className='card-footer'></p>
              </span>
              <span className='card'>
                <h2>Đã hoàn thành</h2>
                <p>{values.donHoangThanh} đơn</p>
                <p className='card-footer'>{Intl.NumberFormat('vi-VN',{style:'percent',minimumFractionDigits : 3,maximumFractionDigits:3}).format(values.donHoangThanh/values.tongDon)}</p>
              </span>
              <span className='card'>
                <h2>Giao thất bại</h2>
                <p>{values.donThatBai} đơn</p>
                <p className='card-footer'>{Intl.NumberFormat('vi-VN',{style:'percent',minimumFractionDigits : 3,maximumFractionDigits:3}).format(((values.donThatBai/values.tongDon)))}</p>
              </span>
              <span className='card'>
                <h2>Đơn mới</h2>
                <p>{values.donMoiYeuCau}</p>
                <p className='card-footer'>{Intl.NumberFormat('vi-VN',{style:'percent',minimumFractionDigits : 3,maximumFractionDigits:3}).format(
                  (values.donMoiYeuCau/values.tongDon))}</p>
              </span>
        </div>
        <div>
          <BarChart1 data={data} lable='lable' keybars='soDon' />
          <p>Biểu đồ số lượng đơn hàng theo trạng thái</p>
        </div>
      </div>
    </div>
  );
}

export default ThongKeDonVanChuyenQL;
