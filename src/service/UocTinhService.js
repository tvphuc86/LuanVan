import axios from "axios";

class UocTinhService {
    getUocTinh(maQuanHuyen,trongLuong)
    {
        return axios.get(`https://localhost:7088/api/UocTinh?maQuanHuyen=${maQuanHuyen}&trongLuong=${trongLuong}`)
    }
}

export default new UocTinhService();