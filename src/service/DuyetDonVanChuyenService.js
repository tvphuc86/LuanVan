import axios from "axios"

class DuyetDonVanChuyenService {

    getDonVanChuyen(){
        return axios.get(`https://localhost:7088/api/DonVanChuyen/quan-ly/duyet-don`)
    }
    duyetDon(id,maQuanLy){
        return axios.post(`https://localhost:7088/api/DonVanChuyen/${id}?maQuanLy=${maQuanLy}`)
    }
    huyDon(id){
        return axios.post(`https://localhost:7088/api/DonVanChuyen/huy-don/${id}`)
    }

}
export default new DuyetDonVanChuyenService()