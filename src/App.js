
import Contact from './routes/Contact'
import { Navigate, Route, Routes } from "react-router";
import Home from "./routes/Home";
import DashboardQuanLy from "./routes/DashboardQuanLy";
import HTVC from './routes/quanLy/HTVC';
import CuocPhi from './routes/quanLy/CuocPhi';
import UocTinh from './routes/UocTinh';
import Login from './routes/accounts/Login';
import Register from './routes/accounts/Register';
import { useState } from 'react';
import BangTrongLuong from './routes/quanLy/BangTrongLuong';
import DuLieuTinhCuoc from './routes/quanLy/DuLieuTinhCuoc';
import DashbordKhachHang from './routes/khachHang/dashbordKhachHang'
import ThongTinCaNhan from './routes/khachHang/ThongTinCaNhan';
import SoDiaChi from './routes/khachHang/SoDiaChi';
import NguoiNhanCaNhan from './routes/khachHang/NguoiNhanCaNhan';
import MatHangCaNhan from './routes/khachHang/MatHangCaNhan';
import ThongTinCaNhanQL from './routes/quanLy/ThongTinCaNhan';
import TaoDonVanChuyen from './routes/khachHang/TaoDonVanChuyen';
import DuyetDonVanChuyen from './routes/quanLy/DuyetDonVanChuyen';
import QuanLyDonVanChuyen from './routes/khachHang/QuanLyDonVanChuyen';
import NhanDonHang from './routes/NhanVienGiaoHang/NhanDonHang';
import QuanLyDonVanChuyenNVGH from './routes/NhanVienGiaoHang/QuanLyDon';
import QuanLyDonVanChuyenQL from './routes/quanLy/QuanLyDonVanChuyen';

