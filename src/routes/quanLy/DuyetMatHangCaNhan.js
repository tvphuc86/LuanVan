import React, { useEffect, useState } from 'react';
import NavControl from '../../component/NavControl';
import SearchBar from '../../component/SearchBar';
import DuyetDonVanChuyenService from '../../service/DuyetDonVanChuyenService';
import navlinkQuanLy from './linkquanly';
import './DuyetDonVanChuyen.css';
import {
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineExclamationCircle,
} from 'react-icons/ai';
import { MdCancel, MdClose, MdInfoOutline } from 'react-icons/md';
import { BsInfo, BsInfoCircle } from 'react-icons/bs';
import Pagination from '../../component/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import MatHangCaNhanService from '../../service/MatHangCaNhanService';
import { set } from 'lodash';
const initValues = {
  maQuanLy: localStorage.getItem('maTaiKhoan'),
};
const initFilter = {
  ngay: 0,
  thang:0,
  nam: new Date(Date.now()).getFullYear(),
  filter: '',
};
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

const initInfo = {
    diaChiNguoiNhan: '',
    diaChiNguoiGui: '',
    cuocPhi:'',
    tongTrongLuong:'',
    chiTietDonVanChuyens: []
}

function DuyetMatHangCaNhan() {
  const [values, setValues] = useState(initValues);
  const [donCanDuyets, setDonCanDuyets] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [filters, setFilters] = useState(initFilter);
  const [totalRecord, setTotalRecord] = useState(0);
  const [info,setInfo] = useState(initInfo)
  const [modeChiTiet,setMoDelChiTiet] = useState(false)
  const handleChangePage = (value) => {
    setPage(value);
  };
  const handleChangeLimitPage = (e) => {
    setLimit(e.target.value);
  };

  useEffect(() => {
    retrieveData(
      filters.filter.toUpperCase(),
      page,
      limit
    );
  }, [filters, page, limit]);
  const retrieveData = (filter, page, limit) => {
   MatHangCaNhanService.getQl()
   .then(rs => {
    let data = rs.data.filter(x=>x.daDuyetTD == false && (x.tenMatHangCaNhan.toUpperCase().includes(filter) || x.maTaiKhoan.toUpperCase().includes(filter))).skip((page-1)* limit).limit(limit)
    setDonCanDuyets(data)
    setTotalPage(Math.ceil(data.length/limit))
    setTotalRecord(data.length)
    
})
  };
  const handleChangeFilter = (e) => {
    let { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };
  const xemChiTietDonHang = (e) =>{
        console.log(e);
        setInfo(e
        )
  }
  const handleDuyet = (maQuanLy,maDonVanChuyen) => {
    if (window.confirm("Duyệt mặt hàng này ?")==true){
        MatHangCaNhanService.duyet(maQuanLy,maDonVanChuyen)
        .then( rs => {
            
            if(rs.data)
            {toast.success("đã duyệt")
                retrieveData(
                    filters.filter.toUpperCase(),
                    page,
                    limit,
                 
                  );
            }
            else toast.error("có lỗi")
        })}
       
  }
  const handleHuy = (a,db) => {
            if(window.confirm("Không duyệt đơn này ?")==true){
                MatHangCaNhanService.duyet(a,db)
                .then(rs =>{
                    if(rs.data)
                    {toast.success("Đã xác nhận")
                        retrieveData(
                            filters.filter.toUpperCase(),
                            page,
                            limit,
                          );
                    }
                    else toast.error("có lỗi")
                })
            }
  }
  return (
    <div>
      <SearchBar />
      <NavControl links={navlinkQuanLy} />
      <ToastContainer />
      <div className="content">
        <h1>Danh sách  mặt hàng cần duyệt</h1>
        <div className="filter">
          <input
            type={'search'}
            name="filter"
            value={filters.filter}
            placeholder="tên mặt hàng, mã khách hàng"
            onChange={handleChangeFilter}
          />
          
        </div>
        <p> <strong>Tổng số  : </strong>{totalRecord}</p>
            <table>
                <tr>
                <td>STT</td>
          <th>Mã khách hàng</th>
          <th>Loại mặt hàng</th>
          <th>Tên mặt hàng</th>
          <th>Trọng lượng</th>
          <th>Chiều dài</th>
          <th>Chiều cao</th>
          <th>Chiều rộng</th>
          <th>Giá trị</th>
          <th>Xử lý</th>
                </tr>
                {donCanDuyets.map((e, i) => {
                    return (
            <tr>
          
            
                <td>{i + 1 + (page - 1) * limit}</td>
                <td>{e.maTaiKhoan}</td>
                <td>{e.tenLoaiMatHang}</td>

                <td >{e.tenMatHangCaNhan}</td>
                <td > {Intl.NumberFormat('vi-VN', {
                    style: 'unit',
                    unit: 'gram',
                  }).format(e.trongLuong)}</td>
                <td > {Intl.NumberFormat('vi-VN', {
                    style: 'unit',
                    unit: 'centimeter',
                  }).format(e.chieuDai)}</td>
                <td > {Intl.NumberFormat('vi-VN', {
                    style: 'unit',
                    unit: 'centimeter',
                  }).format(e.chieuCao)}</td>
                <td >
                  {Intl.NumberFormat('vi-VN', {
                    style: 'unit',
                    unit: 'centimeter',
                  }).format(e.chieuRong)}
                </td>
                <td key={i}>
                  {' '}
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(e.giaTri)}
                </td>
                <td key={i} className="">
                  <AiOutlineCheckCircle
                    style={{ fontSize: '30px', color: 'green' }}
                    title="Duyệt "
                    onClick={()=>{ handleDuyet(1,e)}}
                  />
                  <MdCancel
                    style={{ fontSize: '30px', color: 'red' }}
                    title="Không duyệt"
                    onClick={()=>{ handleHuy(0,e)}}
                  />
                </td>
      
            </tr>
                  
                )})}
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
  );
}

export default DuyetMatHangCaNhan;
