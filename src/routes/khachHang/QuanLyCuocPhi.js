import React, { useEffect, useState } from 'react'
import NavControl from '../../component/NavControl'
import Pagination from '../../component/Pagination';
import PaypalCheckoutButton from '../../component/PaypalCheckoutButton';
import SearchBar from '../../component/SearchBar'
import ThongKeQuanLyService from '../../service/ThongKeQuanLyService';
import navlinkKhachHang from './linkKhachHang'
import ReportCuocPhi from './ReportCuocPhi';
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
  const initCuocPhi = {
    tongCuoc : 0,
    chuaThanhToan : 0,
    thanhToan : 0
  }
const configVND = {style:'currency',currency:'VND'}
function QuanLyCuocPhi() {
    const [data,setData] = useState([])
    const [filters,setFilters] = useState(initFilter)
    const [cuocPhi,setCuocPhi] = useState(initCuocPhi)
    const [limit, setLimit] = useState(5);
     const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const handleChangePage = (value) => {
        setPage(value);
      };
      const handleChangeLimitPage = (e) => {
        setLimit(e.target.value);
      };
    useEffect(()=>{
        ThongKeQuanLyService.getCuocPhiKhachHang(localStorage.getItem('maTaiKhoan'),filters.ngayBatDau,filters.ngayKetThuc)
        .then( rs => {
            console.log(rs.data);
            setData(rs.data.data.filter(x=>x.maDonVanChuyen.toString().includes(filters.filter) || x.thanhToan.toString().includes(filters.filter)).skip((page-1)*limit).limit(limit))
            setTotalPage(Math.ceil(rs.data.data.filter(x=>x.maDonVanChuyen.toString().includes(filters.filter) || x.thanhToan.toString().includes(filters.filter)).length / limit));
            setCuocPhi({
                thanhToan: rs.data.thanhToan,
                chuaThanhToan: rs.data.chuaThanhToan,
                tongCuoc: rs.data.tongCuoc
            })
        
        })},[filters,page,limit])
    const handleChangeFilter = (e) => {
        let { name, value } = e.target;
        setFilters({
          ...filters,
          [name]: value,
        });
      };
  return (
    <div>
      <NavControl links={navlinkKhachHang} />
      <SearchBar />
      <div className='content'>
        <h1>Thống kê cước phí </h1>
        <div className="filter">
          <input
            type={'search'}
            name="filter"
            value={filters.filter}
            placeholder="Nhập mã đơn, true đã thanh toán, false chưa tt"
            onChange={handleChangeFilter}
          />
          <div>
            <label>Từ ngày</label>
            <input name='ngayBatDau' value={filters.ngayBatDau} onChange={handleChangeFilter} type={'date'}/> 
            <label>Đến ngày</label>
            <input name='ngayKetThuc' value={filters.ngayKetThuc} onChange={handleChangeFilter} type={'date'}/>
          </div>
            <ReportCuocPhi data={data} filter={filters}/>
          
        </div>
        <div className='title1'>
            <span>Tổng cước:  <strong>{Intl.NumberFormat('vi-VN',configVND).format(cuocPhi.tongCuoc)}</strong></span>
            <span>Đã thanh toán: <strong>{Intl.NumberFormat('vi-VN',configVND).format(cuocPhi.thanhToan)}</strong></span>
            <span>Chưa thanh toán:  <strong>{Intl.NumberFormat('vi-VN',configVND).format(cuocPhi.chuaThanhToan)}</strong></span>
            {cuocPhi.chuaThanhToan != 0 && <PaypalCheckoutButton noCuoc={true} className='paypal' ma={localStorage.getItem('maTaiKhoan')} tienThuHo={false} filters = {filters} data1={cuocPhi.chuaThanhToan}/>}
        </div>
            <table>
                <thead>
                    <tr>
                    <th >Mã đơn hàng</th>
                    <th>Trạng thái</th>
                    <th>Cước phí</th>
                    <th>Ngày thanh toán</th>
                    <th>Ngày thêm cước</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((e,i)=>{
            return(
                <tr key={i} >
                    <td > {e.maDonVanChuyen}</td>
                    <td>{e.thanhToan ? 'Đã thanh toán' : "Chưa thanh toán"}</td>
                    <td>{Intl.NumberFormat('vi-VN',configVND).format(e.cuocPhi)}</td>
                    <td>{e.ngayThanhToan!=null ? new Date(Date.parse(e.ngayThanhToan)).toLocaleDateString(): ''}</td>
                    <td>{e.ngayThem!=null ? new Date(Date.parse(e.ngayThem)).toLocaleDateString(): ''}</td>
                </tr>
            );
         })}
                </tbody>
            </table>
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
  )
}

export default QuanLyCuocPhi
