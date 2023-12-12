import axios from "axios"

class QuanLyDonNVGHService{
 getTrangThai(){
    return axios.get(`https://localhost:7088/api/TrangThaiDonHang`)
 }
 getDon(id){
    return axios.get(`https://localhost:7088/api/DonVanChuyen/nhan-vien-giao-hang/quan-ly-don-van-chuyen?maNhanVien=${id}`)
 }
 capNhatTrangThai(id,maTrangThai,ghiChu){
    return axios.post(`https://localhost:7088/api/DonVanChuyen/cap-nhat-don/${id}?maTrangThai=${maTrangThai}&ghiChu=${ghiChu}`)
 }
 getTrangThaiDonHang(id){
   return axios.get(`https://localhost:7088/api/DonVanChuyen/trangThai/${id}`)
}
}
export default new QuanLyDonNVGHService()