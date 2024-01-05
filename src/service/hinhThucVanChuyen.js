import axios from 'axios';
class HTVCDataService {
    getAll(filter="",page,limit){
        return axios.get(`https://webapi.somee.com/api/HinhThucVanChuyen?filter=${filter}&page=${page}&limit=${limit}`)
    }
    count(){
        return axios.get(`https://webapi.somee.com/api/HinhThucVanChuyen`)
    }
    create(data){
        return axios.post(`https://webapi.somee.com/api/HinhThucVanChuyen`,data)
    }
    delete(id){
        return axios.delete(`https://webapi.somee.com/api/HinhThucVanChuyen/${id}`)
    }
    update(id,data){
        return axios.put(`https://webapi.somee.com/api/HinhThucVanChuyen/${id}`,data)
    }
    
}
export default new HTVCDataService();
