import axios from 'axios';
class HTVCDataService {
    getAll(filter="",page,limit){
        return axios.get(`https://localhost:7088/api/HinhThucVanChuyen?filter=${filter}&page=${page}&limit=${limit}`)
    }
    count(){
        return axios.get(`https://localhost:7088/api/HinhThucVanChuyen`)
    }
    create(data){
        return axios.post(`https://localhost:7088/api/HinhThucVanChuyen`,data)
    }
    delete(id){
        return axios.delete(`https://localhost:7088/api/HinhThucVanChuyen/${id}`)
    }
    update(id,data){
        return axios.put(`https://localhost:7088/api/HinhThucVanChuyen/${id}`,data)
    }
    
}
export default new HTVCDataService();
