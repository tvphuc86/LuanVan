import axios from "axios";

class UocTinhService {
    getUocTinh(maQuanHuyen,trongLuong)
    {
        return axios.get(`https://webapi.somee.com/api/UocTinh?maQuanHuyen=${maQuanHuyen}&trongLuong=${trongLuong}`)
    }
}

export default new UocTinhService();