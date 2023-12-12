import axios from "axios";
class TrongLuongService {

    create(data){
        return axios.post(`https://localhost:7088/api/TrongLuong`,data)
    }
    getAll(filter="",page=1,limit=5){
        return axios.get(`https://localhost:7088/api/TrongLuong?filter=${filter}&page=${page}&limit=${limit}`)
      }
    update(id,data){
        return axios.put(`https://localhost:7088/api/TrongLuong/${id}`,data)

    }
    delete(id){
        return axios.delete(`https://localhost:7088/api/TrongLuong/${id}`)

    }

}
export default new TrongLuongService();