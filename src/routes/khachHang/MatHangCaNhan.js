import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai'
import { GrUpdate } from 'react-icons/gr'
import { toast, ToastContainer } from 'react-toastify'
import NavControl from '../../component/NavControl'
import Pagination from '../../component/Pagination'
import SearchBar from '../../component/SearchBar'
import DuLieuTinhCuocService from '../../service/DuLieuTinhCuocService'
import MatHangCaNhanService from '../../service/MatHangCaNhanService'
import DuLieuTinhCuoc from '../quanLy/DuLieuTinhCuoc'
import navlinkKhachHang from './linkKhachHang'
import './MatHangCaNhan.css'
const initValues = {
    maMatHangCaNhan: 0,
    tenMatHangCaNhan:"",
    trongLuong: 0,
    chieuRong: 0,
    chieuDai:0,
    chieuCao:0,
    duyet: false,
    giaTri: 0,
    maLoaiMatHang: 0,
    maTaiKhoan: localStorage.getItem("maTaiKhoan")
}

function MatHangCaNhan() {
    const [values,setValues] = useState(initValues)

    const [errors,setErorrs] = useState({})
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(5)
    const [totalPage,setTotalPage] = useState(0)
    const [totalRecord,setTotalRecord] = useState(0)
    const [matHangCaNhan,setMatHangCaNhan] = useState([])
    const [congkenh,setCongKenh] = useState(false)
    const [filter,setFilter] = useState("")
    const [loaiMatHang,setLoaiMatHang] = useState([])
    const [kichThuocToiDa,setKichThuocToiDa] = useState(0)
    useEffect( () => {
       retrieveData(filter,page,limit,values.maTaiKhoan)
    },[page,limit,values,filter])
    const retrieveData = (filter,page,limit,id)=> {
        MatHangCaNhanService.get(filter,page,limit,id)
        .then( rs => {
    
            setMatHangCaNhan(rs.data.data)
            setTotalPage(rs.data.totalPage)
            setTotalRecord(rs.data.totalRecord)
        })
    }
    useEffect(()=>{
      DuLieuTinhCuocService.getLoaiMathang()
      .then(rs => setLoaiMatHang(rs.data))
    },[])

    useEffect(()=>{
      DuLieuTinhCuocService.getLoaiMathang()
      .then(rs => setKichThuocToiDa(rs.data.filter(m=>m.maLoaiMatHang==values.maLoaiMatHang)[0].kichThuocToiDa))
    },[values.maLoaiMatHang])



    const handleChangFile = e => {
        let {name,value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleChangePage = (value) => {
        setPage(value);
      };
      const handleChangeLimitPage = (e) => {
        setLimit(e.target.value);
      };

    const validate = () => {
        let temp ={}
        temp.ten = values.tenMatHangCaNhan == 0 ? false : true
        temp.maLoaiMatHang = values.maLoaiMatHang == 0 ? false : true
        temp.giaTri = values.giaTri == 0 ? false : true
       if ((values.chieuCao==0 && values.chieuRong==0 && values.chieuDai==0) && values.trongLuong==0)
           { temp.trongLuong = false
            toast.error("Vui lòng nhập trọng lượng hoặc dữ liệu vật phẩm cồng kềnh")
        }
        else temp.trongLuong = true
        setErorrs(temp)
        return Object.values(temp).every(x=>x===true)
    }
    const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
           if (values.maMatHangCaNhan==0){
            MatHangCaNhanService.create(values)
            .then( rs => {
                if(rs.data.result)
                    {
                        toast.success(rs.data.messgae)
                        setValues(initValues)
                        setErorrs({})
                    }
                    else toast.error(rs.data.messgae)
            })
           }else{
            console.log(values);

            MatHangCaNhanService.update(values.maMatHangCaNhan,{
              ...values,
              taiKhoan : null,
              loaiMatHang: null,
              quanLy : null
            })
            .then( rs => {
                if(rs.data.result)
                    {
                        toast.success(rs.data.messgae)
                        setValues(initValues)
                        setErorrs({})
                    }
                    else toast.error(rs.data.messgae)
            })
           }
           
           
        }
        else toast.error("Vui lòng nhập đầy đủ các trường có màu đỏ ")
    }

    const showRecord = e =>{
        if(e.trongLuong!=0)
            {setCongKenh(true)
        setValues(
          e
        )}
        else{
            setValues(
              e
            )
            setCongKenh(false)
        }
    }

    const handleDelete = id => {
        if(window.confirm("Bạn thật sự muốn xóa?")==true){
            MatHangCaNhanService.delete(id)
            .then(rs => {if(rs.data) {toast.success("Đã xóa mặt hàng") 
            retrieveData(filter,page,limit,values.maTaiKhoan)} 
            else 
            toast.error("Có lỗi khi xóa")})
        }
    }
  return (
    <div>
      <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkKhachHang} />
      <div className="content">
        <h1 style={{'padding':'1rem'}}>Quản lý mặt hàng cá nhân</h1>

        <div className="form-diachi">
          <form onSubmit={handleSubmit}>
          <fieldset>
              <label>Loại mặt hàng</label>
              <select
                name="maLoaiMatHang"
                value={values.maLoaiMatHang}
                onChange={handleChangFile}
                className={applyErrorClass('maLoaiMatHang')}
              >
                <option value={0}>Chọn loại mặt hàng</option>
                {loaiMatHang.map((e,i)=>{
                  return(
                    <option value={e.maLoaiMatHang} key={e+i}>{e.tenLoaiMatHang}</option>
                  )
                })}
              </select>
            </fieldset>
            <fieldset>
              <label>Tên mặt hàng</label>
              <input
                name="tenMatHangCaNhan"
                value={values.tenMatHangCaNhan}
                onChange={handleChangFile}
                className={applyErrorClass('ten')}
              />
            </fieldset>

            <fieldset>
              <label>Hàng hóa cồng kềnh</label>
              <input
                type={'checkbox'}
                onChange={() => setCongKenh(!congkenh)}
                checked={congkenh}
                readOnly ={!congkenh}
              />
              {congkenh ? (
                <fieldset className="trongLuong">
                  <label>Chiều rộng</label>
                  <input
                    min={0}
                    max={kichThuocToiDa}
                    name="chieuRong"
                    onChange={handleChangFile}
                    type={'number'}
                    value={values.chieuRong}
                  />
                  <label>Chiều dài</label>
                  <input
                    min={0}
                    name="chieuDai"
                    max={kichThuocToiDa}
                    onChange={handleChangFile}
                    type={'number'}
                    value={values.chieuDai}
                  />
                  <label>Chiều cao</label>
                  <input
                    min={0}
                    max={kichThuocToiDa}
                    name="chieuCao"
                    onChange={handleChangFile}
                    type={'number'}
                    value={values.chieuCao}
                  />
                </fieldset>
              ) : null}
            </fieldset>

            <fieldset>
              <label>Trọng lượng</label>

              <input
                min={0}
                name="trongLuong"
                type={'number'}
                readOnly={congkenh}
                value={  values.trongLuong}
                onChange={handleChangFile}
                className={applyErrorClass('diaChi')}
              />
              <button type="submit">
                {values.maSoDiaChi == 0 ? 'Thêm' : 'Lưu'}
              </button>
            </fieldset>
            <fieldset>
              <label>Giá trị</label>

              <input
                min={0}
                name="giaTri"
                type={'number'}
                value={values.giaTri}
                onChange={handleChangFile}
                className={applyErrorClass('giaTri')}
              />
              
            </fieldset>
            <fieldset>
                    
                    <input type={'search'} style={{"width":"91%", marginBottom:"5px"}} placeholder="Nhập tên hoặc địa chỉ để tìm kiếm" onClick={(e) => setFilter(e.target.value)} />
                </fieldset>
          </form>
          
        </div>
        <div className="list">
          
          <p>Tổng số: {totalRecord}</p>
          <table>
            <tr>
              <th>Tên mặt hàng</th>
              <th>Loại mặt hàng</th>
              <th>Trọng lượng</th>
              <th>Giá trị</th>
              <th>Chiều cao</th>
              <th>Chiều rộng</th>
              <th>Chiều dài</th>
              <th>Trạng thái</th>
              <th colSpan={2}></th>
            </tr>
            <tbody>
              {matHangCaNhan.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e.tenMatHangCaNhan}</td>
                    <td>{e.loaiMatHang.tenLoaiMatHang}</td>
                    <td>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'unit',
                        unit: 'gram',
                      }).format(e.trongLuong)}
                    </td>
                    <td>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(e.giaTri)}
                    </td>
                    <td>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'unit',
                        unit: 'centimeter',
                      }).format(e.chieuCao)}
                    </td>
                    <td>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'unit',
                        unit: 'centimeter',
                      }).format(e.chieuRong)}
                    </td>
                    <td>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'unit',
                        unit: 'centimeter',
                      }).format(e.chieuDai)}
                    </td>
                    <td>{e.duyet ? 'Đã duyệt' : 'Chưa duyệt'}</td>
                    <td colSpan={2}>
                      <GrUpdate onClick={() => showRecord(e)} />
                      {e.ngayDuyet != null && e.duyet ==false &&
                      <AiFillDelete
                        onClick={() => handleDelete(e.maMatHangCaNhan)}
                      />
                      }
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
  );
}

export default MatHangCaNhan
