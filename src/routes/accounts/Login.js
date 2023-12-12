import React, { useEffect, useState } from 'react'
import { AiFillCloseSquare } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import Header from '../../component/Header'
import AccountService from '../../service/AccountService'
import  "./login.css"


const initFieldValues = {
    email: "",
    sdt: null,
    hoTen: null,
    matKhau: ""
  }
function Login(props) {
    const [values,setValues] = useState(initFieldValues)
    const [errors,setErrors] = useState({})
    const [xacMinh,setXacMinh] = useState(false)
   const [otp,setOtp] = useState(0)
   const navigate = useNavigate()
   const {setRole} = props

    const validate = () =>{
        let temp={}
        temp.email = values.email==""? false:true
        temp.matKhau = values.matKhau==""? false:true
        setErrors(temp)
        return Object.values(temp).every(x => x==true)
    }


    const applyErrorClass = field => ((field in errors && errors[field]!=true) ? 'invalid-field':'')


    const handleChangeInput = e => {
        let {name,value} = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleOnSubmit = e =>
    {
        e.preventDefault()
        if(validate()){
          
            AccountService.dangNhap(values)
            .then(rs =>
                {

                    if(!rs.data.result){
                        toast.error(rs.data.messgae)
                        if (rs.data.data==0){
                            setXacMinh(true)
                        }
                    }
                    else{
                        toast.success(rs.data.messgae)
                        let quyen=rs.data.data.role
                        let username = rs.data.data.username
                        window.localStorage.setItem("role",quyen)
                        window.localStorage.setItem("userName",username)
                        window.localStorage.setItem("maTaiKhoan",rs.data.data.maTaiKhoan)
                        window.localStorage.setItem('image',rs.data.data.image)
                        window.localStorage.setItem('sdt',rs.data.data.sdt)
                        if(quyen.includes("QUAN_LY"))
                          navigate("/quan-ly")
                        else if (quyen.includes("KHACH_HANG"))
                              navigate("/khach-hang")
                              else navigate("/nhan-vien-giao-hang")
                    }
                    
                })
            .catch(e => console.log(e))
        }
        else{
            toast.error("Vui lòng nhập đầy đủ mật khẩu và email")
        }
    }
    const handelChangOtp = e => {
        let value = e.target.value
        setOtp(value)
    }
    const handleXacMinh = () => {
    
      AccountService.xacMinhOtp(otp,values.email)
        .then((rs) => {
          console.log(rs.data)
          if (rs.data.result) {
            toast.success('Xác minh thành công, bạn có thể đăng nhập');
            setXacMinh(false)
          }
          else{
            toast.error("Mã xác nhận sai")

          }
    })
        .catch((e) => console.log(e));
    };
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className={xacMinh ? 'model-form' : 'model-form  nonactive'}>
      <AiFillCloseSquare
            className="close"
            onClick={() => {
              setXacMinh(!xacMinh);
            }}
          />
        <input
          type={'number'}
          onChange={handelChangOtp}
          value={otp}
          placeholder="Nhập mã opt nhận từ email"
        />
        <button className="btnXacMinhEmail" onClick={handleXacMinh}>Xác minh email</button>
      </div>
      <div className="login">
        <div className="form-dangnhap">
          <h1>Đăng nhập</h1>
          <form onSubmit={handleOnSubmit}>
            <fieldset>
              <label>SĐT hoặc Email</label>
              <input
                type={'email'}
                onChange={handleChangeInput}
                name="email"
                placeholder="Nhập email đã đăng ký tài khoản"
                className={applyErrorClass('email')}
                value={values.email}
              />
            </fieldset>
            <fieldset>
              <label>Mật khẩu</label>
              <input
                type={'password'}
                name="matKhau"
                placeholder="Nhập mật khẩu của bạn đẫ đăng ký"
                className={applyErrorClass('matKhau')}
                onChange={handleChangeInput}
                value={values.matKhau}
              />
            </fieldset>
            <button type={'submit'}>Đăng nhập</button>
          </form>
          <p className="">
            Bạn chưa có tài khoản? <a href="/dang-ky">Đăng ký ngay!</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login
