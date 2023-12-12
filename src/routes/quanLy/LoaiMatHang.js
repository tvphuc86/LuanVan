import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { GrUpdate } from 'react-icons/gr'
import { toast, ToastContainer } from 'react-toastify'
import NavControl from '../../component/NavControl'
import Pagination from '../../component/Pagination'
import SearchBar from '../../component/SearchBar'
import DuLieuTinhCuocService from '../../service/DuLieuTinhCuocService'
import navlinkQuanLy from './linkquanly'

const initValue = {
    maLoaiMatHang: 0,
    tenLoaiMatHang: '',
    moTaLoaiMatHang: '',
    phuPhiMatHang: '',
    kichThuocToiDa: 0,
}
function limit(c) {
    return this.filter((x, i) => {
      if (i <= c - 1) {
        return true;
      }
    });
  }
  
  Array.prototype.limit = limit;
  function skip(c) {
    return this.filter((x, i) => {
      if (i > c - 1) {
        return true;
      }
    });
  }
  Array.prototype.skip = skip;
function LoaiMatHang() {
    const [values,setValues] = useState(initValue);
    const [data,setData] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState(0);
    const [errors, setError] = useState({});
    const [filter, setFilter] = useState('');

    useEffect(()=>{
       DuLieuTinhCuocService.getLoaiMathang()
       .then( rs => {
        let datafilter = rs.data.filter(x=>x.tenLoaiMatHang.includes(filter) || x.moTaLoaiMatHang.includes(filter)).skip((page-1)*limit).limit(limit)
        setData(datafilter)
        setTotalPage(Math.ceil(datafilter.length/limit))
        setTotalRecord(datafilter.length)})
    },[filter,page,limit])
    const validate = () => {
        let temp = {};
        temp.tenLoaiMatHang =
          values.tenLoaiMatHang == '' ? 'Vui lòng nhập tên ' : true;
        temp.moTaLoaiMatHang =
          values.moTaLoaiMatHang == '' ? 'Vui lòng nhập mô tả' : true;
          temp.kichThuocToiDa = values.kichThuocToiDa== 0 ? "Vui lòng nhập kích thước tối đa của vât phẩm" : true;
          temp.phuPhiMatHang = values.phuPhiMatHang== 0 ? "Vui lòng nhập phụ phí" : true;

        setError(temp);
        return Object.values(temp).every((x) => x == true);
      };
    const handleFormSubmit = (e) =>{
        e.preventDefault()
        if(validate()){
            if(values.maLoaiMatHang == 0){
                DuLieuTinhCuocService.postLoaiMatHang(values)
                .then( rs => {
                    if(!rs.data)
                    toast.error("Tên loại mặt hàng đã tồn tại")
                    else
                    toast.success("Thêm thành công")
                })
            }
            else{
                DuLieuTinhCuocService.putLoaiMatHang(values.maLoaiMatHang,values)
                .then( rs => {
                    if(!rs.data)
                    toast.error("Tên loại mặt hàng đã tồn tại")
                    else
                    toast.success("Cập nhật thành công")
            })
        }
}
    }
const handleDelete = (id) => {
     
     
  };
const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  const handleFilter = (e) => {
    const filterState = e.target.value;
    setFilter(filterState);
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };
  const showRecord = (data) => {
    setValues(data);
  };
  const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';
  return (
    <div>
    <NavControl links={navlinkQuanLy}/>
    <SearchBar />
    <ToastContainer />
    <div className='content'>
        <h1>Quản lý loại mặt hàng</h1>
        <div className="search-and-form">
        <div className="form">
            <form
              autoComplete="off"
              noValidate
              onSubmit={handleFormSubmit}
              >
              <fieldset className="formHtvc">
                <legend>
                  <h2>Thêm mới</h2>
                </legend>
                <div className="form-group">
                  <label>Tên</label>
                  <input
                    type={'text'}
                    placeholder="Nhập tên loại mặt hàng"
                    name="tenLoaiMatHang"
                    value={values.tenLoaiMatHang}
                    onChange={handleChangeInput}
                    className={applyErrorClass('ten')}
                  />
                </div>
                <sub className="errors-input">{errors.tenLoaiMatHang}</sub>
                <div className="form-group">
                  <label>Phí phụ thu (%)</label>
                  <input
                    type={'number'}
                    placeholder=""
                    name="phuPhiMatHang"
                    step={0.1}
                    min ={0}
                    required
                    max={1}
                    value={values.phuPhiMatHang}
                    onChange={handleChangeInput}
                    className={applyErrorClass('phuPhiMatHang')}
                  />
                </div>
                <sub className="errors-input">{errors.phuPhiMatHang}</sub>
                <div className="form-group">
                  <label>Kích thước tối đa (cm)</label>
                  <input
                    type={'number'}
                    placeholder=""
                    name="kichThuocToiDa"
                    step={1}
                    min ={1}
                    required
                    max={80}
                    value={values.kichThuocToiDa}
                    onChange={handleChangeInput}
                    className={applyErrorClass('kichThuocToiDa')}
                  />
                </div>
                <sub className="errors-input">{errors.kichThuocToiDa}</sub>
                <div className="form-group">
                  <label>Mô tả</label>
                  <textarea
                    placeholder="Nhập mô tả "
                    name="moTaLoaiMatHang"
                    value={values.moTaLoaiMatHang}
                    onChange={handleChangeInput}
                    className={applyErrorClass('moTaLoaiMatHang')}></textarea>
                </div>
                <sub className="errors-input">{errors.moTaLoaiMatHang}</sub>

                <button type="submit">Lưu</button>
              </fieldset>
            </form>
          </div>
          <div className="list">
            <div className="search">
              <input
                type={'text'}
                placeholder="Nhập tên hoặc mô tả"
                onChange={handleFilter}
              />
            </div>
            <p className="total-table">Tổng số: {totalRecord}</p>
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Mô tả</th>
                  <th>Phí phụ thu</th>
                  <th>Kích thước tối đa</th>
                  <th colSpan={2}></th>
                </tr>
              </thead>
              <tbody>
                {data.map((htvc, index) => {
                  return (
                    <tr key={index}>
                      <td>{htvc.tenLoaiMatHang}</td>
                      <td>{htvc.moTaLoaiMatHang}</td>
                      <td>{htvc.phuPhiMatHang} %</td>
                      <td>{Intl.NumberFormat('vi-Vn',{style:'unit',unit:"centimeter"}).format(htvc.kichThuocToiDa)}</td>
                      <td className="action-row" colSpan={2}>
                        <GrUpdate
                          title="Cập nhật"
                          onClick={() => {
                            showRecord(htvc);
                          }}
                        />
                        <AiOutlineDelete
                          onClick={() => handleDelete(htvc.hinhThucVanCHuyenId)}
                          title="Xóa"
                        />{' '}
                      </td>
                    </tr>
                  );
                })}
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
    </div>
  )
}

export default LoaiMatHang
