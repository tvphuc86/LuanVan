import axios from "axios";

class SoDiaChiService {

    create(data){
        return axios.post(`https://webapi.somee.com/api/SoDiaChi`,data)
    }
    get(page=1,limit=5,maTaiKhoan){
        return axios.get(`https://webapi.somee.com/api/SoDiaChi?page=${page}&limit=${limit}&MaTaiKhoan=${maTaiKhoan}`)
    }
    update(id,data){
        return axios.put(`https://webapi.somee.com/api/SoDiaChi/${id}`,data)
    }
    delete(id){
        return axios.delete(`https://webapi.somee.com/api/SoDiaChi/${id}`)
    }
}
export default new SoDiaChiService()