import axios from "axios"

class QuanLyDonVanChuyenQLService{
 getTrangThai(){
    return axios.get(`https://webapi.somee.com/api/TrangThaiDonHang`)
 }
 getDon(){
    return axios.get(`https://webapi.somee.com/api/DonVanChuyen/quan-ly/quan-ly-don-van-chuyen`)
 }
 capNhatTrangThai(id,maTrangThai,ghiChu){
    return axios.post(`https://webapi.somee.com/api/DonVanChuyen/cap-nhat-don/${id}?maTrangThai=${maTrangThai}&ghiChu=${ghiChu}`)
 }
 getTrangThaiDonHang(id){
   return axios.get(`https://webapi.somee.com/api/DonVanChuyen/trangThai/${id}`)
}
}
export default new QuanLyDonVanChuyenQLService()