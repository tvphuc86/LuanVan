import axios from "axios";

class AccountService {
    dangNhap(values){
        return axios.post(`https://webapi.somee.com/api/tai-khoan/dang-nhap`,values)
    }
    dangKy(values){
        return axios.post(`https://localhost/api/tai-khoan/dang-ky`,values)
    }
    xacMinhOtp(otp,email){
        return axios.post(`https://webapi.somee.com/api/tai-khoan/xacminhotp?otp=${otp}&email=${email}`)
    }
    getById(id){
        return axios.get(`https://webapi.somee.com/api/tai-khoan/${id}`)
    }
    update(id,data){
           return axios.put(`https://webapi.somee.com/api/tai-khoan/${id}`,data)
    }
    getTenByID(id){
        return axios.get(`https://webapi.somee.com/api/tai-khoan?id=${id}`)
    }
}
export default new AccountService();