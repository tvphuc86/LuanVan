import { lte, set } from 'lodash';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import NavControl from '../../component/NavControl';
import SearchBar from '../../component/SearchBar';
import DiaChiService from '../../service/DiaChiService';
import DonVanChuyenService from '../../service/DonVanChuyenService';
import DuLieuTinhCuocService from '../../service/DuLieuTinhCuocService';
import MatHangCaNhanService from '../../service/MatHangCaNhanService';
import SoDiaChiService from '../../service/SoDiaChiService';
import UocTinhService from '../../service/UocTinhService';
import DuLieuTinhCuoc from '../quanLy/DuLieuTinhCuoc';
import navlinkKhachHang from './linkKhachHang';
import './TaoDonVanChuyen.css';
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const innitValues = {
  maDonVanChuyen: 0,
  maVanDon: "",
  maHinhThucVanChuyen: 0,
  maXaPhuong: 0,
  tenNguoiNhan: '',
  diaChiNguoiNhan: '',
  soDienThoaiNguoiNhan: '',
  tenNguoiGui: '',
  diaChiNguoiGui: '',
  phiPhuThu: 0,
  soDienThoaiNguoiGui: '',
  maKhachHang: localStorage.getItem('maTaiKhoan'),
  tongTrongLuong: 0,
  tongTienThuHo: 0,
  cuocPhi: 0,
  nguoiTraCuoc: false,
  thoiGianGiao: '',
  yeuCauLayHang: false,
  ngayTao: Date.now(),
  ghiChu: '',
  chieuDai: 0,
  chieuRong: 0,
  chieuCao: 0,
  giaTri: 0,
  soLuong: 0,
  maBaoHiemDonVanChuyen: 0,
  trongLuong: 0,
  tenVatPham: '',
  maXaPhuongGui: 0,
  maLoaiVatPham:0,
  maQuanHuyenGui: 0,
  maTinhThanhPhoGui: 0,
};
function TaoDonVanChuyen() {
  const [values, setValues] = useState(innitValues);
  const [tinh, setTinh] = useState([]);
  const [tinhGui, setTinhGui] = useState([]);
  const [errors, setErorrs] = useState({});
  const [quan, setQuan] = useState([]);
  const [xa, setXa] = useState([]);
  const [quanGui, setQuanGui] = useState([]);
  const [xaGui, setXaGui] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [chonNguoiGui, setChonNguoiGui] = useState(-2);
  const [soDiaChi, setSoDiaChi] = useState([]);
  const [nguoiGui, setNguoiGui] = useState([]);
  const [chonNguoiNhan, setChonNguoiNhan] = useState(-1);
  const [nguoiNhan, setNguoiNhan] = useState([]);
  const [matHang, setMatHang] = useState([]);
  const [chonMatHang, setChonMatHang] = useState(-1);
  const [chonMatHang1, setChonMatHang1] = useState(-1);
  const [matHang1, setMatHang1] = useState([]);
  const [stringMatHang1, setStringMatHang1] = useState('');
  const [mucChia, setMucChia] = useState(0);
  const [htvc, setHtvc] = useState([]);
  const [loaiVatPham,setLoaiVatPham] = useState([])
  const [stringMatHang,setStringMatHang] = useState("")
  const [matHangThu2,setMatHangThu2] = useState([])
  const [kichThuocToiDa,setKichThuocToiDa] = useState(0)
  const [phiBaoHiemDonVanChuyen,setPhiBaoHiemDonVanChuyen] = useState(0)
  const [maxTienThuHo,setMaxTienThuHo] = useState(0)
  const renderCrudDiv = () => {
    const temp = [...childrens];
    temp.push(1); // to increase counter
    setChildrens(temp);
    const matHang = [...matHang1];
    matHang.push({
      trongLuong: 0,
      giaTri: 0,
      chieuCao: 0,
      chieuRong: 0,
      chieuDai: 0,
      soLuong: 0,
      tenVatPham: '',
    });
    setMatHang1(matHang);
  };
  useEffect(()=>{
    DuLieuTinhCuocService.getMatHangTheoLoai(values.maLoaiVatPham,values.maKhachHang)
    .then(rs => setMatHangThu2(rs.data))
    DuLieuTinhCuocService.getLoaiMathangId(values.maLoaiVatPham)
    .then(rs => {setValues({
      ...values,
      phiPhuThu: rs.data.phuPhiMatHang
    })
    setKichThuocToiDa(rs.data.kichThuocToiDa)})
  },[values.maLoaiVatPham])
  useEffect(()=>{
    DuLieuTinhCuocService.getLoaiMathang()
    .then(rs=>setLoaiVatPham(rs.data))
    DuLieuTinhCuocService.getBaoHiemDonVanChuyenMax().then(rs=>{setMaxTienThuHo(rs.data.giaTriKetThuc)
    console.log(rs.data);})
  },[])
  const renderCrudDiv1 = () => {
    const temp = [...childrens];
    temp.pop(1); // to increase counter
    setChildrens(temp);
    const matHang = [...matHang1];
    matHang.pop();
    setMatHang1(matHang);
    const mathang12 = stringMatHang1;
    mathang12.split('-').pop();
    setStringMatHang1(mathang12.toString());
  };
  useEffect(() => {
    DonVanChuyenService.getTaiKhoan(values.maKhachHang).then((rs) => {
      setValues({
        ...values,
        tenNguoiGui: rs.data[0].hoTen,
        soDienThoaiNguoiGui: rs.data[0].sdt,
        soDienThoaiNguoiNhan: '',
        tenNguoiNhan: '',
        diaChiNguoiNhan: '',
      });
    });
    DonVanChuyenService.getNguoiGui(values.maKhachHang).then((rs) =>
      setNguoiGui(rs.data)
    );
    DonVanChuyenService.getNguoiGui(values.maKhachHang).then((rs) =>
      setNguoiNhan(rs.data)
    );
    MatHangCaNhanService.getID(values.maKhachHang).then((rs) =>{
    
      setMatHang(rs.data)}
    );
    DonVanChuyenService.getHTVC('', 1, 19999999).then((rs) => {
      setHtvc(rs.data.result);     
    });
    console.log(new Date(Date.now()));
  }, []);
  useEffect(() => {
    if (chonNguoiGui == -2) {
      SoDiaChiService.get(1, 1000000000, values.maKhachHang).then((rs) => {
        setSoDiaChi(rs.data.data);
      });
      DonVanChuyenService.getTaiKhoan(values.maKhachHang).then((rs) => {
        setValues({
          ...values,
          tenNguoiGui: rs.data[0].hoTen,
          soDienThoaiNguoiGui: rs.data[0].sdt,
        });
      });
      DonVanChuyenService.getNguoiGui(values.maKhachHang).then((rs) =>
        setNguoiNhan(rs.data)
      );
    } else if (chonNguoiGui == -1) {
      setValues({
        ...values,
        diaChiNguoiGui: '',
        tenNguoiGui: '',
        soDienThoaiNguoiGui: '',
      });
      DonVanChuyenService.getNguoiGui(values.maKhachHang).then((rs) =>
        setNguoiNhan(rs.data)
      );
    } else {
      setValues({
        ...values,
        diaChiNguoiGui:
          nguoiGui[chonNguoiGui].diaChiNguoiNhanCaNhan +
          '-' +
          nguoiGui[chonNguoiGui].xaPhuong.tenXaPhuong +
          '-' +
          nguoiGui[chonNguoiGui].xaPhuong.quanHuyen.tenQuanHuyen +
          '-' +
          nguoiGui[chonNguoiGui].xaPhuong.quanHuyen.tinhThanhPho
            .tenTinhThanhPho,
        tenNguoiGui: nguoiGui[chonNguoiGui].tenNguoiNhanCaNhan,
        soDienThoaiNguoiGui: nguoiGui[chonNguoiGui].soDienThoaiCaNhan,
      });
      DonVanChuyenService.getNguoiNhan3(
        1,
        10000,
        nguoiGui[chonNguoiGui].maNguoiNhanCaNhan
      ).then((rs) => setNguoiNhan(rs.data.data));
    }
  }, [chonNguoiGui]);

  const handleChangNguoiGui = (e) => {
    setChonNguoiGui(e.target.value);
  };
  useEffect(()=>{
      DuLieuTinhCuocService.getBaoHiemDonVanChuyenID(values.tongTienThuHo)
      .then( rs => {setPhiBaoHiemDonVanChuyen(rs.data.phiBaoHiem)
      setValues({
        ...values,
        maBaoHiemDonVanChuyen: rs.data.maBaoHiemDonVanChuyen
      })
      })
  },[values.tongTienThuHo])
  const handleChangFile = (e) => {
    let { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {
    if (chonNguoiNhan != -1) {
      if (chonNguoiGui == -1 || chonNguoiGui == -2) {
        setValues({
          ...values,
          diaChiNguoiNhan:
            nguoiNhan[chonNguoiNhan].diaChiNguoiNhanCaNhan +
            '-' +
            nguoiNhan[chonNguoiNhan].xaPhuong.tenXaPhuong +
            '-' +
            nguoiNhan[chonNguoiNhan].xaPhuong.quanHuyen.tenQuanHuyen +
            '-' +
            nguoiNhan[chonNguoiNhan].xaPhuong.quanHuyen.tinhThanhPho
              .tenTinhThanhPho,
          soDienThoaiNguoiNhan: nguoiNhan[chonNguoiNhan].soDienThoaiCaNhan,
          tenNguoiNhan: nguoiNhan[chonNguoiNhan].tenNguoiNhanCaNhan,
          maXaPhuong: nguoiNhan[chonNguoiNhan].maXaPhuong,
          maQuanHuyen: nguoiNhan[chonNguoiNhan].xaPhuong.quanHuyen.maQuanHuyen
        });
      } else {
        setValues({
          ...values,
          diaChiNguoiNhan:
            nguoiNhan[chonNguoiNhan].diaChiNguoiNhanCap3 +
            '-' +
            nguoiNhan[chonNguoiNhan].xaPhuong.tenXaPhuong +
            '-' +
            nguoiNhan[chonNguoiNhan].xaPhuong.quanHuyen.tenQuanHuyen +
            '-' +
            nguoiNhan[chonNguoiNhan].xaPhuong.quanHuyen.tinhThanhPho
              .tenTinhThanhPho,
          soDienThoaiNguoiNhan:
            nguoiNhan[chonNguoiNhan].soDienThoaiNguoiNhanCap3,
          tenNguoiNhan: nguoiNhan[chonNguoiNhan].tenNguoiNhanCap3,
          maXaPhuong: nguoiNhan[chonNguoiNhan].maXaPhuong,
          maQuanHuyen:  nguoiNhan[chonNguoiNhan].xaPhuong.quanHuyen.maQuanHuyen
        });
      }
    } else {
      setValues({
        ...values,
        diaChiNguoiNhan: '',
        soDienThoaiNguoiNhan: '',
        tenNguoiNhan: '',
      });
    }
  }, [chonNguoiNhan]);
  useEffect(() => {
    DiaChiService.getTinhThanhPho().then((rs) => {
      setTinh(rs.data);
      setTinhGui(rs.data)
    });

  }, []);
  useEffect(() => {
    DiaChiService.getQuan(values.maTinhThanhPho).then((rs) => {
      setQuan(rs.data);
    });
  }, [values.maTinhThanhPho]);

  useEffect(() => {
    DiaChiService.getXa(values.maQuanHuyen).then((rs) => {
      setXa(rs.data);
    });
  }, [values.maQuanHuyen]);
  useEffect(() => {
    DiaChiService.getQuan(values.maTinhThanhPhoGui).then((rs) => {
      setQuanGui(rs.data);
    });
  }, [values.maTinhThanhPhoGui]);

  useEffect(() => {
    DiaChiService.getXa(values.maQuanHuyenGui).then((rs) => {
      setXaGui(rs.data);
    });
  }, [values.maQuanHuyenGui]);

  const tinhTrongLuong = (chieuCao, chieuRong, chieuDai) => {
    let temp = (((chieuDai + chieuRong) * chieuCao) / mucChia) * 1000;

    return temp;
  };

  useEffect(() => {
    let stringVatPham =
      values.tenVatPham +
      ',' +
      values.maLoaiVatPham +
      ',' +
      values.chieuCao +
      ',' +
      values.chieuDai +
      ',' +
      values.chieuRong +
      ',' +
      values.trongLuong +
      ',' +
      values.giaTri +
      ',' +
      values.soLuong;

    setStringMatHang(stringVatPham)
    
  }, [
    values.chieuCao,
    values.chieuRong,
    values.chieuDai,
    values.soLuong,
    values.giaTri,
    values.tenVatPham,
    values.trongLuong,
    chonMatHang
    
  ]);
  const handleChangeVatPham = (e) => {
    let { name, value } = e.target;

    if (name == 'chieuCao') {
      setValues({
        ...values,
        trongLuong: tinhTrongLuong(value, values.chieuRong, values.chieuDai),
        [name]: value,
      });
    } else if (name == 'chieuRong') {
      setValues({
        ...values,
        trongLuong: tinhTrongLuong(values.chieuCao, value, values.chieuDai),
        [name]: value,
      });
    } else if (name == 'chieuDai') {
      setValues({
        ...values,
        trongLuong: tinhTrongLuong(values.chieuCao, values.chieuRong, value),
        [name]: value,
      });
    } else {
      if(value.trongLuong==0){
      setValues({
        ...values,
        trongLuong: tinhTrongLuong(
          values.chieuCao,
          values.chieuRong,
          values.chieuDai
        ),
        [name]: value,
      });}
      else{
        setValues({
          ...values,
          [name]: value,
        });
      }
    }
  };
  useEffect(() => {
    if (values.maHinhThucVanChuyen != 0)
      DonVanChuyenService.getHTVCbyID(values.maHinhThucVanChuyen).then((rs) =>
        setMucChia(rs.data.mucChia)
      );
    else setMucChia(0);
  }, [values.maHinhThucVanChuyen]);
  useEffect(() => {
    if (chonMatHang != -1) {
      if (matHang[chonMatHang].trongLuong == 0) {
        setValues({
          ...values,
          tenVatPham: matHang[chonMatHang].tenMatHangCaNhan,
          trongLuong: tinhTrongLuong(
            matHang[chonMatHang].chieuCao,
            matHang[chonMatHang].chieuRong,
            matHang[chonMatHang].chieuDai
          ),
          maLoaiVatPham:matHang[chonMatHang].maLoaiMatHang,
          chieuCao: matHang[chonMatHang].chieuCao,
          chieuRong: matHang[chonMatHang].chieuRong,
          chieuDai: matHang[chonMatHang].chieuDai,
          giaTri: matHang[chonMatHang].giaTri,
          soLuong: 0,

        });
      } else {
        setValues({
          ...values,
          tenVatPham: matHang[chonMatHang].tenMatHangCaNhan,
          maLoaiVatPham:matHang[chonMatHang].maLoaiMatHang,
          trongLuong: matHang[chonMatHang].trongLuong,
          chieuCao: matHang[chonMatHang].chieuCao,
          chieuRong: matHang[chonMatHang].chieuRong,
          chieuDai: matHang[chonMatHang].chieuDai,
          giaTri: matHang[chonMatHang].giaTri,
          soLuong: 0,
        });
      }
    } else {
      setValues({
        ...values,
        tenVatPham: '',
        maLoaiVatPham:0,
        trongLuong: 0,
        chieuCao: 0,
        chieuRong: 0,
        chieuDai: 0,
        giaTri: 0,
        soLuong: 0,
      });
    }
  }, [chonMatHang]);
  const handleChangFileMatHang1 = (e) => {
    setChonMatHang1(e.target.value);
    const vatpham = [...matHang1];
    if (e.target.value != -1) {
      if (matHang[e.target.value].trongLuong == 0) {
        vatpham[e.target.name] = {
          tenVatPham: matHang[e.target.value].tenMatHangCaNhan,
          trongLuong: tinhTrongLuong(
            matHang[e.target.value].chieuCao,
            matHang[e.target.value].chieuRong,
            matHang[e.target.value].chieuDai
          ),
          chieuCao: matHang[e.target.value].chieuCao,
          chieuRong: matHang[e.target.value].chieuRong,
          chieuDai: matHang[e.target.value].chieuDai,
          giaTri: matHang[e.target.value].giaTri,
          soLuong: 0,
        };
      } else {
        vatpham[e.target.name] = {
          tenVatPham: matHang[e.target.value].tenMatHangCaNhan,
          trongLuong: matHang[e.target.value].trongLuong,
          chieuCao: matHang[e.target.value].chieuCao,
          chieuRong: matHang[e.target.value].chieuRong,
          chieuDai: matHang[e.target.value].chieuDai,
          giaTri: matHang[e.target.value].giaTri,
          soLuong: 0,
        };
      }
    } else {
      vatpham[e.target.name] = {
        tenVatPham: '',
        trongLuong: 0,
        chieuCao: 0,
        chieuRong: 0,
        chieuDai: 0,
        giaTri: 0,
        soLuong: 0,
      };
    }
    setMatHang1(vatpham);
  };
  useEffect(() => {
    let mathang = '';
    let stringVatPham = '';
    childrens.forEach((e, i) => {
      if (chonMatHang1)
        stringVatPham +=
          '/' +
          matHang1[i].tenVatPham +
          ',' +
          values.maLoaiVatPham +
          ',' +
          matHang1[i].chieuCao +
          ',' +
          matHang1[i].chieuDai +
          ',' +
          matHang1[i].chieuRong +
          ',' +
          matHang1[i].trongLuong +
          ',' +
          matHang1[i].giaTri +
          ',' +
          matHang1[i].soLuong;
    });
    setStringMatHang1(stringVatPham);
  }, [matHang1]);
  const handleChangeVatPham1 = (e) => {
    const vatpham = [...matHang1];
    if (e.target.name == 'chieuCao') {
      vatpham[e.target.alt] = {
        ...vatpham[e.target.alt],
        trongLuong: tinhTrongLuong(
          e.target.value,
          vatpham[e.target.alt].chieuRong,
          vatpham[e.target.alt].chieuDai
        ),
        [e.target.name]: e.target.value,
      };
    } else if (e.target.name == 'chieuRong') {
      vatpham[e.target.alt] = {
        ...vatpham[e.target.alt],
        trongLuong: tinhTrongLuong(
          vatpham[e.target.alt].chieuCao,
          e.target.value,
          vatpham[e.target.alt].chieuDai
        ),
        [e.target.name]: e.target.value,
      };
    } else if (e.target.name == 'chieuDai') {
      vatpham[e.target.alt] = {
        ...vatpham[e.target.alt],
        trongLuong: tinhTrongLuong(
          vatpham[e.target.alt].chieuCao,
          vatpham[e.target.alt].chieuRong,
          e.target.value
        ),
        [e.target.name]: e.target.value,
      };
    } else {
      vatpham[e.target.alt] = {
        ...vatpham[e.target.alt],
        [e.target.name]: e.target.value,
      };
    }

    setMatHang1(vatpham);
  };

  //TInh cuoc
  useEffect(()=>{
   DonVanChuyenService.getCuocPhi(values.maQuanHuyen,values.tongTrongLuong,values.maHinhThucVanChuyen)
    .then(rs => {
     if(!rs.data)
     {
      toast.error("Không có dữ liệu")
     }
     else{
      setValues({
        ...values,
        cuocPhi: rs.data.cuocPhi,
        thoiGianGiao: rs.data.thoiGianGiao
      })
     }
    })
    
  },[values.tongTrongLuong,values.maQuanHuyen,values.maHinhThucVanChuyen])



  useEffect(()=>{
    let tongTrongLuongA = 0
    let tongTienThuHo = 0
    childrens.forEach((e,i)=>{
       tongTrongLuongA += matHang1[i].trongLuong * matHang1[i].soLuong
       tongTienThuHo += matHang1[i].giaTri * matHang1[i].soLuong
    })
    if(values.nguoiTraCuoc == true){
      setValues({
        ...values,
        tongTrongLuong: (values.soLuong*values.trongLuong )+ tongTrongLuongA,
        tongTienThuHo: (values.soLuong*values.giaTri )+ tongTienThuHo + Number(values.cuocPhi)
      })
    }
    else
    setValues({
      ...values,
      tongTrongLuong: (values.soLuong*values.trongLuong )+ tongTrongLuongA,
      tongTienThuHo: (values.soLuong*values.giaTri )+ tongTienThuHo
    })
  },[matHang1,values.trongLuong,values.soLuong,values.giaTri,values.cuocPhi,values.nguoiTraCuoc])

    const validate = () =>{
        let temp = {}
        temp.tenNguoiGui = values.tenNguoiGui=='' ? false : true
        if(chonNguoiGui==-1 || chonNguoiGui==-2)
        temp.diaChiNguoiGui = values.diaChiNguoiGui=='' ? false: true
        else 
        temp.diaChiNguoiGui =true
        if(chonNguoiGui==-1) temp.maXaPhuongGui= values.maXaPhuongGui == 0 ? false : true
        else temp.maXaPhuongGui=true
        temp.soDienThoaiNguoiGui = values.soDienThoaiNguoiGui == "" || !values.soDienThoaiNguoiGui.match(regexPhoneNumber) ? false:true
        temp.tenNguoiNhan = values.tenNguoiNhan=='' ? false : true
        temp.diaChiNguoiNhan = values.diaChiNguoiNhan=='' ? false: true
        if(chonNguoiNhan==-1) temp.maXaPhuong= values.maXaPhuong == 0 ? false : true 
        else temp.maXaPhuong = true
        temp.soDienThoaiNguoiNhan = values.soDienThoaiNguoiNhan == "" || !values.soDienThoaiNguoiNhan.match(regexPhoneNumber) ? false:true
        temp.maHinhThucVanChuyen = values.maHinhThucVanChuyen ==0 ? false: true
       
        setErorrs(temp)
        return Object.values(temp).every(x=>x==true)
    }

    const handleOnSubmit = e =>{
      e.preventDefault()
      
      if(validate()){
        let ok = true
        if(values.tongTrongLuong==0){
          toast.error("Bạn chưa nhập vật phẩm gửi. Vui lòng nhập vật phẩm gửi")
        }
        childrens.forEach((e,i)=>{
        if (matHang1[i].tenVatPham=="" || matHang1[i].trongLuong==0 || matHang1[i].soLuong ==0 ){
          ok = false;
        }
        })
        if(values.tongTienThuHo >= maxTienThuHo){
          toast.error("Không nhận đơn vận chuyển trên "  + Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(maxTienThuHo))
          return
        }
        if(values.tongTrongLuong >= 20000){
          toast.error("Không nhận đơn vận chuyển trên "  + Intl.NumberFormat('vi-VN',{style:'unit',unit:'gram'}).format(20000))
          return
        }
        if(!ok){
          toast.error("Vui lòng nhập đầy đủ thông tin các vật phẩm gửi")
          return
        }
        let diaChiNguoiNhan = values.diaChiNguoiNhan
        let diaChiNguoiGui = values.diaChiNguoiGui
        if (chonNguoiGui==-1){
          diaChiNguoiGui = values.diaChiNguoiGui +' - '+ xaGui.find(m=>m.maXaPhuong==values.maXaPhuongGui).tenXaPhuong + ' - '+
          quanGui.find(m=>m.maQuanHuyen==values.maQuanHuyenGui).tenQuanHuyen + ' - '+tinhGui.find(m=>m.maTinhThanhPho==values.maTinhThanhPhoGui).tenTinhThanhPho
        }
        if (chonNguoiNhan==-1){
          diaChiNguoiNhan = values.diaChiNguoiNhan +' - '+ xa.find(m=>m.maXaPhuong==values.maXaPhuong).tenXaPhuong + ' - '+
          quan.find(m=>m.maQuanHuyen==values.maQuanHuyen).tenQuanHuyen + ' - '+tinh.find(m=>m.maTinhThanhPho==values.maTinhThanhPho).tenTinhThanhPho
        }
        let stringVatPham = stringMatHang + stringMatHang1
        DonVanChuyenService.create({
          maDonVanChuyen: values.maDonVanChuyen,
          maVanDon: values.maVanDon.toString(),
          soDienThoaiNguoiNhan: values.soDienThoaiNguoiNhan,
          soDienThoaiNguoiGui:values.soDienThoaiNguoiGui,
          tenNguoiGui: values.tenNguoiGui,
          tenNguoiNhan: values.tenNguoiNhan,
          diaChiNguoiGui: diaChiNguoiGui,
          diaChiNguoiNhan: diaChiNguoiNhan,
          maHinhThucVanChuyen: values.maHinhThucVanChuyen,
          maKhachHang: values.maKhachHang,
          ngayTao: new Date(),
          nguoiTraCuoc: values.nguoiTraCuoc,
          yeuCauLayHang: values.yeuCauLayHang,
          cuocPhi: values.cuocPhi + ((phiBaoHiemDonVanChuyen/100) * values.tongTienThuHo) + (values.cuocPhi+ (phiBaoHiemDonVanChuyen/100) * values.tongTienThuHo)* (values.phiPhuThu/100),
          thoiGianGiao: values.thoiGianGiao,
          maXaPhuong: values.maXaPhuong,
          tongTienThuHo: values.tongTienThuHo,
          ghiChu: values.ghiChu,
          tongTrongLuong: values.tongTrongLuong,
          maBaoHiemDonVanChuyen:values.maBaoHiemDonVanChuyen

        },stringVatPham)
        .then( rs => {
           if(rs.data)
{           toast.success("Gửi yêu cầu chuyển hàng thành công")
            setValues(innitValues)
            setChonMatHang(-1)
            setChonNguoiGui(-1)
            setChonMatHang1(-1)
            setChonNguoiNhan(-1)
            setChildrens([])
}           else toast.error("Có lỗi xảy ra")
        })
        .catch(e => console.log(e))
      }
      else{
        toast.error("Vui lòng nhập đầy đủ thông tin (các trường có màu đỏ)")
      }
    }
  const handleChangeLoaiVatPham = (e)=>{
      setValues({
        ...values,
        maLoaiVatPham: e.target.value
      })
  }
  const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';
  return (
    <div>
      <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkKhachHang} />
      <div className="content">
        <form className="formdonvanchuyen" onSubmit={handleOnSubmit}>
          <fieldset>
            <legend>Thông tin người gửi</legend>
            <label>Chọn người gửi</label>
            <select name="chonNguoiGui" onChange={handleChangNguoiGui}>
              <option value={-2} defaultValue>
                Người gửi là tôi
              </option>
              <option value={-1}>Nhập người gửi</option>
              {nguoiGui.map((e, i) => {
                return (
                  <option key={i} value={i}>
                    {e.tenNguoiNhanCaNhan}
                  </option>
                );
              })}
            </select>
            <label>Tên người gửi</label>
            <input type={'text'} name='tenNguoiGui' value={values.tenNguoiGui} onChange={handleChangFile} className={applyErrorClass('tenNguoiGui')}/>
            <label>Địa chỉ người gửi</label>
            {chonNguoiGui == -2 ? (
              <select
                name="diaChiNguoiGui"
                value={values.diaChiNguoiGui}
                onChange={handleChangFile}
                className={applyErrorClass('diaChiNguoiGui')}>
                  <option value='' >Chọn địa chỉ</option>
                {soDiaChi.map((e, i) => {
                  return (
                    <option
                      key={i}
                      maXaPhuong={e.maXaPhuong}
                      value={
                        e.diaChi +
                        '-' +
                        e.xaPhuong.tenXaPhuong +
                        '-' +
                        e.xaPhuong.quanHuyen.tenQuanHuyen +
                        '-' +
                        e.xaPhuong.quanHuyen.tinhThanhPho.tenTinhThanhPho
                      }>
                      {e.ten}
                    </option>
                  );
                })}
              </select>
            ) : chonNguoiGui == -1 ? (
              <div>
                <select
                  name="maTinhThanhPhoGui"
                  value={values.maTinhThanhPhoGui}
                  onChange={handleChangFile}>
                  <option value={0}>Chọn tỉnh thành phố</option>
                  {tinhGui.map((e, i) => {
                    return (
                      <option key={i} value={e.maTinhThanhPho}>
                        {e.tenTinhThanhPho}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="maQuanHuyenGui"
                  value={values.maQuanHuyenGui}
                  onChange={handleChangFile}>
                  <option value={0}>Chọn quận huyện</option>
                  {quanGui.map((e, i) => {
                    return (
                      <option key={i} value={e.maQuanHuyen}>
                        {e.tenQuanHuyen}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="maXaPhuongGui"
                  value={values.maXaPhuongGui}
                  onChange={handleChangFile}
                  className={applyErrorClass('maXaPhuongGui')}>
                  <option value={0}>Chọn xã phường</option>
                  {xaGui.map((e, i) => {
                    return (
                      <option key={i} value={e.maXaPhuong}>
                        {e.tenXaPhuong}
                      </option>
                    );
                  })}
                </select>
                <input
                  name="diaChiNguoiGui"
                  style={{'width': '111%'}}
                  value={values.diaChiNguoiGui}
                  onChange={handleChangFile}
                  className={applyErrorClass('diaChiNguoiGui')}
                  placeholder={'Địa chỉ cụ thể'}
                />
              </div>
            ) : (
              <input
                name="diaChiNguoiGui"
                value={values.diaChiNguoiGui}
                onChange={handleChangFile}
                placeholder={'Địa chỉ cụ thể'}
              />
            )}
            <label>Số điện thoại</label>
            <input
              name="soDienThoaiNguoiGui"
              type={'text'}
              value={values.soDienThoaiNguoiGui}
              readOnly={chonNguoiGui != -1}
              className={applyErrorClass('soDienThoaiNguoiGui')}
              onChange={handleChangFile}
            />
          </fieldset>
          <fieldset>
            <legend>Thông tin người nhận</legend>
            <label>Chọn người nhận</label>
            <select
              onChange={(e) => {
                setChonNguoiNhan(e.target.value);
              }}
              value={chonNguoiNhan}>
              <option value={-1} defaultValue>
                Nhập người nhận
              </option>
              {nguoiNhan.map((e, i) => {
                return chonNguoiGui == -2 || chonNguoiGui == -1 ? (
                  <option key={i} value={i}>
                    {e.tenNguoiNhanCaNhan}
                  </option>
                ) : (
                  <option key={i} value={i}>
                    {e.tenNguoiNhanCap3}
                  </option>
                );
              })}
            </select>
            <label>Tên người nhận</label>
            <input
              type={'text'}
              name="tenNguoiNhan"
              value={values.tenNguoiNhan}
              onChange={handleChangFile}
              className={applyErrorClass('tenNguoiNhan')}
            />
            <label>Địa chỉ người nhận</label>
            {chonNguoiNhan == -1 ? (
              <div>
                <select
                  name="maTinhThanhPho"
                  value={values.maTinhThanhPho}
                  onChange={handleChangFile}>
                  <option value={0}>Chọn tỉnh thành phố</option>
                  {tinh.map((e, i) => {
                    return (
                      <option key={i} value={e.maTinhThanhPho}>
                        {e.tenTinhThanhPho}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="maQuanHuyen"
                  value={values.maQuanHuyen}
                  onChange={handleChangFile}>
                  <option value={0}>Chọn quận huyện</option>
                  {quan.map((e, i) => {
                    return (
                      <option key={i} value={e.maQuanHuyen}>
                        {e.tenQuanHuyen}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="maXaPhuong"
                  value={values.maXaPhuong}
                  onChange={handleChangFile}
                  className={applyErrorClass('maXaPhuong')}>
                  <option value={0}>Chọn xã phường</option>
                  {xa.map((e, i) => {
                    return (
                      <option key={i} value={e.maXaPhuong}>
                        {e.tenXaPhuong}
                      </option>
                    );
                  })}
                </select>
                <input
                  style={{ width: '111%' }}
                  name="diaChiNguoiNhan"
                  value={values.diaChiNguoiNhan}
                  onChange={handleChangFile}
                  className={applyErrorClass('diaChiNguoiNhan')}
                  placeholder={'Địa chỉ cụ thể'}
                />
              </div>
            ) : (
              <input
                name="diaChiNguoiNhan"
                value={values.diaChiNguoiNhan}
                onChange={handleChangFile}
                readOnly
                placeholder={'Địa chỉ cụ thể'}
              />
            )}
            <label>Số điện thoại</label>
            <input
              type={'text'}
              name="soDienThoaiNguoiNhan"
              value={values.soDienThoaiNguoiNhan}
              onChange={handleChangFile}
              readOnly={!chonNguoiNhan==-1}
              className={applyErrorClass('soDienThoaiNguoiNhan')}
            />
          </fieldset>
          <fieldset>
            <legend>Hình thức vận chuyện</legend>
            <label>Chọn hình thức vận chuyển</label>
            <select
              name="maHinhThucVanChuyen"
              value={values.maHinhThucVanchuyen}
              className={applyErrorClass('maHinhThucVanChuyen')}
              onChange={handleChangFile}>
                <option value={0}> Chọn hình thức vận chuyển</option>
              {htvc.map((e, i) => {
                return (
                  <option key={i} value={e.hinhThucVanCHuyenId}>
                    {e.ten}
                  </option>
                );
              })}
            </select>
            <label className="tuychon">Lấy hàng</label>
            <input
              type={'checkbox'}
              name="yeuCauLayHang"
              value={values.yeuCauLayHang}
              checked={values.yeuCauLayHang}
              onChange={(e) => {
                setValues({
                  ...values,
                  yeuCauLayHang: !values.yeuCauLayHang,
                });
              }}
            />
            <label
              className="tuychon"
              >
              Người nhận trả cước
            </label>
            <input type={'checkbox'}
            value={values.nguoiTraCuoc}
            checked={values.nguoiTraCuoc}
            onChange={() => {
              setValues({
                ...values,
                nguoiTraCuoc: !values.nguoiTraCuoc,
              })
            }} />
            <label style={{ width: '50%' }}>Ghi chú</label>
            <textarea
              name="ghiChu"
              value={values.ghiChu}
              onChange={handleChangFile}
            />
          </fieldset>
          <fieldset>
            <legend>Vật phẩm gửi</legend>
            <label>Chọn vật phẩm</label>
            <select
              value={chonMatHang}
              onChange={(e) => setChonMatHang(e.target.value)}>
              <option value={-1}>Nhập vật phẩm</option>
              {matHang.map((e, i) => {
                return <option value={i}>{e.tenMatHangCaNhan}</option>;
              })}
            </select>
            <label>Loại vật phẩm</label>
            <select
              value={values.maLoaiVatPham}
              onChange={handleChangeLoaiVatPham}   
              >
              <option  value={0}>Loại vật phẩm</option>
              {loaiVatPham.map((e, i) => {
                return <option value={e.maLoaiMatHang}>{e.tenLoaiMatHang}</option>;
              })}
            </select>
            <label>Tên vật phẩm</label>
            <input
              name="tenVatPham"
              type={'text'}
              value={values.tenVatPham}
              onChange={handleChangeVatPham}
            />
            <div className="vatpham">
              <label>Chiều rộng</label>
              <input
               min={0}
               max= {kichThuocToiDa}
                name="chieuRong"
                onChange={handleChangeVatPham}
                value={values.chieuRong}
                type={'number'}
              />
              <label>Chiều dài</label>
              <input
               min={0}
               max= {kichThuocToiDa}
                type={'number'}
                name="chieuDai"
                value={values.chieuDai}
                onChange={handleChangeVatPham}
              />
              <label>Chiều cao</label>
              <input
                type={'number'}
                min={0}
                max= {kichThuocToiDa}
                name="chieuCao"
                value={values.chieuCao}
                onChange={handleChangeVatPham}
              />
              <label>Trọng lượng</label>
              <input
                type={'number'}
                name="trongLuong"
                value={values.trongLuong}
              />
              <label>Giá trị</label>
              <input
                type={'number'}
                name="giaTri"
                value={values.giaTri}
                onChange={handleChangeVatPham}
              />
              <label>Số lượng</label>
              <input
                type={'number'}
                name="soLuong"
                min={1}
                value={values.soLuong}
                onChange={handleChangeVatPham}
              />
            </div>

            {childrens.map((_, i) => {
              return (
                <div className="abc" key={i}>
                  <label>Chọn vật phẩm {i + 2}</label>
                  <select
                    defaultValue={-1}
                    name={i}
                    value={chonMatHang1}
                    onChange={handleChangFileMatHang1}>
                    <option value={-1}>Nhập vật phẩm</option>
                    {matHangThu2.map((e, i) => {
                      return <option value={i}>{e.tenMatHangCaNhan}</option>;
                    })}
                  </select>
                  <label>Loại vật phẩm</label>
            <select
              value={values.maLoaiVatPham}
              >
              <option  value={0}>Loại vật phẩm</option>
              {loaiVatPham.map((e, i) => {
                return <option value={e.maLoaiMatHang}>{e.tenLoaiMatHang}</option>;
              })}
            </select>
                  <label>Tên vật phẩm </label>
                  <input
                    name="tenVatPham"
                    alt={i}
                    style={{ width: '70%' }}
                    type={'text'}
                    value={matHang1[i].tenVatPham}
                    onChange={handleChangeVatPham1}
                  />
                  <div className="vatpham">
                    <label>Chiều rộng</label>
                    <input
                      name={'chieuRong'}
                      alt={i}
                      onChange={handleChangeVatPham1}
                      value={matHang1[i].chieuRong}
                      type={'number'}
                      min={0}
                      max= {kichThuocToiDa}
                    />
                    <label>Chiều dài</label>
                    <input
                      type={'number'}
                      alt={i}
                      min={0}
                      max= {kichThuocToiDa}
                      name={'chieuDai'}
                      value={matHang1[i].chieuDai}
                      onChange={handleChangeVatPham1}
                    />
                    <label>Chiều cao</label>
                    <input
                      type={'number'}
                      alt={i}
                      name={'chieuCao'}
                      min={0}
                      max= {kichThuocToiDa}
                      value={matHang1[i].chieuCao}
                      onChange={handleChangeVatPham1}
                    />
                    <label>Trọng lượng</label>
                    <input
                      type={'number'}
                      alt={i}
                      name={'trongLuong'}
                      value={matHang1[i].trongLuong}
                    />
                    <label>Giá trị</label>
                    <input
                      type={'number'}
                      alt={i}
                      name={'giaTri'}
                      value={matHang1[i].giaTri}
                      onChange={handleChangeVatPham1}
                    />
                    <label>Số lượng</label>
                    <input
                      type={'number'}
                      alt={i}
                      name={'soLuong'}
                      value={matHang1[i].soLuong}
                      onChange={handleChangeVatPham1}
                    />
                  </div>
                </div>
              );
            })}
            <div className="icon">
              <MdAddCircleOutline
                style={{ color: 'green' }}
                onClick={() => renderCrudDiv()}
              />

              <AiOutlineDelete
                style={{ color: 'red' }}
                onClick={() => {
                  renderCrudDiv1();
                }}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend> Thông tin đơn tự động tính</legend>
            <label>Tổng trọng lượng</label>
            <input type={'number'} readOnly value={values.tongTrongLuong} />
            <label>Tổng tiền thu hộ</label>
            <input type={'number'} readOnly value={values.tongTienThuHo} />
            <label>Phí bảo hiểm</label>
            <input type={'number'} readOnly value={(phiBaoHiemDonVanChuyen/100) * values.tongTienThuHo} />
            <label>Phí phụ thu </label>
            <input type={'number'} readOnly value={(values.cuocPhi+ (phiBaoHiemDonVanChuyen/100) * values.tongTienThuHo)* (values.phiPhuThu/100)} />
            <label>Cước phí</label>
            <input type={'number'} readOnly value={values.cuocPhi} />
            <label>Tổng cước phí</label>
            <input type={'number'} readOnly value={values.cuocPhi + ((phiBaoHiemDonVanChuyen/100) * values.tongTienThuHo) + (values.cuocPhi+ (phiBaoHiemDonVanChuyen/100) * values.tongTienThuHo)* (values.phiPhuThu/100)} />
            <label>Thời gian giao</label>
            <input type={'text'} readOnly value={values.thoiGianGiao} />
          </fieldset>
          <button>Tạo đơn</button>
        </form>
      </div>
    </div>
  );
}

export default TaoDonVanChuyen;
