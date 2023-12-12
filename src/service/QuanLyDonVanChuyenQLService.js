import axios from "axios"

class QuanLyDonVanChuyenQLService{
 getTrangThai(){
    return axios.get(`https://localhost:7088/api/TrangThaiDonHang`)
 }
 getDon(){
    return axios.get(`https://localhost:7088/api/DonVanChuyen/quan-ly/quan-ly-don-van-chuyen`)
 }
 capNhatTrangThai(id,maTrangThai,ghiChu){
    return axios.post(`https://localhost:7088/api/DonVanChuyen/cap-nhat-don/${id}?maTrangThai=${maTrangThai}&ghiChu=${ghiChu}`)
 }
 getTrangThaiDonHang(id){
   return axios.get(`https://localhost:7088/api/DonVanChuyen/trangThai/${id}`)
}
}
export default new QuanLyDonVanChuyenQLService()