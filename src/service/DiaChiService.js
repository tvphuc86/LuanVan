import axios from "axios";

class DiaChiService {
    getTinhThanhPho(){
        return axios.get(`https://webapi.somee.com/api/TinhThanhPho`)
    }
    getQuan (id) {
        return axios.get(`https://webapi.somee.com/api/QuanHuyen?id=${id}`)
    }
    getXa (id) {
        return axios.get(`https://webapi.somee.com/api/XaPhuong?id=${id}`)
    }
}
export default new DiaChiService();