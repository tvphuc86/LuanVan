import React, { useEffect, useState } from 'react'
import NavControl from '../../component/NavControl';
import SearchBar from '../../component/SearchBar';
import Pagination from '../../component/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import navlinkQuanLy from './linkquanly';
import "./BangTrongLuong.css"
import TrongLuongService from '../../service/TrongLuongService';
import { GrUpdate } from 'react-icons/gr';
import { AiFillDelete } from 'react-icons/ai';

const initValues = {
    maTrongLuong: 0,
    trongLuongBatDau: 0,
    trongLuongKetThuc: 0,
    phiNhanVienGiaoHang: 0
}

function BangTrongLuong() {

    const [values,setValues] = useState(initValues)
    const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [totalRecord, setTotalRecord] = useState(0);
  const [trongLuongs,setTrongLuongs] = useState([])
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };
  const handleChangFilter = e =>{
    let {value} = e.target
    setFilter(value)
  }
  useEffect(() => {
    retrieveData(filter, page, limit);
    console.log(trongLuongs)
  }, [filter, page, limit]);
  const retrieveData = () => {
    TrongLuongService.getAll(filter, page, limit)
      .then((rs) => {
        setTotalRecord(rs.data.totalRecord);
        setTotalPage(rs.data.totalPage);
        setTrongLuongs(rs.data.result);
      })
      .catch((e) => console.log(e));
  };
    

    const hanhdleChangValue = (e) => {
        let {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const resetForm = () =>{
        setValues(initValues)
    }
    
    const handleOnSubmit = e => {
        e.preventDefault()
        if (values.maTrongLuong==0){
            TrongLuongService.create(values)
            .then(rs => {
                if(rs.data.result)
                {
                    toast.success(rs.data.messgae)
                    resetForm()
                    retrieveData(filter,page,limit)
                }
                else
                {
                    toast.error(rs.data.messgae)
                }
            })
            .catch(e =>console.log(e))
        }else{
            TrongLuongService.update(values.maTrongLuong,values)
                .then(rs => {
                    if(rs.data.result)
                    {
                        toast.success(rs.data.messgae)
                        resetForm()
                        retrieveData(filter,page,limit)
                    }
                    else
                    {
                        toast.error(rs.data.messgae)
                    }
                })
                .catch(e =>console.log(e))
        }
    }
    
    const showRecord = item =>{
        setValues(item)
       
    }
    const handleDelete = id => {
        if(window.confirm("Bạn thật sự muốn xóa?")){
            TrongLuongService.delete(id)
            .then(rs =>{
                if (rs.data.result){
                    toast.success(rs.data.messgae)
                    retrieveData(filter,page,limit)
                }
                else toast.error(rs.data.messgae)
            })
        }
       
    }
  return (
    <div>
      <NavControl links={navlinkQuanLy}/>
      <SearchBar />
      <ToastContainer />
      <div className='content'>
        <div className='list'>
        <h1>Quản lý bảng trọng lượng</h1>
        <div className='modal-trongluong'>
            <form onSubmit={handleOnSubmit}>
                <fieldset>
                    <label>Trọng lượng bắt đầu</label>
                    <input type={'number'} name="trongLuongBatDau" placeholder="Nhập trọng lượng bắt đầu" onChange={hanhdleChangValue} value={values.trongLuongBatDau} min={0}/>
                </fieldset>
                <fieldset>
                    <label>Trọng lượng kết thúc</label>
                    <input type={'number'} name="trongLuongKetThuc" placeholder="Nhập trọng lượng kết thúc" onChange={hanhdleChangValue} min={Number(values.trongLuongBatDau)+50} value={values.trongLuongKetThuc} />
                </fieldset>
                <fieldset>
                    <label>Phí giao hàng</label>
                    <input type={'number'} name="phiNhanVienGiaoHang" placeholder="Nhập phí giao hàng" onChange={hanhdleChangValue} min={4000} value={values.phiNhanVienGiaoHang} />
                </fieldset>
                <button type='submit'>{values.maTrongLuong==0 ? 'Thêm' : "Lưu"}</button>
            </form>
        </div>
            <div className='header-list'>
                <input type={'search'} placeholder="Nhập trọng lượng bắt đầu hoặc trọng lượng kết thúc" onChange={handleChangFilter}/>
            </div>
            <div className='header-table'>
                <span>Tổng số : {totalRecord}</span>
            </div>
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                        <th>Trọng lượng bắt dầu</th>
                        <th>Trọng lượng kết thúc</th>
                        <th>Phi nhân viên giao hàng</th>
                        <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {trongLuongs.map((item,index) => {
                            return(
                            <tr key={index}>
                                <td>{ Intl.NumberFormat('vi-VN',{style: 'unit',unit: 'gram'}).format(item.trongLuongBatDau)}</td>
                                <td>{ Intl.NumberFormat('vi-VN',{style: 'unit',unit: 'gram'}).format(item.trongLuongKetThuc)}</td>
                                <td>{ Intl.NumberFormat('vi-VN',{style: 'currency',currency: 'VND'}).format(item.phiNhanVienGiaoHang)}</td>
                                <td colSpan={2}><GrUpdate title='Cập nhật' onClick={()=>showRecord(item)} /> <AiFillDelete title='Xóa' onClick={() => handleDelete(item.maTrongLuong)}/></td>
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
    </div>
  )
}

export default BangTrongLuong
