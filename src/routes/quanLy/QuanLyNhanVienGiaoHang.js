import React, { useEffect, useState } from 'react';
import { BsCheck2Circle, BsInfoCircle } from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa';
import { MdMoneyOff } from 'react-icons/md';
import { useNavigate } from 'react-router';
import NavControl from '../../component/NavControl';
import Pagination from '../../component/Pagination';
import SearchBar from '../../component/SearchBar';
import ThongKeQuanLyService from '../../service/ThongKeQuanLyService';
import navlinkQuanLy from './linkquanly';
import './QuanLyKhachHang.css';
import ReportNhanVien from './ReportNhanVien';

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
function QuanLyNhanVienGiaoHang() {
  const [khachHangs, setKhachHangs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState(initFilter);
  const navigate = useNavigate();
  const [top5,setTop5] = useState({top5TiLe:[],top5CuocPhi: [],top5No :[]})
  const [tong,setTong]  = useState({
    tongDonHoanThanh: 0,
    tongKhachHang: 0,
    tiLeHoanThanh: 0,
    tongCuocConNo: 0,
    tongTienThuHoConNo: 0,
  })
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  useEffect(() => {
    ThongKeQuanLyService.getNhanVien().then((rs) => {
      setKhachHangs(
        rs.data
          .filter(
            (x) =>
              x.maNhanVien.includes(filters.filter) || x.tenNhanVien.includes(filters.filter)
          )
          .skip((page - 1) * limit)
          .limit(limit)
      );
      setTotalPage(Math.ceil(rs.data.length / limit));
      setTotalRecord(rs.data.length);
      let tongCuocConNo = 0
      let tongTienThuHoConNo = 0
      let tongSoDon = 0
      rs.data.map(e=>{
        return(
            tongCuocConNo += e.luong,
            tongTienThuHoConNo += e.tienNo,
            tongSoDon += e.soDonHang)
      })
      setTong({
        tongDonHoanThanh: tongSoDon,
        tongTienThuHoConNo: tongTienThuHoConNo,
        tongCuocConNo: tongCuocConNo
      })
    });
  }, [filters,page,limit]);
  const handleChangeFilter = (e) => {
    let { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  useEffect(()=>{
    ThongKeQuanLyService.getTop5NhanVien()
    .then( rs =>{ setTop5(rs.data)
     console.log(rs.data);
  })
  },[])
  return (
    <div>
      <NavControl links={navlinkQuanLy} />
      <SearchBar />

      <div className="content">
        <h1>Thống kê nhân viên giao hàng</h1>
        <div className="filter">
          <input
            type={'search'}
            name ='filter'
            placeholder="Nhập tên khách hàng hoặc mã khách hàng"
            onChange={handleChangeFilter}
          />
             <div>
            <label>Từ ngày</label>
            <input name='ngayBatDau' value={filters.ngayBatDau} onChange={handleChangeFilter} type={'date'}/> 
            <label>Đến ngày</label>
            <input name='ngayKetThuc' value={filters.ngayKetThuc} onChange={handleChangeFilter} type={'date'}/>
          </div>
          <ReportNhanVien data={khachHangs} />
        </div>
        <div className="title-kh">
        <span>Tổng nhân viên: <strong>{khachHangs.length}</strong></span>
          
          <span>Tổng đơn hoàn thành: <strong>{tong.tongDonHoanThanh}</strong></span>
          <span>Tổng lương: <strong>{Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tong.tongCuocConNo)}</strong></span>
          <span>Tổng tiền thu hộ  nợ: <strong>{Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tong.tongTienThuHoConNo)}</strong></span>
        </div>
        <div className='list-card'>
              <span className='card'>
                <h2>Top 5 lương<FaMoneyBill style={{'color':'yellow'}}/></h2>
                {
                   top5.top5CuocPhi.sort((a,b)=>  b.luong-a.luong).map((e,i)=>{
                    return(
                    <p>{e.maKhachHang} - lương: {Intl.NumberFormat('vi-Vn',{style:'currency',currency:'VND'}).format(e.luong)} 
                    <BsInfoCircle style={{'color':'green'}} />
                    
                    </p>
                    )
                   })
                }
                <p className='card-footer'></p>
              </span>
              <span className='card'>
                <h2>Top 5 tỉ lệ đơn thành công <BsCheck2Circle style={{'color':'green'}} /></h2>
                {
                   top5.top5TiLe.sort((a,b)=>  b.tiLe-a.tiLe).map((e,i)=>{
                    return(
                    <p>{e.maKhachHang} - tỉ lệ: {Intl.NumberFormat('vi-Vn',{style:'unit',unit:'percent'}).format(e.tiLe)}
                      <BsInfoCircle style={{'color':'green'}} /></p>
                    )
                   })
                }
               
                <p className='card-footer'></p>
              </span>
              <span className='card'>
                <h2>Top 5 nợ tiền thu hộ <MdMoneyOff style={{'color':'red'}}/></h2>
                {
                   top5.top5TiLe.sort((a,b)=>  b.tienNo-a.tienNo).map((e,i)=>{
                    return(
                    <p>{e.maKhachHang} - nợ: {Intl.NumberFormat('vi-Vn',{style:'currency',currency:'VND'}).format(e.tienNo)}
                      <BsInfoCircle style={{'color':'green'}} /></p>
                    )
                   })
                }
                <p className='card-footer'></p>
              </span>
             
        </div>
        <div className="title-kh">
          <span>Mã nhân viên</span>
          <span>Tên nhân viên</span>
          <span>Số điện thoại</span>
          <span>Số đơn đã nhận</span>
          <span>Tổng lương</span>
          <span>Tiền thu hộ</span>
          <span>Tiền nợ</span>
        </div>
        <div className="list-khachHang">
          {khachHangs.map((e, i) => {
            return (
              <div className="khachHang">
                <span>{e.maNhanVien}</span>
                <span>{e.tenNhanVien}</span>
                <span>{e.soDienThoai}</span>
                <span>
                  {e.soDonHang}{' '}
                  {e.soDonHang == 0 ? (
                    ''
                  ) : (
                    <BsInfoCircle
                      style={{
                        color: 'green',
                        paddingLeft: '5px',
                        fontSize: '20px',
                      }}
                      title="chi tiết"
                      onClick={() =>
                        navigate('/don-nhan-vien/' + e.maNhanVien+'1')
                      }
                    />
                  )}
                </span>
                <span>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.luong)}
                 {e.luong == 0 ? (
                    ''
                  ) : (
                    <BsInfoCircle
                      style={{
                        color: 'green',
                        paddingLeft: '5px',
                        fontSize: '20px',
                      }}
                      title="chi tiết"
                      onClick={() =>
                        navigate('/luong-nhan-vien/' + e.maNhanVien + '1')
                      }
                    />
                  )}
                </span>
                <span>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.tongTienThuHo)}
                  
                </span>
                <span>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.tienNo)}
                  {e.tienNo == 0 ? (
                    ''
                  ) : (
                    <BsInfoCircle
                      style={{
                        color: 'green',
                        paddingLeft: '5px',
                        fontSize: '20px',
                      }}
                      title="chi tiết"
                      onClick={() =>
                        navigate('/no-tien-thu-ho/' + e.maNhanVien + '1')
                      }
                    />
                  )}
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

export default QuanLyNhanVienGiaoHang;
