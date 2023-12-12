import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { toast, ToastContainer } from 'react-toastify';
import NavControl from '../../component/NavControl';
import Pagination from '../../component/Pagination';
import SearchBar from '../../component/SearchBar';
import DiaChiService from '../../service/DiaChiService';
import SoDiaChiService from '../../service/SoDiaChiService';
import navlinkKhachHang from './linkKhachHang';
import './SoDiaChi.css'
const initValues = {
    maSoDiaChi : 0,
    maXaPhuong: 0,
    maTaiKhoan: window.localStorage.getItem('maTaiKhoan'),
    diaChi:"",
    ten:"",
    maTinhThanhPho: 0,
    maQuanHuyen: 0,
    taiKhoan: null,
    xaPhuong: null,
}
function SoDiaChi() {

    const [values,setValues] = useState(initValues)
    const [tinh,setTinh] = useState([])
    const [quan,setQuan] = useState([])
    const [xa,setXa] = useState([])
    const [errors,setErorrs] = useState({})
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(5)
    const [totalPage,setTotalPage] = useState(0)
    const [totalRecord,setTotalRecord] = useState(0)
    const [soDiaChi,setSoDiaChi] = useState([])
    useEffect( () => {
       retrieveData(page,limit)
    },[page,limit,values])
    const retrieveData = (page,limit)=> {
        SoDiaChiService.get(page,limit)
        .then( rs => {
            setSoDiaChi(rs.data.data)
            setTotalPage(rs.data.totalPage)
            setTotalRecord(rs.data.totalRecord)
    })
    }
    useEffect(()=>{
        DiaChiService.getTinhThanhPho()
        .then( rs => {
            setTinh(rs.data)
        })
    },[])
    useEffect( () => {
        DiaChiService.getQuan(values.maTinhThanhPho)
        .then( rs => {
            setQuan(rs.data)
        })
       
    },[values.maTinhThanhPho])

    useEffect( () => {
        DiaChiService.getXa(values.maQuanHuyen)
        .then( rs => {
            setXa(rs.data)
        })
    },[values.maQuanHuyen])

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
        temp.maXaPhuong = values.maXaPhuong == 0 ? false : true
        temp.ten = values.ten == "" ? false : true
        temp.diaChi = values.diaChi == ""  ? false : true
        setErorrs(temp)
        return Object.values(temp).every(x=>x===true)
    }
    const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            if(values.maSoDiaChi==0){
                SoDiaChiService.create({
                    maSoDiaChi: values.maSoDiaChi,
                    ten: values.ten,
                    diaChi: values.diaChi,
                    maXaPhuong: Number(values.maXaPhuong),
                    maTaiKhoan: values.maTaiKhoan
                })
                .then(rs => {
                    if (rs.data.result)
                        {toast.success(rs.data.messgae)
                            setValues(initValues)
                        }
                    else
                        toast.error(rs.data.messgae)
                })
            }
            else{
                
                SoDiaChiService.update(values.maSoDiaChi,{
                    maSoDiaChi: values.maSoDiaChi,
                    ten: values.ten,
                    diaChi: values.diaChi,
                    maXaPhuong: Number(values.maXaPhuong),
                    maTaiKhoan: values.maTaiKhoan,
                  
                })
                .then(rs => {
                    console.log(rs.data)
                    if (rs.data.result)
                        {
                            toast.success(rs.data.messgae)
                            setValues(initValues)
                        }
                    else
                        toast.error(rs.data.messgae)
                })
                .catch(rs => console.log(rs))
            }
           
        }
        else toast.error("Vui lòng nhập đầy đủ các trường có màu đỏ ")
    }
    const showRecord = e =>{
        setValues({
            ...values,
            maSoDiaChi : e.maSoDiaChi,
            maXaPhuong: e.maXaPhuong,
            diaChi:e.diaChi,
            ten:e.ten,
            maTinhThanhPho: e.xaPhuong.quanHuyen.tinhThanhPho.maTinhThanhPho,
            maQuanHuyen: e.xaPhuong.quanHuyen.maQuanHuyen,
            taiKhoan: e.taiKhoan,
            xaPhuong: e.xaPhuong
        })
    }
    const handleDelete = id => {
        if(window.confirm("Bạn thật sự muốn xóa?")==true){
            SoDiaChiService.delete(id)
            .then( rs => {
                if(rs.data)
                    toast.success("Đã xóa địa chỉ")
                else
                    toast.error("Chưa thể xóa")
            })
        }
    }
  return (
    <div>
        <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkKhachHang} />
      <div className="content">
        <h1 className="title">Quản lý sổ địa chỉ</h1>

        <div className='form-diachi'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <select name='maTinhThanhPho' value={values.maTinhThanhPho} onChange={handleChangFile}>
                        <option value={0}>Chọn tỉnh thành phố</option>
                        {tinh.map( (e, i) => {
                            return(
                                <option key={i} value={e.maTinhThanhPho}>{e.tenTinhThanhPho}</option>
                            )
                        })}
                    </select>
                    <select name='maQuanHuyen'value={values.maQuanHuyen} onChange={handleChangFile}>
                        <option value={0}>Chọn quận huyện</option>
                        {quan.map( (e, i) => {
                            return(
                                <option key={i} value={e.maQuanHuyen}>{e.tenQuanHuyen}</option>
                            )
                        })}
                    </select>
                    <select name='maXaPhuong' value={values.maXaPhuong} onChange={handleChangFile} className={applyErrorClass('maXaPhuong')}>
                        <option value={0}>Chọn xã phường</option>
                        {xa.map( (e, i) => {
                            return(
                                <option key={i} value={e.maXaPhuong}>{e.tenXaPhuong}</option>
                            )
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Tên</label>
                    <input type={'text'} name='ten' value={values.ten} onChange={handleChangFile} className={applyErrorClass('ten')}/>
                </fieldset>
                <fieldset>
                    <label>Địa chỉ cụ thể</label>
                    <input type={'text'} name='diaChi' value={values.diaChi} onChange={handleChangFile} className={applyErrorClass('diaChi')}/>
                    <button type='submit'>
                        {
                            values.maSoDiaChi == 0 ? 'Thêm' : 'Lưu'
                        }
                    </button>
               
                </fieldset>
               
            </form>
        </div>
        <div className='list'>
            <p>Tổng số: {totalRecord}</p>
            <table>
                <tr>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th colSpan={2}></th>
                </tr>
                <tbody>
                    {soDiaChi.map( (e,i) => {
                        return(
                            <tr key={i}>
                                <td>{e.ten}</td>
                                <td>{e.diaChi} - {e.xaPhuong.tenXaPhuong} - {e.xaPhuong.quanHuyen.tenQuanHuyen} - {e.xaPhuong.quanHuyen.tinhThanhPho.tenTinhThanhPho}</td>
                                <td>
                                    <GrUpdate onClick={()=>showRecord(e)} />
                                    <AiFillDelete onClick={() => handleDelete(e.maSoDiaChi)} />
                                </td>
                            </tr>
                        )
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

export default SoDiaChi;
