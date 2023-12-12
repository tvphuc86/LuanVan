import React, { useEffect, useState } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { ToastContainer } from 'react-toastify'
import navlinkQuanLy from '../routes/quanLy/linkquanly'
import AccountService from '../service/AccountService'
import QuanLyDonNVGHService from '../service/QuanLyDonNVGHService'
import QuanLyDonVanChuyenKHService from '../service/QuanLyDonVanChuyenKHService'
import ThongKeQuanLyService from '../service/ThongKeQuanLyService'
import ChiTietDonHang from './ChiTietDonHang'
import NavControl from './NavControl'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
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
function DanhSachDon(props) {
    const maTaiKhoan = window.location.href.substring(
        window.location.href.lastIndexOf('/')+1, window.location.href.length-1
      
    )
    const loaiTaiKhoan = window.location.href.substring(
     window.location.href.length-1
  )
    const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  const [filters, setFilters] = useState(initFilter);
    const [data, setData] = useState([])
    const [trangThais, setTrangThais] = useState([]);
    const [info, setInfo] = useState(initInfo);
    const [modeChiTiet, setMoDelChiTiet] = useState(false);
    const [NVGH, setNVGh] = useState(0);
    const [trangThaiDonHang, setTrangThaiDonHang] = useState([]);
    useEffect(
        ()=>{
          if(loaiTaiKhoan==0){
            ThongKeQuanLyService.getDonKH(maTaiKhoan)
            .then( rs => {setData(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).skip((page-1)*limit).limit(limit))
                setTotalPage(Math.ceil(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).length/limit))
            })
            .catch(e => console.log(e))}
            if(loaiTaiKhoan==1){
              ThongKeQuanLyService.getDonNV(maTaiKhoan)
              .then( rs => {setData(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).skip((page-1)*limit).limit(limit))
                  setTotalPage(Math.ceil(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).length/limit))
              })
              .catch(e => console.log(e))}

        },[page,limit,filters]
    )
    useEffect(() => {
        AccountService.getTenByID(info.maNhanVienGiaoHang).then((rs) =>
          setNVGh(rs.data)
        );
      }, [info.maNhanVienGiaoHang]);
    const xemChiTietDonHang = (e) => {
        setInfo(e);
      };
      useEffect(  () => {
        QuanLyDonVanChuyenKHService.getTrangThai().then(  (rs) =>
        setTrangThais(rs.data)
      );
      
      QuanLyDonVanChuyenKHService.getTrangThaiDonHang(info.maDonVanChuyen).then(
        (rs) => setTrangThaiDonHang(rs.data)
      );
    }, [info.maDonVanChuyen]);
    const handleChangeFilter = (e) => {
      let { name, value } = e.target;
      setFilters({
        ...filters,
        [name]: value,
      });
    };
  return (
    
    <div className=''>
         <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkQuanLy} />
      <ChiTietDonHang modeChiTiet={modeChiTiet} setMoDelChiTiet={setMoDelChiTiet}
        info = {info}
        NVGH = {NVGH}
        trangThaiDonHang={trangThaiDonHang} />
      <div className='content'>
        <h1 style={{'paddingBottom':'1rem'}}>Danh sách đơn hoàn thành của {maTaiKhoan}</h1>
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
        </div>
      <div className=''>
        <p style={{fontWeight:'bold', padding:'1rem'}}>Tổng : {data.length}</p>
        <table>
                <tr>
                    <th>Mã vận đơn</th>
                    <th>Tên người nhận</th>
                    <th>Địa chỉ người nhận</th>
                    <th>Số điện thoại người nhận</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
                {data.map((e,i)=>{
                     return(
                        <tr key={i}>
                            <td>{e.maVanDon}</td>
                            <td>{e.tenNguoiNhan}</td>
                            <td>{e.diaChiNguoiNhan}</td>
                            <td>{e.soDienThoaiNguoiNhan}</td>
                            <td>{e.tenTrangThai}</td>
                            <td><BsInfoCircle style={{'color':'green'}}
                            onClick={()=>{xemChiTietDonHang(e);
                                setMoDelChiTiet(!modeChiTiet);}}
                            /></td>
                        </tr>
                     )
                    })}
               </table>
           
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
  )
}

export default DanhSachDon
