import axios from "axios"

class DonVanChuyenSerVice{
    getTaiKhoan(id){
        return axios.get(`https://webapi.somee.com/api/tai-khoan?id=${id}`)
    }
    getNguoiGui(id){
        return axios.get(`https://webapi.somee.com/api/NguoiNhanCaNhan/${id}`)
    }
    getNguoiNhan3(page,limit,id){
        return axios.get(`https://webapi.somee.com/api/NguoiNhanCaNhan/NguoiNhanCap3?page=${page}&limit=${limit}&id=${id}`)
    }
    getHTVC(filter="",page,limit){
        return axios.get(`https://webapi.somee.com/api/HinhThucVanChuyen?filter=${filter}&page=${page}&limit=${limit}`)
    }
    getHTVCbyID(id){
        return axios.get(`https://webapi.somee.com/api/HinhThucVanChuyen/${id}`)
    }
    getCuocPhi(maQuanHuyen,trongLuong,maHinhThucVanChuyen){
        return axios.get(`https://webapi.somee.com/api/UocTinh/cuocPhi?maQuanHuyen=${maQuanHuyen}&trongLuong=${trongLuong}&maHinhThucVanChuyen=${maHinhThucVanChuyen}`)
    }
    create(data,stringVatPham){
        return axios.post(`https://webapi.somee.com/api/DonVanChuyen?VatPham=${stringVatPham}`,data)
    }
}
export default new DonVanChuyenSerVice()