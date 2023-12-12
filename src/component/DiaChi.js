import React, { useEffect, useState } from 'react'
import "./DiaChi.css"
import DiaChiService from '../service/DiaChiService'



function DiaChi(props) {
    const {handleChangValueField,applyErrorClass,errors,values} = props
    const [tinh,setTinh] = useState([])
    const [huyen,setHuyen] = useState([])
    const {maTinh} = props
    
    useEffect(()=>{
        DiaChiService.getTinhThanhPho()
        .then(rs =>{
            setTinh(rs.data)
            maTinh==0 ? setHuyen([]) : setHuyen(rs.data[maTinh-1].quanHuyens)
        })
    },[maTinh])
    
    
  return (
    <div className='diachi'>
        <div className='group-select'>
            <label>Tỉnh</label>
            <div className='double-select'>
                <div className='select-group'>
                    <select className={applyErrorClass('maTinh')} name='maTinh' onChange={handleChangValueField} value={maTinh} >
                    <option value={0}>Chọn tỉnh thành phố</option>        
                    {tinh.map((values,index)=>{
                        return(
                        <option key={index}  value={values.maTinhThanhPho}>{values.tenTinhThanhPho}</option>
                        )
                    })}
                </select>
                <p className='error'>{errors.maTinh}</p>
                </div>
                <div className='select-group'>
                    <select className={applyErrorClass('maQuanHuyen')} name='maQuanHuyen' onChange={handleChangValueField} value={values.maQuanHuyen}>
                        <option value={0}>Chọn quận huyện</option>     
                        {huyen.map((values,index)=>{
                            return(
                            <option key={index}  value={values.maQuanHuyen}>{values.tenQuanHuyen}</option>
                            )
                        })}   
                    </select>
                     <p className='error'>{errors.maQuanHuyen}</p>
                    </div>
            </div>
        </div>
        </div>
  )
}

export default DiaChi
