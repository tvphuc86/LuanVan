import axios from "axios"

class QuanLyDonVanChuyenKHService{
 getTrangThai(){
    return axios.get(`https://localhost:7088/api/TrangThaiDonHang`)
 }
 getDon(id){
    return axios.get(`https://localhost:7088/api/DonVanChuyen/khach-hang/quan-ly-don-van-chuyen?MaKhachHang=${id}`)
 }
 xoaDon(id){
    return axios.delete(`https://localhost:7088/api/DonVanChuyen/${id}`)
 }
 getTrangThaiDonHang(id){
   return axios.get(`https://localhost:7088/api/DonVanChuyen/trangThai/${id}`)
}
traCuocVanDon(id){
   return axios.get(`https://localhost:7088/api/DonVanChuyen/traCuuVanDon/${id}`)
}
}
export default new QuanLyDonVanChuyenKHService()