import axios from "axios"

class QuanLyDonNVGHService{
 getTrangThai(){
    return axios.get(`https://webapi.somee.com/api/TrangThaiDonHang`)
 }
 getDon(id){
    return axios.get(`https://webapi.somee.com/api/DonVanChuyen/nhan-vien-giao-hang/quan-ly-don-van-chuyen?maNhanVien=${id}`)
 }
 capNhatTrangThai(id,maTrangThai,ghiChu){
    return axios.post(`https://webapi.somee.com/api/DonVanChuyen/cap-nhat-don/${id}?maTrangThai=${maTrangThai}&ghiChu=${ghiChu}`)
 }
 getTrangThaiDonHang(id){
   return axios.get(`https://webapi.somee.com/api/DonVanChuyen/trangThai/${id}`)
}
}
export default new QuanLyDonNVGHService()