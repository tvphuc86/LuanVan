import React, { useEffect, useState } from 'react'
import './SearchBar.css'
import Logo from '../asset/img/logo.png';
import user from '../asset/img/user.jpg'
import { useNavigate } from 'react-router';
import { GrNotification } from 'react-icons/gr';
import { MdNotifications } from 'react-icons/md';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import ThongKeQuanLyService from '../service/ThongKeQuanLyService';
function SearchBar(props) {
  const navigate = useNavigate();
  const handleLogout = () =>{
    if(window.confirm("Bạn thực sự muốn đăng xuất?")==true){
      window.localStorage.removeItem("role")
      window.localStorage.removeItem("userName")
      window.localStorage.removeItem("maTaiKhoan")
      window.localStorage.removeItem('image')
      window.location.reload()
    } 
  }
  const [thongBaos,setThongBaos] = useState([])
  const [thongBao,setThongBao] = useState(false)
  const [chuaXem,setChuaXem] = useState(0)

  useEffect(()=>{
    ThongKeQuanLyService.getThongBao(localStorage.getItem('maTaiKhoan'))
    .then(rs => {setThongBaos(rs.data)
      let a = 0;
      rs.data.map(e=>{
        return a = e.daXem==false ? a+=1 : a=a
      })
      setChuaXem(a)})

  },[thongBao])
  const setDaXem = () =>{
      ThongKeQuanLyService.putThongBao(localStorage.getItem('maTaiKhoan'))
  }
  return (
    <div className='searchbar'>
      <div className={thongBao ? 'listThongBao' : 'listThongBao non'}>
        <AiOutlineCloseSquare className='closehd'
        onClick={()=>setThongBao(!thongBao)} />
        <div className='thongBao'>
          {
            thongBaos.map((e,i)=>{
              return(
                <div>
                  <h3>{e.tieuDe}</h3>
                  <p>{e.noiDung}</p>
                  <sub>{new Date(Date.parse(e.ngayTao)).toLocaleTimeString() + ':' +new Date(Date.parse(e.ngayTao)).toLocaleDateString()}</sub>
                </div>
              )
            })
          }
          
        </div>
      </div>
     <div className='logo-searchbar'>
        <img src={Logo} alt='Logo' /> 
        <h1>UyHoang</h1>
     </div>
        <div className='search'>
            <input type={'text'}></input>
            <button>Tìm kiếm</button>
        </div>
        <div className='profile'>
       
            <div className='avatar'>
              <img src={localStorage.getItem('image')} alt='avatar' />
            </div>
            <div className='name'>
                {window.localStorage.getItem("userName")}
            </div>
           <div>
           <MdNotifications
           onClick={()=>{
            setThongBao(!thongBao)
            setDaXem()
          }}
           style={{'color':'green','fontSize':'25px'}}/><sup style={{'color':'black'}}>{chuaXem}</sup>
           </div>
            <div>
           
              <button onClick={handleLogout} className='btn-login'>Đăng xuất</button>
            </div>
           
        </div>
    </div>
  )
}

export default SearchBar
