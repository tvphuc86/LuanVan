import React, { useEffect, useState } from 'react';
import NavControl from '../../component/NavControl';
import SearchBar from '../../component/SearchBar';
import './CuocPhi.css';
import DiaChi from '../../component/DiaChi';
import { AiFillDelete, AiOutlineCloseSquare } from 'react-icons/ai';
import CuocPhiService from '../../service/CuocPhiService';
import { ToastContainer, toast } from 'react-toastify';
import { GrUpdate } from 'react-icons/gr';
import { AiTwotoneDelete } from 'react-icons/ai';
import Pagination from '../../component/Pagination';
import navlinkQuanLy from './linkquanly';
import DiaChiService from '../../service/DiaChiService';
import { set } from 'lodash';

const initFieldValues = {
  maCuocPhi: 0,
  thoiGianGiao: '',
  maHinhThucVanChuyen: 0,
  maQuanHuyen: '',
  maTinh: 0,
  hinhThucVanChuyen: null,
  maTrongLuong: 0,
  giaCuoc: 0
};

function CuocPhi() {
  const [maQuanHuyens, setMaQuanHuyens] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  const [values, setValues] = useState(initFieldValues);
  const [trongLuong, setTrongLuong] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [errors, setErorrs] = useState({});
  const [htvc, setHtvc] = useState([]);
  const [cuocPhis, setCuocPhis] = useState([]);
  const [edit, setEdit] = useState(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [totalRecord, setTotalRecord] = useState(0);
  const [tinh, setTinh] = useState([]);
  const [quanHuyen, setQuanHuyen] = useState([]);
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  useEffect(() => {
    CuocPhiService.getSelectHtvc().then((rs) => {
      setHtvc(rs.data.result);
    });
    DiaChiService.getTinhThanhPho().then((rs) => {
      setTinh(rs.data);
    });
    CuocPhiService.getTrongLuong().then((rs) => setTrongLuong(rs.data.result));
    
  }, []);

  useEffect(() => {
    CuocPhiService.getQuuanHuyen(values.maTinh,values.maTrongLuong[0],values.maHinhThucVanChuyen[0]).then((rs) => {
      setQuanHuyen(rs.data);
      setCheckedState(new Array(Number(rs.data.length)).fill(false));
    });
  }, [values.maTinh,values.maTrongLuong,values.maHinhThucVanChuyen]);
  useEffect(() => {
    if (edit != null) setValues(edit);
  }, [edit]);
  useEffect(() => {
    retrieveData(filter, page, limit);
  }, [filter, page, limit]);
  const retrieveData = () => {
    CuocPhiService.getAll(filter, page, limit)
      .then((rs) => {
        setTotalRecord(rs.data.totalRecord);
        setTotalPage(rs.data.totalPage);
        setCuocPhis(rs.data.result);
      })
      .catch((e) => console.log(e));
  };
  const validate = () => {
    let temp = {};
    if (values.thoiGianGiao == '')
      temp.thoiGianGiao = 'Vui lòng nhập thời gian giao';
    else temp.thoiGianGiao = true;
    if (values.maTinh == 0) {
      temp.maTinh = 'Vui lòng chọn tỉnh';
    } else temp.maTinh = true;
    if (checkedState.every((x) => x == false)) {
      temp.maQuanHuyen = 'Vui lòng chọn huyện';
    } else temp.maQuanHuyen = true;
    if (values.maHinhThucVanChuyen == 0) {
      temp.maHinhThucVanChuyen = 'Vui lòng chọn hình thức vận chuyển';
    } else temp.maHinhThucVanChuyen = true;
    if (values.giaCuoc == 0) {
      temp.giaCuoc = 'Vui lòng nhập giá cước';
    } else temp.giaCuoc = true;
    if (values.maTrongLuong == 0) {
      temp.maTrongLuong = 'Vui lòng nhập trọng lượng';
    } else temp.maTrongLuong = true;
    setErorrs(temp);
    return Object.values(temp).every((x) => x == true);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(values.maHinhThucVanChuyen)
    if (validate()) {
      CuocPhiService.create(
        {
          maCuocPhi: 0,
          giaCuoc:values.giaCuoc[0],
          thoiGianGiao:values.thoiGianGiao[0],
          maTrongLuong:values.maTrongLuong[0],
          maHinhThucVanChuyen:Number(values.maHinhThucVanChuyen[0])
        },
        values.maQuanHuyen
      ).then((rs) => {
        if(rs.data.result){
          toast.success(rs.data.messgae)
          setActiveModal(!activeModal)
        }
      });
    }
  };
  useEffect(()=>{
    let abc =  maQuanHuyens.toString() 
    setValues({
      ...values,
      maQuanHuyen: abc});
  },[maQuanHuyens])
  const resetForm = () => {
    setValues(initFieldValues);
    setErorrs({});
    setQuanHuyen([])
  };
  const handleChangValueField = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: [value],
    });
  };
  const showRecord = (data) => {
    setErorrs({});
    setValues({
      ...values,
      maCuocPhi: data.maCuocPhi,
      thoiGianGiao: data.cuocPhi.thoiGianGiao,
      maHinhThucVanChuyen: data.cuocPhi.maHinhThucVanChuyen,
      maQuanHuyen: data.maQuanHuyen,
      maTrongLuong:data.cuocPhi.trongLuong.maTrongLuong,
      giaCuoc: data.cuocPhi.giaCuoc
    })
  };
  const handelDelete = (maCuocPhi,maQuanHuyen) => {
    if (window.confirm('Bạn thậy sự muốn xóa') == true)
      CuocPhiService.delete(maCuocPhi,maQuanHuyen)
        .then((rs) => {
          toast.success('đã xóa');
          retrieveData(filter, page, limit);
          resetForm();
        })
        .catch((e) => toast.error('Có lỗi khi xóa'));
  };
  const handleFilter = (e) => {
    let string = e.target.value;
    setFilter(string);
  };
  const handleChangeCheckbox = (e) => {
    const updateState = checkedState.map((item, index) =>
      index == e.target.id ? !item : item
    );
    setCheckedState(updateState);
    if (e.target.checked) {
      setMaQuanHuyens([...maQuanHuyens, e.target.name]);
    } else {
      setMaQuanHuyens(maQuanHuyens.filter((m) => m !== e.target.name));
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';
  return (
    <div>
      <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkQuanLy} />
      <div className="content">
        <h1 className="title-page">Quản lý cước phí</h1>
        <div
          className={activeModal ? 'model-formCP' : 'model-formCP  nonactive'}>
          <h1>Thêm / chỉnh sửa cước phí</h1>
          <AiOutlineCloseSquare
            className="close"
            onClick={() => {
              setActiveModal(!activeModal);
            }}
          />
          <form autoComplete="off" onSubmit={handleOnSubmit}>
            <div className="group-select">
              <label>Hình thức vận chuyển</label>
              <div className="select-group">
                <select
                  onChange={handleChangValueField}
                  name="maHinhThucVanChuyen"
                  className={applyErrorClass('maHinhThucVanChuyen')}
                  value={values.maHinhThucVanChuyen}>
                  <option key={-1} value={0}>
                    Chọn hình thức vận chuyển
                  </option>
                  {htvc.map((items, index) => {
                    return (
                      <option key={index} value={items.hinhThucVanCHuyenId}>
                        {items.ten}
                      </option>
                    );
                  })}
                </select>
                <p className="error">{errors.maHinhThucVanChuyen}</p>
              </div>
            </div>
            <div className="group-select">
              <label>Trọng lượng</label>
              <div className="select-group">
                <select
                  onChange={handleChangValueField}
                  name="maTrongLuong"
                  className={applyErrorClass('maTrongLuong')}
                  value={values.maTrongLuong}>
                  <option key={-1} value={0}>
                    Chọn mức trọng lượng
                  </option>
                  {trongLuong.map((e, i) => {
                    return (
                      <option key={i} value={e.maTrongLuong}>
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'unit',
                          unit: 'gram',
                        }).format(e.trongLuongBatDau)}{' '}
                        -{' '}
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'unit',
                          unit: 'gram',
                        }).format(e.trongLuongKetThuc)}
                      </option>
                    );
                  })}
                </select>
                <p className="error">{errors.maTrongLuong}</p>
              </div>
            </div>
            
            <div className="group-select">
              <label>Địa chỉ</label>
              <div className="select-group">
                <select
                  onChange={handleChangValueField}
                  name="maTinh"
                  className={applyErrorClass('maTinh')}
                  value={values.maTinh}>
                  <option value={0}>Chọn tỉnh</option>
                  {tinh.map((e, i) => {
                    return (
                      <option key={i} value={e.maTinhThanhPho}>
                        {e.tenTinhThanhPho}
                      </option>
                    );
                  })}
                </select>
                <p className="error">{errors.maTinh}</p>
              </div>
            </div>
            <div className="form-check">
              {quanHuyen.map((e, i) => {
                return (
                  <div>
                    <label htmlFor={e.maQuanHuyen}>{e.tenQuanHuyen}</label>
                    <input
                      onChange={handleChangeCheckbox}
                      type={'checkbox'}
                      name={e.maQuanHuyen}
                      id={i}
                      value={maQuanHuyens}
                      checked={checkedState[i]}
                    />
                  </div>
                );
              })}
            </div>
            <p className="error">{errors.maQuanHuyen}</p>
            <div className="form-group">
              <label>Thời gian giao</label>
              <input
                type={'text'}
                name="thoiGianGiao"
                onChange={handleChangValueField}
                className={applyErrorClass('thoiGianGiao')}
                placeholder={
                  errors.thoiGianGiao == true
                    ? 'Thời gian giao, ví dụ: 2 ngày'
                    : errors.thoiGianGiao
                }
                value={values.thoiGianGiao}
              />
            </div>
            <p className="error">{errors.thoiGianGiao}</p>
            <div className="form-group">
              <label>Giá cước(đ)</label>
              <input
                type={'number'}
                name="giaCuoc"
                onChange={handleChangValueField}
                className={applyErrorClass('thoiGianGiao')}
                placeholder={
                  errors.giaCuoc == true
                    ? 'Giá cước vd: 200 000đ'
                    : errors.giaCuoc
                }
                value={values.giaCuoc}
                min={15000}
                step={500}
              />
            </div>
            <p className="error">{errors.giaCuoc}</p>
            <button type="submit">Lưu</button>
          </form>
        </div>
        <div className="list">
          <div className="search">
            <input
              type={'search'}
              placeholder="Nhập thời gian giao, nơi nhận hoặc tên hình thức vận chuyển"
              onChange={handleFilter}
            />
          </div>
         
          <div className="header-table">
            <p className="total-table">Tổng số: {totalRecord}</p>
            <button
              className="button-add"
              onClick={() => {
                setActiveModal(!activeModal);
                resetForm();
              }}>
              Thêm mới cước phí
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Địa chỉ nhận</th>
                <th>Hình thức</th>
                <th>Trọng lượng</th>
                <th>Giá cước</th>
                <th>Thời gian giao</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              { cuocPhis.map((e,i)=>{
                return(
                  <tr key={i}>
                  <td>{e.quanHuyen.tenQuanHuyen} - {e.quanHuyen.tinhThanhPho.tenTinhThanhPho} </td>
                  <td>{e.cuocPhi.hinhThucVanChuyen.ten}</td>
                  <td>{new Intl.NumberFormat('vi-VN',{style:'unit',unit:'gram'}).format(e.cuocPhi.trongLuong.trongLuongBatDau)}  - {new Intl.NumberFormat('vi-VN',{style:'unit',unit:'gram'}).format(e.cuocPhi.trongLuong.trongLuongKetThuc)}                   
                  </td>
                  <td>{ new Intl.NumberFormat('vi-VN',{style:'currency',currency:"VND"}).format( e.cuocPhi.giaCuoc)}</td>
                  <td>{e.cuocPhi.thoiGianGiao}</td>
                  <td>   <AiFillDelete onClick={()=>{handelDelete(e.maCuocPhi,e.maQuanHuyen)}}/></td>
                </tr>
                )
              })
               
              }
            </tbody>
          </table>
          <Pagination
            page={page}
            limit={limit}
            totalPage={totalPage}
            handleChangePage={handleChangePage}
            handleChangeLimitPage={handleChangeLimitPage}
            siblings={1}
          />
        </div>
      </div>
    </div>
  );
}

export default CuocPhi;
