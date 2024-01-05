import axios from "axios"

class CuocPhiService {
  getSelectHtvc() {
    return axios.get(`https://webapi.somee.com/api/HinhThucVanChuyen?page=1&limit=10000`)
  }
  create(formData,maQuanHuyen){
    return axios.post(`https://webapi.somee.com/api/CuocPhi?maQuanHuyen=${maQuanHuyen}`,formData)
  }
  getQuuanHuyen(id,maTrongLuong,maHinhThucVanChuyen)
    {
        return axios.get(`https://webapi.somee.com/api/QuanHuyen/tinh?idTinh=${id}&maTrongLuong=${maTrongLuong}&maHinhThucVanChuyen=${maHinhThucVanChuyen}`)
    }
    getHTVC (id) {
        return axios.get(`https://webapi.somee.com/api/HinhThucVanChuyen/${id}`)
    }
    getAll(filter="",page=1,limit=5){
      return axios.get(`https://webapi.somee.com/api/CuocPhi?filter=${filter}&page=${page}&limit=${limit}`)
    }
    update(id,formData){
      return axios.put(`https://webapi.somee.com/api/CuocPhi/${id}`,formData)
    }
    delete(id,maQuanHuyen){
      return axios.delete(`https://webapi.somee.com/api/CuocPhi?id=${id}&quanHuyen=${maQuanHuyen}`)
    }
    getTrongLuong (){
     
        return axios.get(`https://webapi.somee.com/api/TrongLuong?&page=1&limit=1000000`)
      
    }
}

export default new CuocPhiService()
