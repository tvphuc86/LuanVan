import axios from "axios"

class QuanLyDonVanChuyenKHService{
 getTrangThai(){
    return axios.get(`https://webapi.somee.com/api/TrangThaiDonHang`)
 }
 getDon(id){
    return axios.get(`https://webapi.somee.com/api/DonVanChuyen/khach-hang/quan-ly-don-van-chuyen?MaKhachHang=${id}`)
 }
 xoaDon(id){
    return axios.delete(`https://webapi.somee.com/api/DonVanChuyen/${id}`)
 }
 getTrangThaiDonHang(id){
   return axios.get(`https://webapi.somee.com/api/DonVanChuyen/trangThai/${id}`)
}
traCuocVanDon(id){
   return axios.get(`https://webapi.somee.com/api/DonVanChuyen/traCuuVanDon/${id}`)
}
}
export default new QuanLyDonVanChuyenKHService()