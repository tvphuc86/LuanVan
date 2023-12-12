import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import DiaChiServer from '../service/DiaChiService';
import CuocPhiService from '../service/CuocPhiService';
import UocTinhService from '../service/UocTinhService';
import { toast, ToastContainer } from 'react-toastify';
import './UocTinh.css';
import { values } from 'lodash';
import DuLieuTinhCuocService from '../service/DuLieuTinhCuocService';

const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 3 };

const initFormUocTinh = {
  maTinhThanhPho: 0,
  maQuanHuyen: 0,
  trongLuong: 0,
  tienThuHo: 0,
  maLoaiMatHang: 0,
};

export default function UocTinh() {
  // state tinhs
  const [tinhs, setTinhs] = useState([]);
  // state maQuanHuyen
  const [quanHuyens, setQuanHuyens] = useState([]);
  // state form
  const [dataForm, setDataForm] = useState(initFormUocTinh);
  //state hình thức vận chuyển
  const [htvcs, setHtvcs] = useState([]);
  //staete error
  const [errors, setErorrs] = useState({});
  //state result
  const [result, setResult] = useState([]);
  const [diachi, setDiaChi] = useState('');
  const [phiBaoHiemDonVanChuyen,setPhiBaoHiemDonVanChuyen] = useState(0)
  const [phiPhuThuDonvVanChuyen,setPhiPhuThuDonVanChuyen] = useState(0)
const [LoaiHangHoa,setLoaiHangHoa] = useState([])
const [maxTienThuHo,setMaxTienThuHo] = useState(0)

  //load select tinh/quanHuens/HinhThucVanChuyen
  useEffect(() => {
    DiaChiServer.getTinhThanhPho().then((rs, index) => {
      setTinhs(rs.data);
      setQuanHuyens(rs.data[dataForm.maTinhThanhPho - 1].quanHuyens);
    });
  }, [dataForm.maTinhThanhPho]);

  useEffect(()=>{
    DuLieuTinhCuocService.getLoaiMathang()
    .then(rs => setLoaiHangHoa(rs.data))
    DuLieuTinhCuocService.getBaoHiemDonVanChuyenMax().then(rs=>{setMaxTienThuHo(rs.data.giaTriKetThuc)
    console.log(rs.data.giaTriKetThuc);})
  },[])
  useEffect(()=>{
   
    DuLieuTinhCuocService.getBaoHiemDonVanChuyenID(dataForm.tienThuHo)
    .then(rs => setPhiBaoHiemDonVanChuyen(rs.data.phiBaoHiem))
  },[dataForm.tienThuHo])
  useEffect(()=>{
    if(dataForm.maLoaiMatHang == 0) {setPhiPhuThuDonVanChuyen(0)
      setErorrs(
        {
          ...errors,
          maLoaiMatHang: "Vui lòng chọn loại mặt hàng"
        }
      )
      toast.error(errors.maLoaiMatHang)

    }
    else
    DuLieuTinhCuocService.getLoaiMathangId(dataForm.maLoaiMatHang)
    .then(rs => {setPhiPhuThuDonVanChuyen(rs.data.phuPhiMatHang)
      console.log(rs.data.phuPhiMatHang);
  })
  },[dataForm.maLoaiMatHang])
  

  
  // xử lý sự kiện change form
  const handleChangeField = (e) => {
    let { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: [value],
    });
  };
  //xử lý onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      UocTinhService.getUocTinh(dataForm.maQuanHuyen, dataForm.trongLuong).then(
        (rs) => {
          if (rs.data.length == 0) {
            toast.error('Cước phí cho dữ liệu vào chưa được cập nhật');
            setDiaChi('');
            setResult([]);
          } else {
            setResult(rs.data);
            console.log(rs.data)
            setDiaChi(
              rs.data[0].quanHuyen.tenQuanHuyen +
                ' - ' +
                rs.data[0].quanHuyen.tinhThanhPho.tenTinhThanhPho
            );
          }
        }
      );
    } else {
      toast.error('Vui lòng nhập thông vào các trường có màu đỏ');
    }
  };
  // tính trọng lượng

  // validate
  const validate = () => {
    let temp = {};
    temp.maTinhThanhPho = dataForm.maTinhThanhPho == 0 ? false : true;
    temp.maQuanHuyen = dataForm.maQuanHuyen == 0 ? false : true;
    temp.trongLuong = dataForm.trongLuong == 0 ? false : true;
    temp.tienThuHo = dataForm.tienThuHo == 0 ? false : true;
    temp.maLoaiMatHang = dataForm.maLoaiMatHang == 0 ? false : true;
    setErorrs(temp);
    return Object.values(temp).every((x) => x == true);
  };
  // áp dụng lớp lcho trường k được validate
  const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="uoctinh">
        <div className="formuoctinh">
          <h1>Ước tính cước phí</h1>
          <form autoComplete="off" onSubmit={handleOnSubmit}>
            <fieldset>
              <legend>Nơi nhận</legend>
              <fieldset className="select">
                <label>Tỉnh</label>
                <select
                  name="maTinhThanhPho"
                  value={dataForm.maTinhThanhPho}
                  onChange={handleChangeField}
                  className={applyErrorClass('maTinhThanhPho')}>
                  <option value={0}>Chọn tỉnh thành phố</option>
                  {tinhs.map((items, index) => {
                    return (
                      <option key={index} value={items.maTinhThanhPho}>
                        {items.tenTinhThanhPho}
                      </option>
                    );
                  })}
                </select>
                <label>Quận</label>
                <select
                  name="maQuanHuyen"
                  value={dataForm.maQuanHuyen}
                  onChange={handleChangeField}
                  className={applyErrorClass('maQuanHuyen')}>
                  <option value={0}>Chọn quận huyện</option>
                  {quanHuyens.map((items, index) => {
                    return (
                      <option key={index} value={items.maQuanHuyen}>
                        {items.tenQuanHuyen}
                      </option>
                    );
                  })}
                </select>
              </fieldset>
            </fieldset>
            <fieldset>
              <select name='maLoaiMatHang'
              value={dataForm.maLoaiMatHang}
                  onChange={handleChangeField}
                  className={applyErrorClass('maLoaiMatHang')}
              >
                <option value={0} >Chọn loại mặt hàng</option>
                {
                  LoaiHangHoa.map(e=>{
                    return(
                      <option value={e.maLoaiMatHang}>{e.tenLoaiMatHang}</option>
                    )
                  })
                }
              </select>
            </fieldset>
            <fieldset style={{'border':'none'}}>
              <fieldset>
              <label>Tiền thu hộ</label>
              <input  className={applyErrorClass('tienThuHo')}
              type='number'
              min={0}
              max={maxTienThuHo}
               name='tienThuHo' value={dataForm.tienThuHo} onChange={handleChangeField} placeholder='Nhập số tiền thu hộ ước tính'/>
            </fieldset>
            </fieldset>
            <fieldset>
              <fieldset>
                <label>Trọng lượng</label>
                <input
                  type={'number'}
                  name="trongLuong"
                  min={0}
                  max = {20000}
                  value={dataForm.trongLuong}
                  className={applyErrorClass('trongLuong')}
                  onChange={handleChangeField}></input>
              </fieldset>
            </fieldset>
            <button type="submit">Ước tính</button>
          </form>
        </div>
        <div className="listuoctinh">
          <h1>Kết quả ước tính</h1>
          <h4>
            Gửi đến:{diachi} - Trọng lượng: {new Intl.NumberFormat('vi-VN',{style:'unit',unit:'gram'}).format(dataForm.trongLuong) }
          </h4>
          <table>
            <thead>
              <tr>
                <th>Hình thức vận chuyển</th>
                <th>Phí bảo hiểm</th>
                <th>Phụ phí đơn</th>
               
                <th>Giá cước</th>
                <th>Tổng cước</th>
                <th>Thời gian giao</th>
              </tr>
            </thead>
            <tbody>
              {result.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{items.cuocPhi.hinhThucVanChuyen.ten}</td>
                    <td>
                      
                      {new Intl.NumberFormat('vi-VN', config).format(
                        dataForm.tienThuHo * (phiBaoHiemDonVanChuyen/100)
                      )}
                    </td>
                    <td>
                      
                      {new Intl.NumberFormat('vi-VN', config).format(
                        (phiPhuThuDonvVanChuyen/100) * (items.cuocPhi.giaCuoc + (dataForm.tienThuHo * (phiBaoHiemDonVanChuyen/100)))
                      )}
                    </td>
                    <td>
                      
                      {new Intl.NumberFormat('vi-VN', config).format(
                        items.cuocPhi.giaCuoc
                      )}
                    </td>
                    <td>
                      
                      {new Intl.NumberFormat('vi-VN', config).format(
                        items.cuocPhi.giaCuoc +  (phiPhuThuDonvVanChuyen/100) * items.cuocPhi.giaCuoc +   dataForm.tienThuHo * (phiBaoHiemDonVanChuyen/100)
                      )}
                    </td>
                    <td>{items.cuocPhi.thoiGianGiao}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button>
            <a href="/khach-hang/tao-don-van-chuyen">Tạo đơn</a>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