import ThongKeDonVanChuyenQL from './routes/quanLy/ThongKeDonVanChuyenQL';
import PrintFile from './component/PrintFile';
import QuanLyDoanhThu from './routes/quanLy/QuanLyDoanhThu';
import QuanLyKhachHang from './routes/quanLy/QuanLyKhachHang';
import QuanLyNhanVienGiaoHang from './routes/quanLy/QuanLyNhanVienGiaoHang';
import QuanLyCuocPhi from './routes/khachHang/QuanLyCuocPhi';
import DanhSachDon from './component/DanhSachDon';
import DanhSachCuocNo from './component/DanhSachCuocNo';
import TienThuHo from './component/TienThuHo';
import LuongNhanVien from './component/LuongNhanVien';
import ThongKeTienThuHoKH from './routes/khachHang/ThongKeTienThuHoKH';
import Info from './routes/Info';
import ThongKeTienThuHoNV from './routes/NhanVienGiaoHang/ThongKeTienThuHoNV';
import ThongKeLuong from './routes/NhanVienGiaoHang/ThongKeLuong';
import LoaiMatHang from './routes/quanLy/LoaiMatHang';
import BaoHiemDonVanChuyen from './routes/quanLy/BaoHiemDonVanChuyen';
import ThongTinCaNhanNV from './routes/NhanVienGiaoHang/ThongTinCaNhan';
import DuyetMatHangCaNhan from './routes/quanLy/DuyetMatHangCaNhan';
import { BrowserRouter } from 'react-router-dom';
function App() {

  return (
    
    <div className="App">
       <BrowserRouter basename="/LuanVan">

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/*" element={<Home />}> </Route>
        <Route path="/trang-chu" element={<Home />}> </Route>
        <Route path="/uoc-tinh" element={<UocTinh />}> </Route>
        <Route path="/lien-lac" element={<Contact />}> </Route>
        <Route path="/quan-ly" element={<QuanLy><DashboardQuanLy /></QuanLy>}></Route>
        <Route path="/quan-ly/cuoc-phi" element={<QuanLy ><CuocPhi /></QuanLy>}></Route>
        <Route path="/quan-ly/loai-mat-hang" element={<QuanLy ><LoaiMatHang /></QuanLy>}></Route>
        <Route path="/quan-ly/phi-bao-hiem" element={<QuanLy ><BaoHiemDonVanChuyen /></QuanLy>}></Route>
        <Route path="/quan-ly/hinh-thuc-van-chuyen" element={<QuanLy ><HTVC /></QuanLy>}></Route>
        <Route path="/quan-ly/bang-trong-luong" element={<QuanLy ><BangTrongLuong /></QuanLy>}></Route>
        <Route path="/quan-ly/du-lieu-tinh-cuoc" element={<QuanLy ><DuLieuTinhCuoc /></QuanLy>}></Route>
        <Route path="/quan-ly/thong-tin-ca-nhan" element={<QuanLy ><ThongTinCaNhanQL /></QuanLy>}></Route>
        <Route path="/quan-ly/duyet-don-van-chuyen" element={<QuanLy ><DuyetDonVanChuyen /></QuanLy>}></Route>
        <Route path="/quan-ly/quan-ly-don-van-chuyen" element={<QuanLy ><QuanLyDonVanChuyenQL /></QuanLy>}></Route>
        <Route path="/quan-ly/thong-ke-don-van-chuyen" element={<QuanLy ><ThongKeDonVanChuyenQL /></QuanLy>}></Route>
        <Route path="/quan-ly/quan-ly-doanh-thu" element={<QuanLy ><QuanLyDoanhThu /></QuanLy>}></Route>
        <Route path="/quan-ly/duyet-mat-hang-ca-nhan" element={<QuanLy ><DuyetMatHangCaNhan /></QuanLy>}></Route>
        <Route path="/quan-ly/quan-ly-khach-hang" element={<QuanLy ><QuanLyKhachHang /></QuanLy>}></Route>
        <Route path="/quan-ly/quan-ly-nhan-vien-giao-hang" element={<QuanLy ><QuanLyNhanVienGiaoHang /></QuanLy>}></Route>
        <Route path="/don-hoang-thanhkh/*" element={<QuanLy ><DanhSachDon /></QuanLy>}></Route>
        <Route path="/cuoc-phi-con-no/*" element={<QuanLy ><DanhSachCuocNo /></QuanLy>}></Route>
        <Route path="/don-nhan-vien/*" element={<QuanLy ><DanhSachDon /></QuanLy>}></Route>
        <Route path="/no-tien-thu-ho/*" element={<QuanLy ><DanhSachCuocNo /></QuanLy>}></Route>
        <Route path="/tien-thu-ho-kh/*" element={<QuanLy ><TienThuHo /></QuanLy>}></Route>
        <Route path="/luong-nhan-vien/*" element={<QuanLy ><LuongNhanVien /></QuanLy>}></Route>


        <Route path="/khach-hang/tao-don-van-chuyen" element={<KhachHang ><TaoDonVanChuyen /></KhachHang>}></Route>
        <Route path="/khach-hang/thong-ke-tien-thu-ho" element={<KhachHang ><ThongKeTienThuHoKH /></KhachHang>}></Route>

        <Route path='/thong-tin-ca-nhan' element={<KhachHang ><ThongTinCaNhan /></KhachHang>}></Route>
        <Route path='/khach-hang' element={<KhachHang > <DashbordKhachHang /> </KhachHang>}></Route>
        <Route path='/khach-hang/so-dia-chi' element={<KhachHang > <SoDiaChi /> </KhachHang>}></Route>
        <Route path='/khach-hang/nguoi-nhan-ca-nhan' element={<KhachHang > <NguoiNhanCaNhan /> </KhachHang>}></Route>
        <Route path='/khach-hang/mat-hang-ca-nhan' element={<KhachHang > <MatHangCaNhan /> </KhachHang>}></Route>
        <Route path='/khach-hang/quan-ly-don-van-chuyen' element={<KhachHang > <QuanLyDonVanChuyen /> </KhachHang>}></Route>
        <Route path='/khach-hang/quan-ly-cuoc-phi' element={<KhachHang > <QuanLyCuocPhi /> </KhachHang>}></Route>



        <Route path='/nhan-vien-giao-hang' element={<NVGH > <NhanDonHang /> </NVGH>}></Route>
        <Route path='/nhan-vien-giao-hang/nhan-don-hang' element={<NVGH > <NhanDonHang /> </NVGH>}></Route>
        <Route path='/nhan-vien-giao-hang/quan-ly-don' element={<NVGH > <QuanLyDonVanChuyenNVGH /> </NVGH>}></Route>
        <Route path='/nhan-vien-giao-hang/thong-ke-tien-thu-ho' element={<NVGH > <ThongKeTienThuHoNV /> </NVGH>}></Route>
        <Route path='/nhan-vien-giao-hang/thong-ke-luong' element={<NVGH > <ThongKeLuong /> </NVGH>}></Route>
        <Route path='/nhan-vien-giao-hang/thong-tin-ca-nhan' element={<NVGH ><ThongTinCaNhanNV /></NVGH>}></Route>

        <Route path='/dang-nhap'  element={<Login  />}  />
        <Route path='/dang-ky' element={<Register />} />
        <Route path='/tra-cuu-van-don' element={<Info />} />
      </Routes>
      </BrowserRouter >

    </div>
  );
}
function QuanLy (props){
  const [Role,setRole] = useState(window.localStorage.getItem("role"))
  const [UserName,setUserName]=useState(window.localStorage.getItem("userName"))
  if (UserName==null)
    return <Navigate to={"/dang-nhap"} />
if(Role.includes("QUAN_LY"))
    return <>{props.children}</>
  else
  return <><h1 style={{'textAlign':'center',color:'red', height:'100vh'}}>Bạn không có quyền truy cập vào trang này</h1></>
}
function KhachHang (props){
  const [Role,setRole] = useState(window.localStorage.getItem("role"))
  const [UserName,setUserName]=useState(window.localStorage.getItem("userName"))
  if (UserName==null)
    return <Navigate to={"/dang-nhap"} />
if(Role.includes("KHACH_HANG"))
    return <>{props.children}</>
  else
  return <><h1 style={{'textAlign':'center',color:'red', height:'100vh'}}>Bạn không có quyền truy cập vào trang này</h1></>
}
function NVGH (props){
  const [Role,setRole] = useState(window.localStorage.getItem("role"))
  const [UserName,setUserName]=useState(window.localStorage.getItem("userName"))
  if (UserName==null)
    return <Navigate to={"/dang-nhap"} />
if(Role.includes("NVGH"))
    return <>{props.children}</>
  else
    return <><h1 style={{'textAlign':'center',color:'red', height:'100vh'}}>Bạn không có quyền truy cập vào trang này</h1></>
}
function Public (props){
  const [Role,setRole] = useState(window.localStorage.getItem("role"))
  const [UserName,setUserName]=useState(window.localStorage.getItem("userName"))
  if (UserName==null)
    return <Navigate to={"/dang-nhap"} />
    else
    return <>{props.children}</>
 
}

export default App;
