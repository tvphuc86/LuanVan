import React, { useEffect, useState } from 'react'
import PaypalCheckoutButton from '../../component/PaypalCheckoutButton'

export default function TongTienThuVao(props) {
 const {data,abc} = props
  return (
    <div className='list'>
        <h2 style={{'textAlign':'center'}}> {abc}</h2>
        <p style={{'padding':'1rem'}}>Tổng số {data.length}</p>
        <table>
            <thead>
                <tr>
                    <th>Mã vận đơn</th>
                    <th>Số tiền</th>
                    <th>Ngày</th>
                    <th>Ghi chú</th>
                </tr>
            </thead>
            <tbody>
                {data.map((e,i)=>{
                    return(
                    <tr>
                        <td>{e.maDonHang}</td>
                        <td> {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(e.soTien)}</td>
                        <td>{new Date(Date.parse( e.ngayThuVao)).toLocaleDateString()}</td>
                        <td>{e.ghiChu}</td>
                    </tr>)
                })}
              
            </tbody>
        </table>
    </div>
  )
}
