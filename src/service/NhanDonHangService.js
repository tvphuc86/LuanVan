import axios from "axios"

class NhanDonHangService {
    getDon(){
        return axios.get(`https://webapi.somee.com/api/DonVanChuyen/nhan-vien-giao-hang/nhan-don-hang`)
    }
    nhanDon(id,maNVGH){
        return axios.post(`https://webapi.somee.com/api/DonVanChuyen/nhan-don/${id}?maNVGH=${maNVGH}`)
    }
}
export default new NhanDonHangService ()