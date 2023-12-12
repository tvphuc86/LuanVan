import axios from "axios"

class DonVanChuyenSerVice{
    getTaiKhoan(id){
        return axios.get(`https://localhost:7088/api/tai-khoan?id=${id}`)
    }
    getNguoiGui(id){
        return axios.get(`https://localhost:7088/api/NguoiNhanCaNhan/${id}`)
    }
    getNguoiNhan3(page,limit,id){
        return axios.get(`https://localhost:7088/api/NguoiNhanCaNhan/NguoiNhanCap3?page=${page}&limit=${limit}&id=${id}`)
    }
    getHTVC(filter="",page,limit){
        return axios.get(`https://localhost:7088/api/HinhThucVanChuyen?filter=${filter}&page=${page}&limit=${limit}`)
    }
    getHTVCbyID(id){
        return axios.get(`https://localhost:7088/api/HinhThucVanChuyen/${id}`)
    }
    getCuocPhi(maQuanHuyen,trongLuong,maHinhThucVanChuyen){
        return axios.get(`https://localhost:7088/api/UocTinh/cuocPhi?maQuanHuyen=${maQuanHuyen}&trongLuong=${trongLuong}&maHinhThucVanChuyen=${maHinhThucVanChuyen}`)
    }
    create(data,stringVatPham){
        return axios.post(`https://localhost:7088/api/DonVanChuyen?VatPham=${stringVatPham}`,data)
    }
}
export default new DonVanChuyenSerVice()