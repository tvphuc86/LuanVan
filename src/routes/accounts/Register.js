import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../component/Header';
import AccountService from '../../service/AccountService';
import './Register.css';

const initFieldValues = {
  email: '',
  sdt: '',
  hoTen: '',
  matKhau: '',
  matKhau1: '',
};
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const regexStrongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

function Register() {
  const [values, setValues] = useState(initFieldValues);
  const [errors, setErrors] = useState({});

  const handleChangeInputVaule = (e) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  const validate = () => {
    let temp = {};
    temp.email = values.email == '' ? false : true;
    temp.matKhau = values.matKhau.match(regexStrongPassword) ? true : false;
    temp.sdt = values.sdt.match(regexPhoneNumber) ? true : false;
    temp.hoTen = values.hoTen == '' ? false : true;
    temp.matKhau1 = values.matKhau1 != values.matKhau ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
        AccountService.dangKy(values)
        .then(rs => {
            if (rs.data.result){
                toast.success(rs.data.messgae)
                resetForm()
            }
            else{
                toast.error(rs.data.messgae)
            }
        })
        .catch(e=> console.log(e))
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin');
    }
    
  };

  const resetForm = () =>{
    setValues(initFieldValues)
    setErrors({})
  }

  const applyErrorClass = (field) =>
    field in errors && errors[field] != true ? 'invalid-field' : '';
  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="dang-ky">
        <h1>Đăng ký</h1>
        <div className="form-dangky">
          <form onSubmit={handleOnSubmit}>
            <fieldset>
              <label>Email</label>
              <input
                name="email"
                onChange={handleChangeInputVaule}
                type={'email'}
                placeholder="Nhập email của bạn"
                className={applyErrorClass('email')}
                value={values.email}
              />
            </fieldset>
            <fieldset>
              <label>SĐT</label>
              <input
                name="sdt"
                type={'tel'}
                placeholder="Nhập số điện thoại của bạn"
                className={applyErrorClass('sdt')}
                onChange={handleChangeInputVaule}
                value={values.sdt}
              />
            </fieldset>
            {errors['sdt'] == false && <sub>Số điện thoại không hợp lệ</sub>}
            <fieldset>
              <label>Họ tên</label>
              <input
                name="hoTen"
                type={'text'}
                placeholder="Nhập họ tên của bạn"
                className={applyErrorClass('hoTen')}
                onChange={handleChangeInputVaule}
                value={values.hoTen}
              />
            </fieldset>
            <fieldset>
              <label>Mật khẩu</label>
              <input
                name="matKhau"
                type={'password'}
                placeholder="Nhập mật khẩu của bạn"
                className={applyErrorClass('matKhau')}
                onChange={handleChangeInputVaule}
                value={values.matKhau}
              />
            </fieldset>
            {errors['matKhau'] == false && (
              <sub>
                8 ký tự, có ít nhất một kí tự viết thường,có ít nhất một kí tự
                viết hoa, có ít nhất một chữ số, có ít nhất một ký tự đặc biệt
              </sub>
            )}
            <fieldset>
              <label>Xác thực mật khẩu</label>
              <input
                name="matKhau1"
                type={'password'}
                placeholder="Nhập lại mật khẩu của bạn"
                className={applyErrorClass('matKhau1')}
                onChange={handleChangeInputVaule}
                value={values.matKhau1}
              />
            </fieldset>
            {errors['matKhau1'] == false && (
              <sub>Xác nhận mật khẩu chưa đúng</sub>
            )}
            <button type="submit">Đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
