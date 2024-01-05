import axios from "axios";


class NguoiNhanCaNhanService {

    getAll(filter="",page=1,limit=5,id){
        return axios.get(`https://webapi.somee.com/api/NguoiNhanCaNhan?filter=${filter}&page=${page}&limit=${limit}&id=${id}`)
    }
    create(data)
    {
        return axios.post(`https://webapi.somee.com/api/NguoiNhanCaNhan`,data)
    }
    update(data)
    {
        return axios.put(`https://webapi.somee.com/api/NguoiNhanCaNhan`,data)
    }
    delete(id) {
        return axios.delete(`https://webapi.somee.com/api/NguoiNhanCaNhan/${id}`)
    }
    getAll3(filter="",page=1,limit=5,id){
        return axios.get(`https://webapi.somee.com/api/NguoiNhanCaNhan/NguoiNhanCap3?filter=${filter}&page=${page}&limit=${limit}&id=${id}`)
    }
    create3(data)
    {
        return axios.post(`https://webapi.somee.com/api/NguoiNhanCaNhan/NguoiNhanCap3`,data)
    }
    update3(data)
    {
        return axios.put(`https://webapi.somee.com/api/NguoiNhanCaNhan/NguoiNhanCap3`,data)
    }
    delete3(id) {
        return axios.delete(`https://webapi.somee.com/api/NguoiNhanCaNhan/NguoiNhanCap3?id=${id}`)
    }


}

export default new NguoiNhanCaNhanService()