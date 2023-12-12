import axios from "axios";

class SoDiaChiService {

    create(data){
        return axios.post(`https://localhost:7088/api/SoDiaChi`,data)
    }
    get(page=1,limit=5,maTaiKhoan){
        return axios.get(`https://localhost:7088/api/SoDiaChi?page=${page}&limit=${limit}&MaTaiKhoan=${maTaiKhoan}`)
    }
    update(id,data){
        return axios.put(`https://localhost:7088/api/SoDiaChi/${id}`,data)
    }
    delete(id){
        return axios.delete(`https://localhost:7088/api/SoDiaChi/${id}`)
    }
}
export default new SoDiaChiService()