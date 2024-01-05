import axios from "axios";
class TrongLuongService {

    create(data){
        return axios.post(`https://webapi.somee.com/api/TrongLuong`,data)
    }
    getAll(filter="",page=1,limit=5){
        return axios.get(`https://webapi.somee.com/api/TrongLuong?filter=${filter}&page=${page}&limit=${limit}`)
      }
    update(id,data){
        return axios.put(`https://webapi.somee.com/api/TrongLuong/${id}`,data)

    }
    delete(id){
        return axios.delete(`https://webapi.somee.com/api/TrongLuong/${id}`)

    }

}
export default new TrongLuongService();