import axios from "axios";

class MatHangCaNhanService {
    get(filter,page,limit,id){
        return axios.get(`https://localhost:7088/api/MatHangCaNhan?filter=${filter}&page=${page}&limit=${limit}&id=${id}`)
    }
    getID(id){
        return axios.get(`https://localhost:7088/api/MatHangCaNhan/${id}`)
    }
    create(data){
        return axios.post(`https://localhost:7088/api/MatHangCaNhan`,data)
    }
    update(id,data){
        return axios.put(`https://localhost:7088/api/MatHangCaNhan/${id}`,data)
    }
    delete(id){
        return axios.delete(`https://localhost:7088/api/MatHangCaNhan/${id}`)
    }
    duyet(id,data){
        return axios.put(`https://localhost:7088/api/MatHangCaNhan/quanLy/${id}`,data)
    }
    getQl (){
        return axios.get(`https://localhost:7088/api/MatHangCaNhan/quanly`)
    }

}
export default new MatHangCaNhanService()