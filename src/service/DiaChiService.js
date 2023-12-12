import axios from "axios";

class DiaChiService {
    getTinhThanhPho(){
        return axios.get(`https://localhost:7088/api/TinhThanhPho`)
    }
    getQuan (id) {
        return axios.get(`https://localhost:7088/api/QuanHuyen?id=${id}`)
    }
    getXa (id) {
        return axios.get(`https://localhost:7088/api/XaPhuong?id=${id}`)
    }
}
export default new DiaChiService();