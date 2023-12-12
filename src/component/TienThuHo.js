import React, { useEffect, useRef, useState } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { useReactToPrint } from 'react-to-print'
import { toast, ToastContainer } from 'react-toastify'
import navlinkKhachHang from '../routes/khachHang/linkKhachHang'
import navlinkNVGH from '../routes/NhanVienGiaoHang/NavLinkNVGH'
import navlinkQuanLy from '../routes/quanLy/linkquanly'
import AccountService from '../service/AccountService'
import QuanLyDonVanChuyenKHService from '../service/QuanLyDonVanChuyenKHService'
import ThongKeQuanLyService from '../service/ThongKeQuanLyService'
import { BillThanhToan } from './BillThanhToan'
import ChiTietDonHang from './ChiTietDonHang'
import NavControl from './NavControl'
import Pagination from './Pagination'
import PaypalCheckoutButton from './PaypalCheckoutButton'
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
function TienThuHo(props) {
    
 let {maTaiKhoan,khachHang, loaiTaiKhoan} = props
 
  maTaiKhoan = maTaiKhoan==null ? window.location.href.substring(
        window.location.href.lastIndexOf('/')+1, window.location.href.length-1
    ): maTaiKhoan
     loaiTaiKhoan = loaiTaiKhoan==null ? window.location.href.substring(
     window.location.href.length-1 
  ): loaiTaiKhoan
  const [filters, setFilters] = useState(initFilter);

const [trangThais, setTrangThais] = useState([]);
  const [info, setInfo] = useState(initInfo);
  const [modeChiTiet, setMoDelChiTiet] = useState(false);
  const [NVGH, setNVGh] = useState(0);
  const [trangThaiDonHang, setTrangThaiDonHang] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [tongNo,setTongNo] = useState(0);
  const [daThanhToan,setDaThanhToan] = useState(0)
const [loaded,setLoaded] = useState(0);
const [data,setData] = useState([])
  useEffect(()=>{
    if(loaiTaiKhoan==0){
    ThongKeQuanLyService.getNoThuHoKh(maTaiKhoan)
    .then(rs =>{
        console.log(rs.data);
        setData(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).skip((page-1)*limit).limit(limit))
        setTotalPage(Math.ceil(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).length/limit))
        let tongNo = 0
        let daThanhToan = 0
        console.log(data);
        rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).map(e=>{
            return e.thanhToan==false ?  tongNo += e.tienThuHo  : daThanhToan += e.tienThuHo
        })
        setTongNo(tongNo)
        setDaThanhToan(daThanhToan)
        setLoaded(1)
    })}
    if(loaiTaiKhoan==1){
      ThongKeQuanLyService.getNoNv(maTaiKhoan)
      .then(rs =>{
        console.log(rs.data);
        setData(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).skip((page-1)*limit).limit(limit))
        setTotalPage(Math.ceil(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).length/limit))
        let tongNo = 0
        let daThanhToan = 0
        console.log(data);
        rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).map(e=>{
            return e.thanhToan==false ?  tongNo += e.tienThuHo  : daThanhToan += e.tienThuHo
        })
        setTongNo(tongNo)
        setDaThanhToan(daThanhToan)
        setLoaded(1)
      })}
  },[page,limit,filters])
  useEffect(()=>{

  },[page,limit,filters])
  const handleChangeFilter = (e) => {
    let { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle:'Thông tin đơn vận chyển',
    removeAfterPrint: true
  })
  const  prinDonHang = async e =>{

    handlePrint()
  }
  useEffect(() => {
    AccountService.getTenByID(info.maNhanVienGiaoHang).then(rs =>{
      setNVGh(rs.data)}
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
const GuiYeuCauThanhToan = () =>{
    let TieuDe =loaiTaiKhoan == 0 ? "Thanh toán tiền thu hộ "+ maTaiKhoan : ""
    let NoiDung =loaiTaiKhoan == 0?  "Có  " + Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tongNo) +  ' tiền thu hộ chưa thanh toán'
:"Bạn có " + Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tongNo) +  ' tiền thu hộ chưa thanh toán'
    ThongKeQuanLyService.postThongBaoQL(TieuDe,NoiDung)
    .then(rs => toast.success(rs.data))

}
const XacNhanThanhToan =()=>{
    ThongKeQuanLyService.postTienThuHoKh(maTaiKhoan,filters.ngayBatDau,filters.ngayKetThuc)
    .then(rs => {
        prinDonHang()
        toast.success(rs.data)
       
    })
}
  return (
    <div>
      <SearchBar />
      <ToastContainer/>
      <ChiTietDonHang modeChiTiet={modeChiTiet} setMoDelChiTiet={setMoDelChiTiet}
        info = {info}
        NVGH = {NVGH}
        trangThaiDonHang={trangThaiDonHang} />
      <NavControl links={khachHang== 1 ? navlinkKhachHang : khachHang==2 ? navlinkNVGH : navlinkQuanLy} />
      <div  style={{ display: "none"}}>{(loaded == 1 && tongNo != 0)==true ? <BillThanhToan filters={filters} ref={componentRef} loaiTaiKhoan={0} datahd={data[0]} trangThaiDonHang={tongNo} /> : ' '}</div>
      <div className='content'>
            <h1 style={{'paddingBottom':'1rem'}}>Danh sách tiền thu hộ {maTaiKhoan} </h1>
            <div>
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
              <h3 style={{'padding':'1rem', display:'inline-block'}}>Chưa thanh toán {Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tongNo)}
              {'- - - - - '} Đã thanh toán {Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(daThanhToan)}
              </h3>
             { (window.location.href.includes('thong') )?
             tongNo != 0 && khachHang!=2 ?
              <button
              onClick={()=>{
                GuiYeuCauThanhToan()}}
               style={{'borderRadius':'5px','height':'40px','padding':'5px','fontSize':'16px'}}>Gửi yêu cầu thanh toán</button> : '': tongNo!= 0 && khachHang!=2? 
                <button
              onClick={()=>{
                XacNhanThanhToan()}}
               style={{'borderRadius':'5px','height':'40px','padding':'5px','fontSize':'16px'}}>Xác nhận thanh toán</button>: ''}
             {tongNo !=0 && khachHang==2 &&  <PaypalCheckoutButton noCuoc={true} className='paypal' ma={localStorage.getItem('maTaiKhoan')} tienThuHo={false} filters = {filters} nhanvien={true} data1={tongNo}/>}
              <table>
                <thead>
                <tr>
                  <th>Mã vận đơn</th>
                  <th>Người nhận</th>
                  <th>Trạng thái</th>
                  <th>Tiền thu hộ</th>
                  <th>Ghi chú</th>
                  <th>Ngày ghi nợ</th>
                  <th>Chi tiết</th>
                </tr>
                </thead>
               <tbody>
                {data.map((e,i)=>{
                  return(
                    <tr key={i}>
                    <td>{e.maVanDon}</td>
                    <td>{e.tenNguoiNhan}</td>
                    <td>{e.thanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                    <td>{Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(e.tienThuHo)}</td>
                    <td>Tiền thu hộ khách hàng</td>
                    <td>{new Date(Date.parse(e.thoiGian)).toLocaleDateString()}</td>
                    <td><BsInfoCircle style={{'color':'green'}}
                            onClick={()=>{xemChiTietDonHang(e);
                                setMoDelChiTiet(!modeChiTiet);}}
                            /></td>
                  </tr>
                  )
                })}
               </tbody>
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

export default TienThuHo
