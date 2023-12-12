import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import NavControl from '../../component/NavControl'
import SearchBar from '../../component/SearchBar'
import navlinkQuanLy from './linkquanly'
import "./DuLieuTinhCuoc.css"
import { AiFillCloseSquare, AiFillDelete } from 'react-icons/ai'
import DiaChiService from '../../service/DiaChiService'
import CuocPhiService from '../../service/CuocPhiService'
import { set } from 'lodash'
import DuLieuTinhCuocService from '../../service/DuLieuTinhCuocService'
import { GrUpdate } from 'react-icons/gr'
import Pagination from '../../component/Pagination'

const initFilter = {
  filter: "",
  maTinhThanhPho: 0,
  maHinhThucVanChuyen: 0
}
const initValues = {
  maDuLieuTinhCuoc: 0,
  maHinhThucVanChuyen:0,
  maTinhThanhPho: 0,
  trongLuongBatDau: 0,
  giaTriNac: 0,
  giaCuocNac: 0,
  phiTangNhanVienGiaoHang: 0
}
function DuLieuTinhCuoc() {

  const [modelActive,setModelActive] = useState(false)
  const [filters,setFilters] = useState(initFilter)
  const [hinhThucVanChuyen,setHinhThucVanChuyen] = useState([])
  const [tinhThanhPho,setTinhThanhPho] = useState([])
  const [values,setValues] = useState(initValues)
  const [errors,setErrors] = useState({})
  const [data,setData] = useState([])
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(5)
  const [totalPage,setTotalPage] = useState(0)
  const [totalRecord, setTotalRecord] = useState(0);
  useEffect(()=>{
    DuLieuTinhCuocService.get(filters.filter,filters.maHinhThucVanChuyen,filters.maTinhThanhPho,page,limit)
    .then(rs => {setData(rs.data.result)
      setTotalPage(rs.data.totalPage)
      setTotalRecord(rs.data.totalRecord)
    })
  },[data,filters,limit,page])

  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  useEffect(()=>{
    inintDataSelect()
  },[])
  const inintDataSelect = ()=>{
    DiaChiService.getTinhThanhPho()
    .then(rs => setTinhThanhPho(rs.data))
    .catch()
    CuocPhiService.getSelectHtvc()
    .then(rs => {
      setHinhThucVanChuyen(rs.data.result)})
    .catch()
  }
  const handleChangeFilter = e =>{
    let {value,name} = e.target
    setFilters({
      ...filters,
      [name]:value
    })
  }
  const handleChangeFieldValues = e =>{
    let {value,name} = e.target
    setValues({
      ...values,
      [name]:value
    })
  }
  const validate = () =>{
    let temp = {}
    temp.maHinhThucVanChuyen = values.maHinhThucVanChuyen == 0 ? false : true
    temp.maTinhThanhPho = values.maTinhThanhPho == 0 ? false : true
    setErrors(temp)
    return Object.values(temp).every(e=>e===true)
  }
  const handleOnSubmit = e=>{
    e.preventDefault()
    
         if(validate()){
          if(values.maDuLieuTinhCuoc==0){
            DuLieuTinhCuocService.create(values)
            .then(rs => {
              if (rs.data.result){
                toast.success(rs.data.messgae)
                setValues(initValues)
                DuLieuTinhCuocService.get(filters.filter,filters.maHinhThucVanChuyen,filters.maTinhThanhPho,page,limit)
    .then(rs => {setData(rs.data.result)
      setTotalPage(rs.data.totalPage)
      setTotalRecord(rs.data.totalRecord)
    })
              }else{
                toast.error(rs.data.messgae)
              }
            })
          }else{
            DuLieuTinhCuocService.update(values.maDuLieuTinhCuoc,{
              maDuLieuTinhCuoc: values.maDuLieuTinhCuoc,
  maHinhThucVanChuyen:values.maHinhThucVanChuyen,
  maTinhThanhPho: values.maTinhThanhPho,
  trongLuongBatDau: values.trongLuongBatDau,
  giaTriNac: values.giaTriNac,
  giaCuocNac: values.giaCuocNac,
  phiTangNhanVienGiaoHang: values.phiTangNhanVienGiaoHang
            })
            .then(rs => {
              if (rs.data.result){
                toast.success(rs.data.messgae)
                setValues(initValues)
              }else{
                toast.error(rs.data.messgae)
              }
            })
          }
       
    }else{
      toast.error("Vui lòng cung cấp đủ thông tin ")
    }
    
 

  }
  const applyErrorClass = (field) =>
  field in errors && errors[field] != true ? 'invalid-field' : '';
  const handleDelete = (id) =>{
    if (window.confirm("Bạn thật sự muốn xóa??")===true){
        DuLieuTinhCuocService.delete(id)
        .then(rs => {
          if(rs.data.result){
            toast.success(rs.data.messgae)
            
          }
          else{
            toast.error(rs.data.messgae)
          }
        })
    }
  }
  return (
    <div>
        <NavControl links={navlinkQuanLy}/>
      <SearchBar />
      <ToastContainer />
      <div className='content'>
          <div className={!modelActive ? 'modal-dulieu non-active' : 'modal-dulieu'}>
            <h1>Thêm / sửa dữ liệu tính cước</h1>
            <AiFillCloseSquare className='close' onClick={()=> setModelActive(false)}/>
            <br />
            <form onSubmit={handleOnSubmit} onReset={()=>setValues(initValues)}>
              <select name='maTinhThanhPho' onChange={handleChangeFieldValues} className={applyErrorClass("maTinhThanhPho")} value={values.maTinhThanhPho}>
                <option value={0}>Tỉnh thành phố</option>
                {tinhThanhPho.map((i,e)=>{
                  return(
                    <option key={e} value={i.maTinhThanhPho}>{i.tenTinhThanhPho}</option>
                  )
                })}
              </select>
              <select name='maHinhThucVanChuyen' onChange={handleChangeFieldValues} className={applyErrorClass("maHinhThucVanChuyen")} value={values.maHinhThucVanChuyen}>
                <option value={0}>Hình thức vận chuyển</option>
                {hinhThucVanChuyen.map((i,e)=>{
                  return(
                    <option key={e} value={i.hinhThucVanCHuyenId}>{i.ten}</option>
                  )
                })}
              </select>
              <div className='form-group'>
                  <label>Trọng lượng bắt đầu</label>
                  <input type={'number'} name='trongLuongBatDau' min={2000} onChange={handleChangeFieldValues} value={values.trongLuongBatDau} />
              </div>
              <div className='form-group'>
                  <label>Giá trị nấc</label>
                  <input type={'number'} name='giaTriNac' min={50} onChange={handleChangeFieldValues} value={values.giaTriNac} />
              </div>
              <div className='form-group'>
                  <label>Giá cước</label>
                  <input type={'number'} name='giaCuocNac' min={100} onChange={handleChangeFieldValues} value={values.giaCuocNac}/>
              </div>
              <div className='form-group'>
                  <label>Phí tăng giao hàng</label>
                  <input type={'number'} name='phiTangNhanVienGiaoHang' min={500} onChange={handleChangeFieldValues} value={values.phiTangNhanVienGiaoHang}/>
              </div>
              
              <button type='submit'>Lưu</button>
            </form>
       
          </div>
          <div className='list'>
          <h1>Quản lý dữ liệu tính cước</h1>
          <div className='filter'>
              <input type={'search'} name="filter" value={filters.filter} onChange={handleChangeFilter}/>
              <select name="maHinhThucVanChuyen" value={filters.maHinhThucVanChuyen} onChange={handleChangeFilter}>
                <option value={0}>Hình thức vận chuyển</option>
                {hinhThucVanChuyen.map((i,e)=>{
                  return(
                    <option key={e} value={i.hinhThucVanCHuyenId}>{i.ten}</option>
                  )
                })}
              </select>
              <select  name="maTinhThanhPho" value={filters.maTinhThanhPho} onChange={handleChangeFilter}>
                <option value={0}>Tỉnh thành phố</option>
                {tinhThanhPho.map((i,e)=>{
                  return(
                    <option key={e} value={i.maTinhThanhPho}>{i.tenTinhThanhPho}</option>
                  )
                })}
              </select>
            </div>
            <div className='table-header'>
              <span>Tổng: {totalRecord}</span>
              <button onClick={()=>{
                setModelActive(true)
              setValues(initValues)}}
              >Thêm dữ liệu tính cước</button>
            </div>
            <table>
              <thead>
              <tr>
                <th>Tỉnh thành phố</th>
                <th>Hình thức vận chuyển</th>
                <th>Trọng lượng bắt đầu</th>
                <th>Giá trị nấc</th>
                <th>Cước nấc</th>
                <th>Phí tăng giao hàng</th>
                <th colSpan={2}></th>
              </tr>
              </thead>
             <tbody>
              {  data.map((e,i) => {
                return (
                  <tr key={i}>
                  <td>{e.tinhThanhPho.tenTinhThanhPho}</td>
                  <td>{e.hinhThucVanChuyen.ten}</td>
                  <td>{new Intl.NumberFormat('vi-VN',{style:'unit',unit:'gram'}).format(e.trongLuongBatDau)}</td>
                  <td>{new Intl.NumberFormat('vi-VN',{style:'unit',unit:'gram'}).format(e.giaTriNac)}</td>
                  <td>{new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(e.giaCuocNac)}</td>
                  <td>{new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(e.phiTangNhanVienGiaoHang)}</td>
                  <td colSpan={2}><GrUpdate onClick={()=>{
                    setValues(e)
                    setModelActive(true)
                  }}/> <AiFillDelete onClick={()=>{handleDelete(e.maDuLieuTinhCuoc)}} /></td>
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
  )
}

export default DuLieuTinhCuoc
