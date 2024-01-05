import axios from "axios";

class MatHangCaNhanService {
    get(filter,page,limit,id){
        return axios.get(`https://webapi.somee.com/api/MatHangCaNhan?filter=${filter}&page=${page}&limit=${limit}&id=${id}`)
    }
    getID(id){
        return axios.get(`https://webapi.somee.com/api/MatHangCaNhan/${id}`)
    }
    create(data){
        return axios.post(`https://webapi.somee.com/api/MatHangCaNhan`,data)
    }
    update(id,data){
        return axios.put(`https://webapi.somee.com/api/MatHangCaNhan/${id}`,data)
    }
    delete(id){
        return axios.delete(`https://webapi.somee.com/api/MatHangCaNhan/${id}`)
    }
    duyet(id,data){
        return axios.put(`https://webapi.somee.com/api/MatHangCaNhan/quanLy/${id}`,data)
    }
    getQl (){
        return axios.get(`https://webapi.somee.com/api/MatHangCaNhan/quanly`)
    }

}
export default new MatHangCaNhanService()