import axios from "axios"

 class DuLieuTinhCuocService{
    create(data){
        return axios.post("https://localhost:7088/api/DuLieuTinhCuoc",data)
    }
    get(filter="",maHinhThucVanChuyen=0,maTinhThanhPho=0,page=1,limit=5){
        return axios.get(`https://localhost:7088/api/DuLieuTinhCuoc?filter=${filter}&maHinhThucVanChuyen=${maHinhThucVanChuyen}&maTinhThanhPho=${maTinhThanhPho}&page=${page}&limit=${limit}`)
    }
    update(id,data){
        return axios.put(`https://localhost:7088/api/DuLieuTinhCuoc/${id}`,data)
    }
    delete(id){
        return axios.delete(`https://localhost:7088/api/DuLieuTinhCuoc/${id}`)
    }
    postLoaiMatHang(loaiMatHang) {
        return axios.post(`https://localhost:7088/api/LoaiMatHang`,loaiMatHang)
    }
    putLoaiMatHang(id,loaiMatHang) {
        return axios.put(`https://localhost:7088/api/LoaiMatHang/${id}`,loaiMatHang)
    }
    getLoaiMathang(){
        return axios.get(`https://localhost:7088/api/LoaiMatHang`)
    }
    getMatHangTheoLoai(id,tk){
        return axios.get(`https://localhost:7088/api/MatHangCaNhan/getMatHang/${id}?tk=${tk}`)
    }
    getLoaiMathangId(id){
        return axios.get(`https://localhost:7088/api/LoaiMatHang/${id}`)
    }
      postBaoHiemDonVanChuyen(data) {
        return axios.post(`https://localhost:7088/api/BaoHiemDonVanChuyen`,data)
    }
    putBaoHiemDonVanChuyen(loaiMatHang) {
        return axios.put(`https://localhost:7088/api/BaoHiemDonVanChuyen`,loaiMatHang)
    }
    getBaoHiemDonVanChuyen(){
        return axios.get(`https://localhost:7088/api/BaoHiemDonVanChuyen`)
    }
    getBaoHiemDonVanChuyenID(tong){
        return axios.get(`https://localhost:7088/api/BaoHiemDonVanChuyen/baohiem?tong=${tong}`)
    }
    getBaoHiemDonVanChuyenMax(){
        return axios.get(`https://localhost:7088/api/BaoHiemDonVanChuyen/getMax`)
    }
 }
 export default new DuLieuTinhCuocService()