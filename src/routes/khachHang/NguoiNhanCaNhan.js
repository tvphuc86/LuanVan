import { filter } from 'lodash'
import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare, AiFillDelete, AiFillInfoCircle, AiOutlineInfo } from 'react-icons/ai'
import { BsInfoCircleFill } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { toast, ToastContainer } from 'react-toastify'
import NavControl from '../../component/NavControl'
import Pagination from '../../component/Pagination'
import SearchBar from '../../component/SearchBar'
import DiaChiService from '../../service/DiaChiService'
import NguoiNhanCaNhanService from '../../service/NguoiNhanCaNhanService'
import SoDiaChiService from '../../service/SoDiaChiService'
import navlinkKhachHang from './linkKhachHang'
import './NguoiNhanCaNhan.css'

const initValues = {
    maNguoiNhanCaNhan : 0,
    maXaPhuong: 0,
    maTaiKhoan: window.localStorage.getItem('maTaiKhoan'),
    diaChiNguoiNhanCaNhan:"",
    tenNguoiNhanCaNhan:"",
    maTinhThanhPho: 0,
    maQuanHuyen: 0,
    soDienThoaiCaNhan: ""
}
const initValues3 = {
    maNguoiNhanCap3 : 0,
    maXaPhuong: 0,
    maNguoiNhan: 0,
    diaChiNguoiNhanCap3:"",
    tenNguoiNhanCap3:"",
    maTinhThanhPho: 0,
    maQuanHuyen: 0,
    soDienThoaiNguoiNhanCap3: ""
}

