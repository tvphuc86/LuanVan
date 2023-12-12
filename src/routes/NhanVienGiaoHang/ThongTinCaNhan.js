import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import NavControl from '../../component/NavControl'
import SearchBar from '../../component/SearchBar'
import AccountService from '../../service/AccountService'
import navlinkNVGH from './NavLinkNVGH'


const initValues = {
  email: "",
  sdt: "",
  diaChi:'',
  hoTen:"",
  ngaySinh:"",
  fileImage : null,
  imgageUrl: null,
  matKhau:"abc"
  
}
function ThongTinCaNhanNV() {
  const [values,setValues] = useState(initValues)
  const [role,setRole] = useState([])

  useEffect(()=>{
    AccountService.getById(localStorage.getItem("maTaiKhoan"))
    .then (rs =>{
      console.log(rs.data.taiKhoan)
      setValues(rs.data.taiKhoan)
      setRole(rs.data.role)
    })
  },[])
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };
  const showReview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let fileImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          fileImage,
          imgageUrl: x.target.result,
        });
      };
      reader.readAsDataURL(fileImage);
    } else {
      setValues({
        ...values,
        fileImage: 'null',
        imgageUrl: null,
      });
    }
  };
  const handleOnSubmit = e =>{
    e.preventDefault()
    console.log(values)
    let formData = new FormData()
    formData.append('maTaiKhoan',values.maTaiKhoan)
    formData.append("email",values.email)
    formData.append('sdt',values.sdt)
    formData.append('hoTen',values.hoTen)
    formData.append('fileImage',values.fileImage)
    formData.append('diaChi',values.diaChi)
    formData.append('ngaySinh',values.ngaySinh)
    formData.append('matKhau',values.matKhau)
    formData.append('maBam',values.maBam)
    formData.append('anh',values.anh)
    formData.append('imgageUrl',values.imgageUrl)
    formData.append('vaiTros',values.vaiTros)
    formData.append('hoatDong',values.hoatDong)
    AccountService.update(values.maTaiKhoan,formData)
    .then(rs => {
      console.log(rs.data)
      localStorage.setItem('image',values.imgageUrl)
      localStorage.setItem('userName',values.hoTen)
      window.location.reload()
      toast.success("Cập nhật thành công")
    })

  }
  return (
    <div>
      <ToastContainer />
        <SearchBar />
        <NavControl links={navlinkNVGH} ></NavControl>
      <div className='content'>
          <h1>Thông tin cá nhân</h1>
          <p>Vai trò của bạn: {role.map((e,i)=>{return(<strong>{e.vaiTro.tenVaiTro}, </strong>)})}</p>
          <form onSubmit={handleOnSubmit}>
            <div className='form-group'>
              <img src={values.imgageUrl} alt="" className="img-htvc" />
              <label>Ảnh đại diện</label>
              <input
                    type={'file'}
                    accept="image/*"
                    id="field-upload"
                    onChange={showReview}
                  />
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input type={'email'} value={values.email} name='email' readOnly></input>
            </div>
            <div className='form-group'>
              <label>Họ tên</label>
              <input type={'text'} value={values.hoTen} name='hoTen' onChange={handleChangeInput}></input>
            </div>
            <div className='form-group'>
              <label>Số điện thoại</label>
              <input type={'tel'} value={values.sdt } readOnly name='sdt'onChange={handleChangeInput}></input>
            </div>
            <div className='form-group'>
              <label>Ngày sinh</label>
              <input type={'date'} value= { values.ngaySinh ? values.ngaySinh.slice(0,10) : null} name='ngaySinh' onChange={handleChangeInput}></input>
            </div>
            <button type='submit'>Lưu</button>
          </form>
      </div>
    </div>
  )
}

export default ThongTinCaNhanNV
