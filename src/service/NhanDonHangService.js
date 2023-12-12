import axios from "axios"

class NhanDonHangService {
    getDon(){
        return axios.get(`https://localhost:7088/api/DonVanChuyen/nhan-vien-giao-hang/nhan-don-hang`)
    }
    nhanDon(id,maNVGH){
        return axios.post(`https://localhost:7088/api/DonVanChuyen/nhan-don/${id}?maNVGH=${maNVGH}`)
    }
}
export default new NhanDonHangService ()