function NguoiNhanCaNhan() {
    const [values,setValues] = useState(initValues)
    const [values3,setValues3] = useState(initValues3)
    const [tinh,setTinh] = useState([])
    const [quan,setQuan] = useState([])
    const [xa,setXa] = useState([])
    const [tinh3,setTinh3] = useState([])
    const [quan3,setQuan3] = useState([])
    const [xa3,setXa3] = useState([])
    const [errors,setErorrs] = useState({})
    const [errors3,setErorrs3] = useState({})
    const [page,setPage] = useState(1)
    const [limit,setLimit] = useState(5)
    const [totalPage,setTotalPage] = useState(0)
    const [totalRecord,setTotalRecord] = useState(0)
    const [page3,setPage3] = useState(1)
    const [limit3,setLimit3] = useState(5)
    const [totalPage3,setTotalPage3] = useState(0)
    const [totalRecord3,setTotalRecord3] = useState(0)
    const [nguoiNhan,setNguoiNhan] = useState([])
    const [nguoiNhan3,setNguoiNhan3] = useState([])
    const [filter,setFilter] = useState("")
    const [filter3,setFilter3] = useState("")
    const [activeModal,setActiveModal] = useState(false)
    useEffect( () => {
       retrieveData(filter,page,limit,values.maTaiKhoan)
    },[page,limit,filter,values])
    const retrieveData = (filter,page,limit,maTaiKhoan)=> {
        NguoiNhanCaNhanService.getAll(filter,page,limit,maTaiKhoan)
        .then( rs => {
            setNguoiNhan(rs.data.data)
            setTotalPage(rs.data.totalPage)
            setTotalRecord(rs.data.totalRecord)
    })
    }
    useEffect( () => {
        retrieveData3(filter3,page3,limit3,values3.maNguoiNhan)
     },[page3,limit3,filter3,values3])
     const retrieveData3 = (filter,page,limit,maTaiKhoan)=> {
         NguoiNhanCaNhanService.getAll3(filter,page,limit,maTaiKhoan)
         .then( rs => {
             setNguoiNhan3(rs.data.data)
             setTotalPage3(rs.data.totalPage)
             setTotalRecord3(rs.data.totalRecord)
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
    useEffect(()=>{
        DiaChiService.getTinhThanhPho()
        .then( rs => {
            setTinh3(rs.data)
        })
    },[])
    useEffect( () => {
        DiaChiService.getQuan(values3.maTinhThanhPho)
        .then( rs => {
            setQuan3(rs.data)
        })
       
    },[values3.maTinhThanhPho])

    useEffect( () => {
        DiaChiService.getXa(values3.maQuanHuyen)
        .then( rs => {
            setXa3(rs.data)
        })
    },[values3.maQuanHuyen])
    const handleChangFile = e => {
        let {name,value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleChangFile3 = e => {
        let {name,value} = e.target
        setValues3({
            ...values3,
            [name]: value
        })
    }

    const handleChangePage = (value) => {
        setPage(value);
      };
      const handleChangeLimitPage = (e) => {
        setLimit(e.target.value);
      };
      const handleChangePage3= (value) => {
        setPage(value);
      };
      const handleChangeLimitPage3 = (e) => {
        setLimit(e.target.value);
      };
    const validate = () => {
        let temp ={}
        temp.maXaPhuong = values.maXaPhuong == 0 ? false : true
        temp.ten = values.tenNguoiNhanCaNhan == "" ? false : true
        temp.diaChi = values.diaChiNguoiNhanCaNhan == ""  ? false : true
        temp.soDienThoaiNguoiNhanCaNhan = values.soDienThoaiNguoiNhanCaNhan =="" ? false:true
        setErorrs(temp)
        return Object.values(temp).every(x=>x===true)
    }
    const validate3 = () => {
        let temp ={}
        temp.maXaPhuong = values3.maXaPhuong == 0 ? false : true
        temp.ten = values3.tenNguoiNhanCap3 == "" ? false : true
        temp.diaChi = values3.diaChiNguoiNhanCap3 == ""  ? false : true
        temp.soDienThoaiNguoiNhanCap3 = values.soDienThoaiNguoiNhanCap3 =="" ? false:true

        setErorrs3(temp)
        return Object.values(temp).every(x=>x===true)
    }
    const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';
    const applyErrorClass3 = (field) =>
    field in errors3 && errors3[field] != true ? 'invalid-field' : '';

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            if(values.maNguoiNhanCap==0){
                NguoiNhanCaNhanService.create({
                    maNguoiNhanCaNhan: values.maNguoiNhanCaNhan,
                    tenNguoiNhanCaNhan: values.tenNguoiNhanCaNhan,
                    diaChiNguoiNhanCaNhan: values.diaChiNguoiNhanCaNhan,
                    maXaPhuong: Number(values.maXaPhuong),
                    maNguoiNhan: values.maNguoiNhan,
                    soDienThoaiCaNhan: values.soDienThoaiCaNhan
                })
                .then(rs => {
                    if (rs.data.result)
                        {toast.success(rs.data.messgae)
                            setValues(initValues3)
                            retrieveData(filter,page,limit,values.maTaiKhoan)
                            setErorrs({})
                        }
                    else
                        toast.error(rs.data.messgae)
                })
            }
            else{
                
                NguoiNhanCaNhanService.update({
                    maNguoiNhanCaNhan: values.maNguoiNhanCaNhan,
                    tenNguoiNhanCaNhan: values.tenNguoiNhanCaNhan,
                    diaChiNguoiNhanCaNhan: values.diaChiNguoiNhanCaNhan,
                    maXaPhuong: Number(values.maXaPhuong),
                    maTaiKhoan: values.maTaiKhoan,
                    soDienThoaiCaNhan: values.soDienThoaiCaNhan
                })
                .then(rs => {
                    console.log(rs.data)
                    if (rs.data.result)
                        {
                            toast.success(rs.data.messgae)
                            setValues(initValues)
                            retrieveData(filter,page,limit,values.maTaiKhoan)
                            setErorrs({})
                        }
                    else
                        toast.error(rs.data.messgae)
                })
                .catch(rs => console.log(rs))
            }
           
        }
        else toast.error("Vui lòng nhập đầy đủ các trường có màu đỏ ")
    }
    const handleSubmit3 = e => {
        e.preventDefault()
        if (validate3()){
            console.log(values3)
            if(values3.maNguoiNhanCap3==0){
                NguoiNhanCaNhanService.create3({
                    maNguoiNhanCap3: values3.maNguoiNhanCap3,
                    tenNguoiNhanCap3: values3.tenNguoiNhanCap3,
                    diaChiNguoiNhanCap3: values3.diaChiNguoiNhanCap3,
                    maXaPhuong: Number(values3.maXaPhuong),
                    maNguoiNhan: values3.maNguoiNhan,
                    soDienThoaiNguoiNhanCap3: values3.soDienThoaiNguoiNhanCap3
                })
                .then(rs => {
                    if (rs.data.result)
                        {toast.success(rs.data.messgae)
                            setValues3(initValues3)
                            retrieveData3(filter3,page3,limit3,values3.maNguoiNhan)
                            setErorrs3({})
                        }
                    else
                        toast.error(rs.data.messgae)
                })
            }
            else{
                NguoiNhanCaNhanService.update3({
                    maNguoiNhanCap3: values3.maNguoiNhanCap3,
                    tenNguoiNhanCap3: values3.tenNguoiNhanCap3,
                    diaChiNguoiNhanCap3: values3.diaChiNguoiNhanCap3,
                    maXaPhuong: Number(values3.maXaPhuong),
                    maNguoiNhan: values3.maNguoiNhan,
                    soDienThoaiNguoiNhanCap3: values3.soDienThoaiNguoiNhanCap3
                })
                .then(rs => {
                    console.log(rs.data)
                    if (rs.data.result)
                        {
                            toast.success(rs.data.messgae)
                            setValues3(initValues3)
                            retrieveData3(filter3,page3,limit3,values3.maNguoiNhan)
                            setErorrs3({})
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
            maNguoiNhanCaNhan : e.maNguoiNhanCaNhan,
            maXaPhuong: e.maXaPhuong,
            diaChiNguoiNhanCaNhan:e.diaChiNguoiNhanCaNhan,
            tenNguoiNhanCaNhan:e.tenNguoiNhanCaNhan,
            maTinhThanhPho: e.xaPhuong.quanHuyen.tinhThanhPho.maTinhThanhPho,
            maQuanHuyen: e.xaPhuong.quanHuyen.maQuanHuyen,
            taiKhoan: e.taiKhoan,
            xaPhuong: e.xaPhuong,
            soDienThoaiCaNhan: e.soDienThoaiCaNhan
        })
    }
    const showRecord3 = e =>{
        setValues3({
            ...values3,
            maNguoiNhanCap3 : e.maNguoiNhanCap3,
            maXaPhuong: e.maXaPhuong,
            diaChiNguoiNhanCap3:e.diaChiNguoiNhanCap3,
            tenNguoiNhanCap3:e.tenNguoiNhanCap3,
            maTinhThanhPho: e.xaPhuong.quanHuyen.tinhThanhPho.maTinhThanhPho,
            maQuanHuyen: e.xaPhuong.quanHuyen.maQuanHuyen,
            xaPhuong: e.xaPhuong,
            maNguoiNhan: e.maNguoiNhan,
            soDienThoaiNguoiNhanCap3: e.soDienThoaiNguoiNhanCap3
        })
    }
    const handleDelete = id => {
        if(window.confirm("Bạn thật sự muốn xóa?")==true){
            NguoiNhanCaNhanService.delete(id)
            .then( rs => {
                if(rs.data.result){
                    toast.success(rs.data.messgae)
                    retrieveData(filter,page,limit,values.maTaiKhoan)
                }
                else
                    toast.error(rs.data.messgae)
            })
        }
    }
    const handleDelete3 = id => {
        if(window.confirm("Bạn thật sự muốn xóa?")==true){
            NguoiNhanCaNhanService.delete3(id)
            .then( rs => {
                if(rs.data.result){
                    toast.success(rs.data.messgae)
                    retrieveData3(filter3,page3,limit3,values3.maNguoiNhan)
                }
                else
                    toast.error(rs.data.messgae)
            })
        }
    }
  return (
    <div>
        <ToastContainer />
      <SearchBar />
      <NavControl links={navlinkKhachHang} />
      <div className={activeModal ? 'model-cap3' : 'model-cap3  nonactive'}>
        <AiFillCloseSquare className='close' onClick={()=>setActiveModal(false)}/>
        <div className='form-diachi'>
            <form onSubmit={handleSubmit3}>
                <fieldset>
                    <select name='maTinhThanhPho' value={values3.maTinhThanhPho} onChange={handleChangFile3}>
                        <option value={0}>Chọn tỉnh thành phố</option>
                        {tinh3.map( (e, i) => {
                            return(
                                <option key={i} value={e.maTinhThanhPho}>{e.tenTinhThanhPho}</option>
                            )
                        })}
                    </select>
                    <select name='maQuanHuyen'value={values3.maQuanHuyen} onChange={handleChangFile3}>
                        <option value={0}>Chọn quận huyện</option>
                        {quan3.map( (e, i) => {
                            return(
                                <option key={i} value={e.maQuanHuyen}>{e.tenQuanHuyen}</option>
                            )
                        })}
                    </select>
                    <select name='maXaPhuong' value={values3.maXaPhuong} onChange={handleChangFile3} className={applyErrorClass3('maXaPhuong')}>
                        <option value={0}>Chọn xã phường</option>
                        {xa3.map( (e, i) => {
                            return(
                                <option key={i} value={e.maXaPhuong}>{e.tenXaPhuong}</option>
                            )
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Tên</label>
                    <input name='tenNguoiNhanCap3' value={values3.tenNguoiNhanCap3} onChange={handleChangFile3} className={applyErrorClass3('ten')}/>
                </fieldset>
                <fieldset>
                    <label>Số điện thoại</label>
                    <input name='soDienThoaiNguoiNhanCap3' value={values3.soDienThoaiNguoiNhanCap3} onChange={handleChangFile3} className={applyErrorClass3('soDienThoaiNguoiNhanCap3')}/>
                </fieldset>
                <fieldset>
                    <label>Địa chỉ cụ thể</label>
                    <input name='diaChiNguoiNhanCap3' value={values3.diaChiNguoiNhanCap3} onChange={handleChangFile3} className={applyErrorClass3('diaChi')}/>
                    <button type='submit'>
                        {
                            values3.maNguoiNhanCaNhan == 0 ? 'Thêm' : 'Lưu'
                        }
                    </button>
               
                </fieldset>
                <fieldset>
                    
                    <input type={'search'} style={{"width":"91%", marginBottom:"5px"}} placeholder="Nhập tên hoặc địa chỉ để tìm kiếm" onClick={(e) => setFilter3(e.target.value)} />
                </fieldset>
               
            </form>
        </div>
        <div className='list'>
        <strong style={{'padding': '1rem', 'display' : 'block'}}>Tổng số: {totalRecord3}</strong>
            <table>
                <tr>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th colSpan={2}></th>
                </tr>
                <tbody>
                {nguoiNhan3.map( (e,i) => {
                        return(
                            <tr key={i}>
                                <td>{e.tenNguoiNhanCap3}</td>
                                <td>{e.diaChiNguoiNhanCap3} - {e.xaPhuong.tenXaPhuong} - {e.xaPhuong.quanHuyen.tenQuanHuyen} - {e.xaPhuong.quanHuyen.tinhThanhPho.tenTinhThanhPho}</td>
                                <td>
                                    <GrUpdate onClick={()=>showRecord3(e)} />
                                    <AiFillDelete onClick={() => handleDelete3(e.maNguoiNhanCap3)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Pagination
            page={page3}
            limit={limit3}
            totalPage={totalPage3}
            handleChangePage={handleChangePage3}
            handleChangeLimitPage={handleChangeLimitPage3}
            siblings={1}
          />
        </div>
      </div>
      <div className="content">
        <h1 style={{'padding':'1rem'}}>Quản lý người nhận cá nhân</h1>

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
                    <input name='tenNguoiNhanCaNhan' value={values.tenNguoiNhanCaNhan} onChange={handleChangFile} className={applyErrorClass('ten')}/>
                </fieldset>
                <fieldset>
                    <label>Số điện thoại</label>
                    <input name='soDienThoaiCaNhan' value={values.soDienThoaiCaNhan} onChange={handleChangFile} className={applyErrorClass('soDienThoaiNguoiNhanCaNhan')}/>
                </fieldset>
                <fieldset>
                    <label>Địa chỉ cụ thể</label>
                    <input name='diaChiNguoiNhanCaNhan' value={values.diaChiNguoiNhanCaNhan} onChange={handleChangFile} className={applyErrorClass('diaChi')}/>
                    <button type='submit'>
                        {
                            values.maNguoiNhanCaNhan == 0 ? 'Thêm' : 'Lưu'
                        }
                    </button>
               
                </fieldset>
                <fieldset>
                    
                    <input type={'search'} style={{"width":"91%", marginBottom:"5px"}} placeholder="Nhập tên hoặc địa chỉ để tìm kiếm" onClick={(e) => setFilter(e.target.value)} />
                </fieldset>
            </form>
        </div>
        <div className='list'>
        <strong style={{'padding': '1rem', 'display' : 'block'}}>Tổng số: {totalRecord}</strong>
            <table>
                <tr>
                    <th>Tên</th>
                    <th>Địa chỉ</th>
                    <th colSpan={2}></th>
                </tr>
                <tbody>
                {nguoiNhan.map( (e,i) => {
                        return(
                            <tr key={i}>
                                <td>{e.tenNguoiNhanCaNhan}</td>
                                <td>{e.diaChiNguoiNhanCaNhan} - {e.xaPhuong.tenXaPhuong} - {e.xaPhuong.quanHuyen.tenQuanHuyen} - {e.xaPhuong.quanHuyen.tinhThanhPho.tenTinhThanhPho}</td>
                                <td>
                                    <GrUpdate onClick={()=>showRecord(e)} />
                                    <AiFillDelete onClick={() => handleDelete(e.maNguoiNhanCaNhan)} />
                                    <BsInfoCircleFill title='Xem người nhận cấp 3' onClick={()=>{
                                        setActiveModal(true)
                                        setValues3({
                                            ...values3,
                                            maNguoiNhan : e.maNguoiNhanCaNhan
                                        })
                                    }} />
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
  )
}

export default NguoiNhanCaNhan
