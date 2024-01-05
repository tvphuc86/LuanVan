import axios from "axios"

class DuyetDonVanChuyenService {

    getDonVanChuyen(){
        return axios.get(`https://webapi.somee.com/api/DonVanChuyen/quan-ly/duyet-don`)
    }
    duyetDon(id,maQuanLy){
        return axios.post(`https://webapi.somee.com/api/DonVanChuyen/${id}?maQuanLy=${maQuanLy}`)
    }
    huyDon(id){
        return axios.post(`https://webapi.somee.com/api/DonVanChuyen/huy-don/${id}`)
    }

}
export default new DuyetDonVanChuyenService()