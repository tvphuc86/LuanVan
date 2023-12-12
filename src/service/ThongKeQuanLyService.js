import axios from "axios";

class ThongKeQuanLyService {
    get(filter,ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/ThongKeQuanLy/ThongKeDonVanChuyen?tenKHorNVGH=${filter}&ngayBatDau=${ngayBatDau}&ngayKetThuc=${ngayKetThuc}`)
    }
    getDoanhThu(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/DoanhThuCongTy?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTienThuVao (ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/TienThuVao?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTienChuaChuyenChoKhachHang(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/TienChuaChuyenChoKhachHang?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTienDaChuyenChoKhachHang(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/TienDaChuyenChoKhachHang?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTienNhanVienGiaoHangConNo(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/TienNhanVienGiaoHangConNo?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTienKhachHangConNo(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/TienKhachHangConNo?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTienLuongNhanVienDaThanhToan(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/TienLuongNhanVienDaThanhToan?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTienLuongNhanVienChuaThanhToan(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/TienLuongNhanVienChuaThanhToan?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTongThu(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/Thu?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getTongChi(ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/DoanhThu/Chi?NgayBatDau=${ngayBatDau}&NgayKetThuc=${ngayKetThuc}`)
    }
    getKhachHang(){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/khachhang`)
    }
    getNhanVien(){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/nhanvien`)
    }
    getCuocPhiKhachHang(maKhachHang,ngayBatDau,ngayKetThuc){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/getCuocPhiKhachHang/${maKhachHang}?ngayBatDau=${ngayBatDau}&ngayKetThuc=${ngayKetThuc}`)
    }
    postNoCuocKhach(id,ngayBatDau,ngayKetThuc){
        return axios.post(`https://localhost:7088/api/QuanLyNguoiDung/noCuoc/thanhtoan/${id}?ngayBatDau=${ngayBatDau}&ngayKetThuc=${ngayKetThuc}`)
    }
    getDonKH (id){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/donHoanThanhKH/${id}`)
    }
    getNoKh(id){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/cuocConNo/${id}`)
    }
    getThongBao(id){
        return axios.get(`https://localhost:7088/api/ThongBao/${id}`)
    }
    postThongBao(maTaiKhoan,tieuDe,NoiDung){
        return axios.post(`https://localhost:7088/api/ThongBao?TieuDe=${tieuDe}&NoiDung=${NoiDung}&MaTaiKhoan=${maTaiKhoan}`)
    }
    postThongBaoQL(tieuDe,NoiDung){
        return axios.post(`https://localhost:7088/api/ThongBao/quan-ly?TieuDe=${tieuDe}&NoiDung=${NoiDung}`)
    }
    putThongBao(maTaiKhoan){
        return axios.put(`https://localhost:7088/api/ThongBao/${maTaiKhoan}`)
    }
    getDonNV (id){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/donNhanVien/${id}`)
    }
    getNoNv(id){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/tienNoThuHo/${id}`)
    }
    getNoThuHoKh(id){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/tienNoThuHoKh/${id}`)
    }
    getTop5KhachHang(){
        return axios.get(`https://localhost:7088/api/ThongKeQuanLy/top5KhachHang`)
    }
    getTop5NhanVien(){
        return axios.get(`https://localhost:7088/api/ThongKeQuanLy/top5NhanVien`)
    }
    postTienThuHoKh(id,ngayBatDau,ngayKetThuc){
        return axios.post(`https://localhost:7088/api/QuanLyNguoiDung/noTienThuHo/xacNhanThanhToan/${id}?ngayBatDau=${ngayBatDau}&ngayKetThuc=${ngayKetThuc}`)
    }
    postTienThuHoNv(id,ngayBatDau,ngayKetThuc){
        return axios.post(`https://localhost:7088/api/QuanLyNguoiDung/noTienThuHoNV/xacNhanThanhToan/${id}?ngayBatDau=${ngayBatDau}&ngayKetThuc=${ngayKetThuc}`)
    }
    postNoCuocKH(id,ngayBatDau,ngayKetThuc){
        return axios.post(`https://localhost:7088/api/QuanLyNguoiDung/noCuocKh/xacNhanThanhToan/${id}?ngayBatDau=${ngayBatDau}&ngayKetThuc=${ngayKetThuc}`)
    }
    getLuongNhanVien(id){
        return axios.get(`https://localhost:7088/api/QuanLyNguoiDung/luongNhanVien/${id}`)
    }
    postLuongNhanVien(id,ngayBatDau,ngayKetThuc){
        return axios.post(`https://localhost:7088/api/QuanLyNguoiDung/luongNhanVien/xacNhanThanhToan/${id}?ngayBatDau=${ngayBatDau}&ngayKetThuc=${ngayKetThuc}`)
    }
    getThongKeThang (){
        return axios.get(`https://localhost:7088/api/ThongKeQuanLy/ThongKeDoanhThuThang`)
    }
}
export default new ThongKeQuanLyService()