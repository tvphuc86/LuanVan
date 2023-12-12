import React, { useEffect, useState,useRef } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { useReactToPrint } from 'react-to-print'
import { toast, ToastContainer } from 'react-toastify'
import navlinkQuanLy from '../routes/quanLy/linkquanly'
import AccountService from '../service/AccountService'
import QuanLyDonVanChuyenKHService from '../service/QuanLyDonVanChuyenKHService'
import ThongKeQuanLyService from '../service/ThongKeQuanLyService'
import { BillThanhToan } from './BillThanhToan'
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
function DanhSachCuocNo() {

 const maTaiKhoan = window.location.href.substring(
        window.location.href.lastIndexOf('/')+1, window.location.href.length-1
      
    )
    const loaiTaiKhoan = window.location.href.substring(
     window.location.href.length-1
  )
const [trangThais, setTrangThais] = useState([]);
  const [info, setInfo] = useState(initInfo);
  const [modeChiTiet, setMoDelChiTiet] = useState(false);
  const [NVGH, setNVGh] = useState(0);
  const [trangThaiDonHang, setTrangThaiDonHang] = useState([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [tongNo,setTongNo] = useState(0)
const [data,setData] = useState([])
const [loaded,setLoaded] = useState(0)
const [filters, setFilters] = useState(initFilter);

  useEffect(()=>{
    if(loaiTaiKhoan==0){
    ThongKeQuanLyService.getNoKh(maTaiKhoan)
    .then(rs =>{
        setData(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).skip((page-1)*limit).limit(limit))
        setTotalPage(Math.ceil(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).length/limit))
        let tongNo = 0
        rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).map(e=>{
          return tongNo+= e.cuocPhi
        })
        setTongNo(tongNo)
        setLoaded(1)
    })}
    if(loaiTaiKhoan==1){
      ThongKeQuanLyService.getNoNv(maTaiKhoan)
      .then(rs =>{
          setData(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).skip((page-1)*limit).limit(limit))
          setTotalPage(Math.ceil(rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).length/limit))
          let tongNo = 0
          rs.data.filter(x=>x.maVanDon.includes(filters.filter) && (new Date(x.thoiGian) >= new Date(filters.ngayBatDau) && new Date(x.thoiGian) <= new Date(filters.ngayKetThuc))).map(e=>{
            return tongNo+= e.tienThuHo
          })
          setTongNo(tongNo)
          setLoaded(1)
      })}
  },[page,limit,filters])
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  
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
    let TieuDe =loaiTaiKhoan == 0 ? "Thanh toán nợ cước phí" : "Thanh toán tiền thu hộ"
    let NoiDung =loaiTaiKhoan == 0?  "Bạn có " + Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tongNo) +  ' cước phí chưa thanh toán'
:"Bạn có " + Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tongNo) +  ' tiền thu hộ chưa thanh toán'
    ThongKeQuanLyService.postThongBao(maTaiKhoan,TieuDe,NoiDung)
    .then(rs => {
      if(rs.data)
        toast.success("Gửi thành công")
        else toast.error("Có lỗi khi gửi")
    })
}
const XacNhanThanhToan = () =>{
  if (loaiTaiKhoan==1){
    ThongKeQuanLyService.postTienThuHoNv(maTaiKhoan,filters.ngayBatDau,filters.ngayKetThuc)
    .then(rs => {
      
        toast.success("Thanh toán thành công")
        prinDonHang()
    })
  }
  if(loaiTaiKhoan==0){
    ThongKeQuanLyService.postNoCuocKH(maTaiKhoan,filters.ngayBatDau,filters.ngayKetThuc)
  .then(rs => {
    
      toast.success("Thanh toán thành công")
      prinDonHang()
  })
  }
}
const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  documentTitle:'Thông tin đơn vận chyển',
  removeAfterPrint: true
})
const  prinDonHang = async e =>{

  handlePrint()
}
const handleChangeFilter = (e) => {
  let { name, value } = e.target;
  setFilters({
    ...filters,
    [name]: value,
  });
};
  return (
    <div>
      <SearchBar />
      <ToastContainer/>
      <ChiTietDonHang modeChiTiet={modeChiTiet} setMoDelChiTiet={setMoDelChiTiet}
        info = {info}
        NVGH = {NVGH}
        trangThaiDonHang={trangThaiDonHang} />
      <NavControl links={navlinkQuanLy} />
      <div  style={{ display: "none"}}>{(loaded == 1 && tongNo!=0) ?  <BillThanhToan filters={filters} ref={componentRef} datahd={data[0]} trangThaiDonHang={tongNo} loaiTaiKhoan={ loaiTaiKhoan ==0 ? 2 : 1} /> : '' }</div>
      <div className='content'>
            <h1 style={{'paddingBottom':'1rem'}}>Danh sách cước nợ của {maTaiKhoan} </h1>
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
            <div>
              <h3 style={{'padding':'1rem', display:'inline-block'}}>Tổng nợ {Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(tongNo)}</h3>
              <button
              onClick={()=>{
                GuiYeuCauThanhToan()}}
               style={{'borderRadius':'5px','height':'40px','padding':'5px','fontSize':'16px'}}>Gửi yêu cầu thanh toán</button>
                   <button
              onClick={()=>{
                XacNhanThanhToan()}}
               style={{'borderRadius':'5px','height':'40px','padding':'5px','fontSize':'16px', marginInline:'0.5rem'}}>Xác nhận thanh toán</button>
              <table>
                <thead>
                <tr>
                  <th>Mã vận đơn</th>
                  <th>Người nhận</th>
                  <th>Trạng thái</th>
                  <th>{loaiTaiKhoan == 0 ? 'Cước nợ' : 'Phí nợ'}</th>
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
                    <td>{e.tenTrangThai}</td>
                    <td>{Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(loaiTaiKhoan == 0 ? e.cuocPhi : e.tienThuHo)}</td>
                    <td>{loaiTaiKhoan == 1? 'Tiền thu hộ đơn vận chuyển' : e.maTrangThaiDonVanChuyen == 19 ? "Nợ tiền chuyển hoàn" : "Nợ cước phí"}</td>
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

export default DanhSachCuocNo
