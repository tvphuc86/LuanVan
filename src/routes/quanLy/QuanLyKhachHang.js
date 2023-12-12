import React, { useEffect, useState } from 'react';
import { BsCheckCircle, BsInfoCircle } from 'react-icons/bs';
import { FaMoneyBill } from 'react-icons/fa';
import { GrCompliance, GrMoney } from 'react-icons/gr';
import { MdMoneyOff } from 'react-icons/md';
import { useNavigate } from 'react-router';
import NavControl from '../../component/NavControl';
import Pagination from '../../component/Pagination';
import SearchBar from '../../component/SearchBar';
import ThongKeQuanLyService from '../../service/ThongKeQuanLyService';
import navlinkQuanLy from './linkquanly';
import './QuanLyKhachHang.css';
import ReportKhachHang from './ReportKhachHang';

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
function QuanLyKhachHang() {
  const [khachHangs, setKhachHangs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRecord, setTotalRecord] = useState(0);
  const [limit, setLimit] = useState(5);
  const [top5,setTop5] = useState({top5TiLe:[],top5CuocPhi: [],top5No :[]})
  const [filters, setFilters] = useState(initFilter);
  const navigate = useNavigate();
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
  useEffect(()=>{
    ThongKeQuanLyService.getTop5KhachHang()
    .then( rs =>{ setTop5(rs.data)
     console.log(rs.data);
  })
  },[])
  useEffect(() => {
    ThongKeQuanLyService.getKhachHang().then((rs) => {
      setKhachHangs(
        rs.data
          .filter(
            (x) =>
              x.maKhachHang.includes(filters.filter) || x.tenKhachHang.includes(filters.filter)
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
            tongCuocConNo += e.cuocConNo,
            tongTienThuHoConNo += e.tienThuHo,
            tongSoDon += e.soDonHang)
      })
      setTong({
        tongDonHoanThanh: tongSoDon,
        tongTienThuHoConNo: tongTienThuHoConNo,
        tongCuocConNo: tongCuocConNo
      })
    });
   
  }, [filters, page, limit]);
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
        <h1>Thống kê khách hàng </h1>
        
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
          <ReportKhachHang data={khachHangs} />
        </div>
        <div className="title-kh">
        <span>Tổng khách hàng: <strong>{khachHangs.length}</strong></span>

          <span>Tổng đơn hoàn thành: <strong>{tong.tongDonHoanThanh}</strong></span>
          <span>Tổng cước  nợ: <strong>{tong.tongCuocConNo}</strong></span>
          <span>Tổng tiền thu hộ  nợ: <strong>{tong.tongTienThuHoConNo}</strong></span>
        </div>
        <div className='list-card'>
              <span className='card'>
                <h2>Top 5 cước thanh toán<FaMoneyBill style={{'color':'yellow'}}/></h2>
                {
                   top5.top5TiLe.sort((a,b)=>  b.cuocPhi-a.cuocPhi).map((e,i)=>{
                    return(
                    <p>{e.maKhachHang} - cước: {Intl.NumberFormat('vi-Vn',{style:'currency',currency:'VND'}).format(e.cuocPhi)} 
                    <BsInfoCircle style={{'color':'green'}} />
                    
                    </p>
                    )
                   })
                }
                <p className='card-footer'></p>
              </span>
              <span className='card'>
                <h2>Top 5 tỉ lệ đơn thành công <BsCheckCircle style={{'color':'green'}} /></h2>
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
                <h2>Top 5 nợ cước phí <MdMoneyOff style={{'color':'red'}}/></h2>
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
          <span>Mã khách hàng</span>
          <span>Tên khách hàng</span>
          <span>Số điện thoại</span>
          <span>Số đơn hàng hoàn thành</span>
          <span>Cước còn nợ</span>
          <span>Cước đã trả</span>
          <span>Tiền thu hộ chưa thanh toán</span>
        </div>
        <div className="list-khachHang">
          {khachHangs.map((e, i) => {
            return (
              <div className="khachHang">
                <span>{e.maKhachHang}</span>
                <span>{e.tenKhachHang}</span>
                <span>{e.soDienThoai}</span>
                <span>
                  {e.soDonHang}
                  {e.soDonHang != 0 ? (
                    <BsInfoCircle
                      style={{
                        color: 'green',
                        paddingLeft: '5px',
                        fontSize: '20px',
                      }}
                      title="chi tiết đơn"
                      onClick={() =>
                        navigate('/don-hoang-thanhkh/' + e.maKhachHang + '0')
                      }
                    />
                  ) : (
                    ''
                  )}
                </span>
                <span>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.cuocConNo)}

                  {e.cuocConNo == 0 ? (
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
                        navigate('/cuoc-phi-con-no/' + e.maKhachHang + '0')
                      }
                    />
                  )}
                </span>
                <span>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.cuocDaTra)}
                </span>
                <span>
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.tienThuHo)}
                    {e.tienThuHo != 0 ? (
                    <BsInfoCircle
                      style={{
                        color: 'green',
                        paddingLeft: '5px',
                        fontSize: '20px',
                      }}
                      title="chi tiết đơn"
                      onClick={() =>
                        navigate('/tien-thu-ho-kh/' + e.maKhachHang + '0')
                      }
                    />
                  ) : (
                    ''
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

export default QuanLyKhachHang;
