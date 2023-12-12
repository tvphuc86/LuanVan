
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
    maBaoHiemDonVanChuyen: 0,
    giaTriBatDau: 0,
    giaTriKetThuc:0,
    phiBaoHiem: 0,
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
function BaoHiemDonVanChuyen() {
    const [values,setValues] = useState(initValue);
    const [data,setData] = useState([])
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPage, setTotalPage] = useState();
    const [totalRecord, setTotalRecord] = useState(0);
    const [errors, setError] = useState({});
    const [filter, setFilter] = useState('');

    useEffect(()=>{
       DuLieuTinhCuocService.getBaoHiemDonVanChuyen()
       .then( rs => {
        console.log(rs.data);
        let datafilter = rs.data.filter(x=>x.maBaoHiemDonVanChuyen.toString().includes(filter) || x.giaTriBatDau.toString().includes(filter) || x.giaTriKetThuc.toString().includes(filter)).skip((page-1)*limit).limit(limit)
        setData(datafilter)
        setTotalPage(Math.ceil(datafilter.length/limit))
        setTotalRecord(datafilter.length)})
    },[filter,page,limit])
    const validate = () => {
        let temp = {};
        temp.giaTriBatDau =
          values.giaTriBatDau == 0 ? 'Vui lòng nhập giá trị bắt đầu' : true;
        temp.giaTriKetThuc =
          values.giaTriKetThuc == 0 ? 'Vui lòng nhập giá trị kết thúc' : true;

        setError(temp);
        return Object.values(temp).every((x) => x == true);
      };
    const handleFormSubmit = (e) =>{
        e.preventDefault()
        if(validate()){
            if(values.maBaoHiemDonVanChuyen == 0){
                DuLieuTinhCuocService.postBaoHiemDonVanChuyen(values)
                .then( rs => {
                    if(!rs.data)
                    toast.error("Khoảng giá trị không hợp lệ")
                    else
                    toast.success("Thêm thành công")
                })
            }
            else{
                DuLieuTinhCuocService.putBaoHiemDonVanChuyen(values)
                .then( rs => {
                    if(!rs.data)
                    toast.error("Khoảng giá trị không hợp lệ")
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
        <h1>Quản lý phí bảo hiểm đơn vận chuyển</h1>
        <div className="search-and-form">
        <div className="form">
            <form
              autoComplete="off"
              onSubmit={handleFormSubmit}
              >
              <fieldset className="formHtvc">
                <legend>
                  <h2>Thêm mới</h2>
                </legend>
                <div className="form-group">
                  <label>Giá trị bắt đầu (đồng)</label>
                  <input
                    type={'number'}
                    placeholder=""
                    name="giaTriBatDau"
                    min ={0}
                    required
                    max={19999000}
                    value={values.giaTriBatDau}
                    onChange={handleChangeInput}
                    className={applyErrorClass('giaTriBatDau')}
                  />
                </div>
                <sub className="errors-input">{errors.giaTriBatDau}</sub>
                <div className="form-group">
                  <label>Giá trị kết thúc (đồng)</label>
                  <input
                    type={'number'}
                    placeholder=""
                    name="giaTriKetThuc"
                    min ={Number(values.giaTriBatDau) + 1000 }
                    required
                    max={20000000}
                    value={values.giaTriKetThuc}
                    onChange={handleChangeInput}
                    className={applyErrorClass('giaTriKetThuc')}
                  />
                </div>
                <sub className="errors-input">{errors.giaTriKetThuc}</sub>

                <div className="form-group">
                  <label>Phí phụ thu (%)</label>
                  <input
                    type={'number'}
                    placeholder=""
                    name="phiBaoHiem"
                    step={0.01}
                    min ={0}
                    required
                    max={1}
                    value={values.phiBaoHiem}
                    onChange={handleChangeInput}
                    className={applyErrorClass('phiBaoHiem')}
                  />
                </div>
                <sub className="errors-input">{errors.phiBaoHiem}</sub>

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
                  <th>Mã </th>
                  <th>Giá trị đầu</th>
                  <th>Giá trị cuối</th>
                  <th>Phí bảo hiểm</th>
                  <th colSpan={2}></th>
                </tr>
              </thead>
              <tbody>
                {data.map((htvc, index) => {
                  return (
                    <tr key={index}>
                      <td>{htvc.maBaoHiemDonVanChuyen}</td>
                      <td>{htvc.giaTriBatDau}</td>
                      <td>{htvc.giaTriKetThuc} </td>
                      <td>{Intl.NumberFormat('vi-Vn',{style:'unit',unit:"percent"}).format(htvc.phiBaoHiem)}</td>
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

export default BaoHiemDonVanChuyen
